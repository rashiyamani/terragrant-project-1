---
name: pipeline-check
description: Audit .github/workflows for security and correctness (OIDC, permissions, injection, approval gates, pinned actions).
---

Read `.github/workflows/*.yml` and check:
1. No `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY`; uses `role-to-assume` with `id-token: write` only on jobs that need it.
2. Top-level `permissions: contents: read`.
3. No `${{ github.* }}` / user-controlled values interpolated directly in `run:`; pass via `env:`.
4. Apply/deploy jobs use `environment:` and only run on `push`; prod environment has required reviewers (tell the user to verify in repo Settings -> Environments).
5. Actions pinned (flag tag-only pins; suggest commit SHAs).
6. YAML parses (`ruby -ryaml -e 'YAML.load_file(ARGV[0])' <file>`).

Report findings as severity / location / fix.
