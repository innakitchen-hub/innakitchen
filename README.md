# Inna Kitchen (innakitchen)

Static site served by Nginx in Docker; CI/CD via GitHub Actions; E2E tests with Cypress.

## Run locally
```bash
docker compose up -d web
# then open http://localhost:8080
```

## Run Cypress locally
```bash
docker compose run --rm cypress
```

## Production (Mac mini)
- DNS: `app.innakitchen.com` -> Cloudflare Tunnel to Mac mini
- Port mapping: `8080:80`

`docker-compose.prod.yml` uses image: `ghcr.io/${REGISTRY_OWNER}/innakitchen:latest`  
Create a `.env` file beside it with:
```
REGISTRY_OWNER=YOUR_GITHUB_USERNAME_OR_ORG
```

## GitHub Actions Secrets required
- `GHCR_READ_TOKEN` (PAT with `read:packages` **and** `write:packages` if pushing from CI)
- `SSH_HOST` (your Cloudflare Tunnel hostname, e.g. `ssh.innakitchen.com`)
- `SSH_USER`, `SSH_KEY` (private key), `SSH_PORT` (usually 22 via tunnel)
- `COMPOSE_PROJECT_DIR` (path on the Mac mini, e.g. `/Users/korakod/deploy/innakitchen`)

The workflow runs:
1. **test**: build & run container, Cypress E2E against `http://localhost:8080`
2. **build_and_push**: push image to GHCR
3. **deploy**: SSH to Mac mini and `docker compose up -d` with `docker-compose.prod.yml`
