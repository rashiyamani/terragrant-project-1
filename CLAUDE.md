# terragrant-project-1

React static site on AWS (S3 + CloudFront), provisioned with OpenTofu + Terragrunt, deployed by GitHub Actions.

## Layout
- `frontend/` – React app (react-scripts). `npm ci && npm run build` -> `frontend/build`
- `infra/modules/static-site/` – S3 (private, OAC) + CloudFront module
- `infra/live/{dev,staging,prod}/frontend/terragrunt.hcl` – per-env inputs; `infra/live/root.hcl` – S3 remote state + provider
- `.github/workflows/main-pipeline.yml` – plan -> apply -> deploy. Branch `dev`/`staging`/`main` maps to env dev/staging/prod.

## Security rules (do not weaken)
- No long-lived AWS keys. CI authenticates via GitHub OIDC (`secrets.AWS_ROLE_ARN`), one role per environment ideally.
- S3 bucket stays private: public access block on, access only via CloudFront OAC, TLS-only policy, SSE + versioning on.
- CloudFront: HTTPS redirect, managed security-headers policy, no `forwarded_values`.
- Never `force_destroy = true` outside throwaway sandboxes. Never commit secrets, `.env`, state files or `.terragrunt-cache`.
- Prod apply must go through the GitHub `prod` Environment with required reviewers.
- Never run `apply`/`destroy` or `aws s3 sync --delete` without showing the plan and getting explicit user approval.

## Commands
- Validate module: `terraform fmt -check infra/modules/static-site` and `terraform init -backend=false && terraform validate` (in a temp copy)
- Plan: `cd infra/live/<env>/frontend && terragrunt plan`
- Build app: `cd frontend && npm ci && npm run build`

## Project agents and skills
- Agents: `infra-security-reviewer` (read-only review), `aws-deployer` (plan -> approval -> apply)
- Skills: `/terraform-security-review`, `/pipeline-check`, `/deploy-to-aws`
