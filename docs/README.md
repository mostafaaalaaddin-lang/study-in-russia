# Optional: automatic deploys

`github-pages-workflow.yml` is a GitHub Actions workflow that rebuilds the site
and redeploys it every time you push to `main`.

It is kept here rather than in `.github/workflows/` because pushing a workflow
file needs a token with the `workflow` scope, which the machine that set this
repo up did not have. To enable it:

```bash
gh auth refresh -s workflow
mkdir -p .github/workflows
git mv docs/github-pages-workflow.yml .github/workflows/deploy.yml
git commit -am "Enable automatic Pages deploys"
git push
```

Then set Pages to build from GitHub Actions in the repository settings.

Until then, redeploy manually with `npm run deploy`.
