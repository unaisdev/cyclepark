# Git conventions — CiclePark

This document defines **how to name commits** and **how to group changes** so history stays readable and easy to review.

---

## Message format (Conventional Commits)

Each message follows:

```text
<type>(<optional scope>): <short imperative description>

[optional body: paragraphs explaining why or details]

[optional footer: breaking change, issue references]
```

- **One subject line** (~72 characters max recommended); no trailing period on the short description.
- **Language:** **English** for commit messages in this repository (imperative, consistent with tooling and `docs/`).
- **Imperative mood:** *add*, *fix*, not *added* / *fixing*.

### Common types

| Type | When to use |
|------|-------------|
| `feat` | New user-visible behavior or public app API. |
| `fix` | Bug fix. |
| `docs` | Documentation only (`docs/`, meaningful JSDoc, README). |
| `style` | Formatting, whitespace; **no** behavior change. |
| `refactor` | Code restructuring without behavior or API change. |
| `perf` | Performance improvement. |
| `test` | Add or fix tests. |
| `chore` | Maintenance: dependencies, tooling, CI, `.gitignore`, scripts without a new feature. |
| `build` | Build or bundling system (Metro, Babel, Gradle/Xcode via config). |
| `ci` | Continuous integration. |

**Breaking change:** in the message body, a line starting with `BREAKING CHANGE:` describing what breaks and how to migrate; or in the subject, `feat!:` / `fix!:` as appropriate.

### Optional scope (`scope`)

Narrow the area of code, lowercase and short:

- `map`, `nav`, `i18n`, `theme`, `settings`, `deps`, `expo`, etc.

Examples:

- `feat(map): add search-in-area chip`
- `fix(nav): avoid tab bar remount on every render`
- `chore(deps): bump expo to 54`

---

## Atomic commits

A commit should represent **one complete logical change** that is reasonable to review or revert **on its own**.

- **Yes:** one commit for `docs` only; another for a single `feat` on screen X.
- **No:** one commit mixing “new screen + bump five libraries + reformat entire repo”.

If you need to save mid-work, use `git stash` or temporary branches; before opening a PR, **reorder** with `git rebase -i` if needed (do not rewrite history already on shared `main` without team agreement).

---

## Short workflow

1. `git pull` / sync with `main`.
2. Working branch: `feat/short-name` or `fix/issue-123`.
3. Small commits with messages per this guide.
4. Push and PR; the PR can summarise the set; commits remain the atomic unit.

---

## References

- [Conventional Commits (spec)](https://www.conventionalcommits.org/)

---

### Change history (this file)

| Date | Change |
|------|--------|
| 2026-03-24 | Initial version: types, scope, atomicity, workflow. |
| 2026-03-24 | Document language: English for commit messages. |
