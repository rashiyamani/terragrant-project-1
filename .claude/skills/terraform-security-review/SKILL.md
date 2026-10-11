---
name: terraform-security-review
description: Security review of the OpenTofu/Terragrunt infra (S3, CloudFront, state backend) in this repo. Use before any deploy or after changes under infra/.
---

Delegate to the `infra-security-reviewer` agent with the scope "infra/". Also verify:
- `terraform fmt -check infra/modules/static-site`
- `terraform validate` in a temp copy of the module (`init -backend=false`)
- each `infra/live/*/frontend/terragrunt.hcl`: `force_destroy = false`, tags present, unique bucket name

Present the agent's findings table and highlight blockers.
