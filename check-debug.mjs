const delay = ms => new Promise(r => setTimeout(r, ms));
const expectedStart = process.argv[2] || '';

async function run() {
    console.log(`🔍 Polling debug endpoint for password starting with "${expectedStart}"...`);
    // Try for 5 minutes
    for (let i = 0; i < 30; i++) {
        try {
            const res = await fetch('https://sagedo-website.onrender.com/api/debug-connection');
            if (res.status === 200) {
                const data = await res.json();
                const hint = data.password_hint || '';
                if (!expectedStart || hint.startsWith(expectedStart)) {
                    console.log('\n✅ MATCHING CONFIGURATION LIVE!');
                    console.log(JSON.stringify(data, null, 2));
                    return;
                } else {
                    process.stdout.write(`(Saw ${hint}) `);
                }
            } else {
                process.stdout.write('.');
            }
        } catch (e) {
            process.stdout.write('x');
        }
        await delay(10000);
    }
    console.log('\n❌ Timed out waiting for config update.');
}

run();
