# TechFluencer Publishing Workflow

This repository uses a simple production/draft model.

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
