# Description

This is a reproduction repo for the @Hookform/resolvers peerDependencies bug.

In this repo there are 4 branches that reproduce the issue using a differnt package manager:

1. `master` branch is configured with npm
2. `yarn` branch is configured with yarn
3. `pnpm` branch is configured with pnpm
4. `bun` branch is configured with bun

## Reproduce the issue

1. Clone the repo
2. Checkout the branch with the package manager you want to test
3. run `node test.js` (also works with bun it calls bun inside the script)
