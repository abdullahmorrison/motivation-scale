# Contributing

## Branches

Branch off `main` using `type/slug`, where `type` matches the commit types below:

```
docs/architecture-svg          feat/scale-reorder
fix/auth-token-expiry          chore/pr-process
```

If the work has an issue, put the number after the type: `feat/75-scale-reorder`.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject`.

| | |
| --- | --- |
| **Types** | `feat` `fix` `docs` `refactor` `test` `perf` `build` `ci` `chore` |
| **Scopes** | `server` `website` `mobile` `docs` `infra` `ci` — optional, but it makes `git log --grep "(mobile)"` useful |

```
feat(mobile): add drag-to-reorder on the dashboard
fix(server): reject expired JWTs in the Apollo context
docs: replace the mermaid diagram with a hand-drawn SVG
```

Only the **PR title** is checked, because PRs are squash-merged and the title becomes
the commit message on `main`. Individual commits on your branch are discarded, so name
them however you like while working.

## Pull requests

1. Push the branch and open a PR against `main`
2. CI runs the server tests, the website lint + build, and the mobile typecheck
3. Merge once it's green — squash, and let the branch be deleted

CI can't see everything. It doesn't render the README on GitHub, run the app on a
device, or reach the tailnet, so check those yourself and attach screenshots for
anything visual.

## Running things locally

See [Local Setup](README.md#local-setup) for the server, website, and mobile app.
Server tests are `npm test` in `/server` — they require a MongoDB and refuse to run
unless `DB_NAME` is exactly `test`.
