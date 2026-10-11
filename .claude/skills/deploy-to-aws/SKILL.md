---
name: deploy-to-aws
description: Guided, approval-gated deployment of this project to an AWS environment (dev/staging/prod), including one-time OIDC and state-backend setup.
disable-model-invocation: true
---

Ask which environment, then:

## One-time setup (verify, don't assume)
1. State backend from `infra/live/root.hcl`: S3 bucket `my-company-opentofu-state` (versioned, encrypted, private) and DynamoDB table `opentofu-locks` (hash key `LockID`). The bucket name must be globally unique; change it if taken.
2. IAM OIDC provider `token.actions.githubusercontent.com` (audience `sts.amazonaws.com`).
3. IAM role for GitHub with trust policy limited to this repo, e.g.
   `"token.actions.githubusercontent.com:sub": "repo:<owner>/<repo>:environment:<env>"`.
   Permissions: S3, CloudFront, state bucket and lock table only, scoped to `my-react-app-*` resources.
4. GitHub: add secret `AWS_ROLE_ARN`; create Environments `dev`, `staging`, `prod`; add required reviewers on `prod`.
5. Remove any old `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` secrets and rotate those keys.
6. S3 bucket names in `infra/live/*/frontend/terragrunt.hcl` and the pipeline must be globally unique.

## Deploy
Use the `aws-deployer` agent for the chosen environment. Start with dev; promote via PR dev -> staging -> main.
