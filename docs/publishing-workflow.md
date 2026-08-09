# TechFluencer Publishing Workflow

This repository uses a simple production/draft model.

## Mandatory GitHub-first handoff

Every blog must be safe in GitHub before it is handed over for review. A local
file or local-only commit is **not** a completed deliverable.

1. Start from an up-to-date `main` branch and create one dedicated branch per
   blog, for example `blog/005-harbor-in-vks`.
2. Add only the intended blog files and related documentation/assets to that
   branch. Do not mix unrelated work into the commit.
3. Commit with a clear message, then push the branch to `origin`.
4. Verify that the remote branch and commit are visible on GitHub before saying
   the work is ready.
5. In every handoff, provide the GitHub branch link and the exact macOS commands
   to fetch, switch, verify, and preview the article.

Standard Mac handoff commands (replace the branch and filename as needed):

```bash
cd ~/Documents/PersonalWebsite
git fetch origin
git switch --track origin/blog/005-harbor-in-vks
git status -sb
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/blogs/005-harbor-in-vks.html
```

`git status -sb` must show that the local branch tracks the matching
`origin/blog/...` branch. Stop the preview server with `Control-C`.

## Branches

- `main` is the live production branch. GitHub Pages should publish from `main` and `/` root.
- `drafts` is the working branch for unpublished blogs, future assets, experiments, and staged content.

## Weekly publishing model

1. Write and review future blogs in `drafts`.
2. Keep only the intended public articles linked from `main`.
3. When a blog is ready, copy or merge only that blog and its assets from `drafts` into `main`.
4. Update `index.html` so the new module appears in the published modules list.
5. Update `sitemap.xml` with the new public blog URL.
6. Push `main` to publish.

## Demoting or offboarding a blog

Preferred method:

1. Keep the blog in `drafts` or an archive branch.
2. Remove the blog HTML file from `main` if it should not be publicly accessible.
3. Remove links from `index.html`.
4. Remove the blog URL from `sitemap.xml`.
5. Keep Git history as backup.

## Custom domain and HTTPS

Planned domain:

```text
sourabhshrivastav.com
```

After the domain is purchased:

1. Configure DNS for GitHub Pages.
2. Add the custom domain in GitHub Pages settings.
3. Wait for GitHub to provision the TLS certificate.
4. Enable **Enforce HTTPS**.

## DNS records for apex domain

Use these GitHub Pages A records:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www`, use a CNAME to:

```text
soshriva.github.io
```
