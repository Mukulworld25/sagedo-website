#!/usr/bin/env node
/**
 * Master E2E Test Suite Runner for SAGE DO
 * 
 * Executes all 4 Tiers of Opaque-Box E2E Tests:
 * - Tier 1: Feature Coverage (F1 through F16, >=5 test cases per feature)
 * - Tier 2: Boundary & Corner Cases
 * - Tier 3: Cross-Feature Combinations
 * - Tier 4: Real-World Scenarios (including ₹33,03,000/yr benchmark)
 * 
 * Usage:
 *   node tests/e2e-suite.mjs
 *   node tests/e2e-suite.mjs --report-only
 */

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// If executed directly by pure node (without tsx loader), hand off to tsx runner
if (!process.env.RUNNING_UNDER_TSX) {
  const isWindows = process.platform === 'win32';
  const npxCmd = isWindows ? 'npx.cmd' : 'npx';
  const args = ['tsx', path.join(__dirname, 'e2e-suite.mjs'), ...process.argv.slice(2)];
  
  const result = spawnSync(npxCmd, args, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: isWindows,
    env: { ...process.env, RUNNING_UNDER_TSX: 'true' }
  });
  
  process.exit(result.status ?? 0);
}

const isReportOnly = process.argv.includes('--report-only');

async function main() {
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log('          SAGE DO COMPREHENSIVE OPAQUE-BOX E2E TEST SUITE (TIERS 1-4)       ');
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log(`Working Directory: ${ROOT_DIR}`);
  console.log(`Execution Mode:    ${isReportOnly ? 'Diagnostic Report Only (Exit 0)' : 'Strict Validation'}\n`);

  const startTime = Date.now();

  // Dynamic imports executed under tsx loader
  const { runTier1Tests } = await import('./tier1-feature-tests.ts');
  const { runTier2Tests } = await import('./tier2-boundary-tests.ts');
  const { runTier3Tests } = await import('./tier3-cross-feature-tests.ts');
  const { runTier4Tests } = await import('./tier4-real-world-scenarios.ts');

  console.log('⏳ Running Tier 1: Feature Coverage Tests (F1 through F16)...');
  const tier1Results = await runTier1Tests();
  const tier1Passed = tier1Results.filter(r => r.passed).length;
  console.log(`   ✓ Tier 1 completed: ${tier1Passed}/${tier1Results.length} passed\n`);

  console.log('⏳ Running Tier 2: Boundary & Corner Case Tests...');
  const tier2Results = await runTier2Tests();
  const tier2Passed = tier2Results.filter(r => r.passed).length;
  console.log(`   ✓ Tier 2 completed: ${tier2Passed}/${tier2Results.length} passed\n`);

  console.log('⏳ Running Tier 3: Cross-Feature Integration Tests...');
  const tier3Results = await runTier3Tests();
  const tier3Passed = tier3Results.filter(r => r.passed).length;
  console.log(`   ✓ Tier 3 completed: ${tier3Passed}/${tier3Results.length} passed\n`);

  console.log('⏳ Running Tier 4: Real-World Application Scenario Tests...');
  const tier4Results = await runTier4Tests();
  const tier4Passed = tier4Results.filter(r => r.passed).length;
  console.log(`   ✓ Tier 4 completed: ${tier4Passed}/${tier4Results.length} passed\n`);

  const durationMs = Date.now() - startTime;
  const allResults = [...tier1Results, ...tier2Results, ...tier3Results, ...tier4Results];

  const total = allResults.length;
  const passed = allResults.filter(r => r.passed).length;
  const failed = allResults.filter(r => !r.passed);

  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log('                              TEST SUITE SUMMARY                            ');
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log(`Total Test Cases Executed: ${total}`);
  console.log(`Passed:                    ${passed} (${Math.round((passed / total) * 100)}%)`);
  console.log(`Failed:                    ${failed.length}`);
  console.log(`Duration:                  ${(durationMs / 1000).toFixed(2)}s\n`);

  // Breakdown by Tier
  const tierSummary = [
    { tier: 'Tier 1: Feature Coverage (>=5 per feature)', items: tier1Results },
    { tier: 'Tier 2: Boundary & Corner Cases', items: tier2Results },
    { tier: 'Tier 3: Cross-Feature Integration', items: tier3Results },
    { tier: 'Tier 4: Real-World Scenarios', items: tier4Results }
  ];

  console.log('── TIER BREAKDOWN ─────────────────────────────────────────────────────────');
  for (const t of tierSummary) {
    const tPassed = t.items.filter(i => i.passed).length;
    const tTotal = t.items.length;
    const pct = Math.round((tPassed / tTotal) * 100);
    const status = tPassed === tTotal ? '✓ ALL PASS' : `⚠ ${tTotal - tPassed} PENDING REMEDIATION`;
    console.log(` ${t.tier.padEnd(46)} ${String(tPassed).padStart(2)}/${String(tTotal).padEnd(2)} (${String(pct).padStart(3)}%)  [${status}]`);
  }
  console.log('───────────────────────────────────────────────────────────────────────────\n');

  // Breakdown of Failures (Pending Remediations)
  if (failed.length > 0) {
    console.log('── PENDING REMEDIATIONS IDENTIFIED BY OPAQUE-BOX HARNESS ──────────────────');
    failed.forEach((f, idx) => {
      const tag = f.feature || f.category || f.integration || f.scenario || 'Feature';
      console.log(` ${idx + 1}. [${tag}] ${f.name}`);
      console.log(`    ↳ Reason: ${f.error}`);
    });
    console.log('───────────────────────────────────────────────────────────────────────────\n');
  }

  if (failed.length === 0) {
    console.log('🎉 ALL 101 E2E TESTS PASSED PERFECTLY WITH ZERO DEFECTS!\n');
    process.exit(0);
  } else {
    if (isReportOnly) {
      console.log('ℹ Diagnostic report generated successfully. Exiting with code 0 per --report-only.\n');
      process.exit(0);
    } else {
      console.log(`❌ Test suite finished with ${failed.length} failing tests requiring implementation remediation.`);
      console.log('   (Run with --report-only to inspect without nonzero exit code)\n');
      process.exit(1);
    }
  }
}

main().catch(err => {
  console.error('Fatal error running test harness:', err);
  process.exit(1);
});
