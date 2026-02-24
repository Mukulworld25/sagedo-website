---
description: How to permanently break out of React Native / EAS or package build failure loops
---

If you encounter the same build error (e.g., Metro Bundler, EAS, SyntaxError, Invalid package config, or any deployment failure) MORE THAN 2 TIMES consecutively, you MUST stop modifying code locally and immediately execute this Hard Reset Protocol:

1. Acknowledge to the user that a caching/environment loop has been detected.
2. Stop trying to edit configuration files blindly.
3. Execute the full environment reset commands:
```bash
// turbo-all
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue 
Remove-Item -Force yarn.lock -ErrorAction SilentlyContinue
npm cache clean --force
npm install
```
4. If using Expo / React Native, start with clearing the cache:
```bash
// turbo-all
npx expo start -c
```
5. If the exact same error persists after the Hard Reset, DO NOT guess. Use the `view_file` or `grep_search` tools to pinpoint the exact corrupted node_module package, show it to the user, and design a surgical replacement strategy.
