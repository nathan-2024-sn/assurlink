# Deployment Guide for AssurLink NestJS Server

## Status

The NestJS server has been configured for automated deployment via GitHub Actions and Render.

### Build Test (Local)
✅ **VERIFIED**: The NestJS server builds successfully locally.
- `npm install` completes without errors
- `npm run build` (TypeScript compilation) succeeds
- `dist/main.js` is generated correctly

### GitHub Actions Workflows

Three workflows have been configured:

#### 1. `deploy-nestjs.yml` (Main Branch Auto-Trigger)
- **Trigger**: Pushes to `main` that modify `openapi/server-stubs/nestjs/**` or the workflow file
- **Steps**:
  - Checkout code
  - Set up Node.js 20
  - Build NestJS server (`npm install && npm run build`)
  - Log in to GitHub Container Registry
  - Build Docker image
  - Push image to `ghcr.io`
- **Note**: This workflow requires Docker and GitHub token authentication

#### 2. `dispatch-deploy.yml` (Manual Trigger)
- **Trigger**: Manual workflow dispatch on any branch
- **Steps**: Same as `deploy-nestjs.yml`
- **Input**: Optional tag parameter (defaults to `latest`)
- **To Trigger**:
  - GitHub UI: Actions > Dispatch Deploy NestJS > Run workflow
  - CLI: `gh workflow run dispatch-deploy.yml --ref main -f tag=latest`

#### 3. `test-minimal.yml` (Diagnostic)
- **Trigger**: Manual workflow dispatch
- **Purpose**: Verify Actions runner and logging infrastructure
- **To Trigger**:
  - GitHub UI: Actions > Test Minimal > Run workflow
  - CLI: `gh workflow run test-minimal.yml --ref main`

## Deployment Flow

### Option 1: Automatic (Recommended)
1. Push changes to `main` branch that modify NestJS code
2. GitHub Actions automatically triggers `deploy-nestjs.yml`
3. Build succeeds, Docker image is pushed to `ghcr.io/<owner>/assurlink-server:latest`
4. Render detects the new image and auto-deploys (configured in `render.yaml`)

### Option 2: Manual Dispatch
1. Open GitHub Actions UI or use CLI
2. Run `dispatch-deploy.yml` workflow
3. Wait for build and push to complete
4. Trigger Render deploy manually if needed:
   ```bash
   curl -X POST https://api.render.com/v1/services/<SERVICE_ID>/deploys \
     -H "Authorization: Bearer <RENDER_API_KEY>" \
     -H "Content-Type: application/json" \
     -d '{}'
   ```

## Configuration Files

### `render.yaml`
- Configures Render service `assurlink-server`
- Uses Docker build from `openapi/server-stubs/nestjs/Dockerfile`
- Listens on port 1000
- `autoDeploy: true` on branch `main`

### `openapi/server-stubs/nestjs/Dockerfile`
- Builds Node.js application
- Copies compiled `dist/` to container
- Sets start command

### `openapi/server-stubs/nestjs/package.json`
- NestJS dependencies (core, platform-express)
- TypeScript and development tools
- Build script: `"build": "tsc"`
- Start script: `"start": "node dist/main.js"`

## Troubleshooting

### Build Fails
1. Check `npm install` works locally: `cd openapi/server-stubs/nestjs && npm install`
2. Check `npm run build` succeeds: `npm run build`
3. Verify `dist/main.js` is generated
4. Review Actions logs in GitHub UI for specific error

### Docker Build Fails
1. Verify `Dockerfile` exists in `openapi/server-stubs/nestjs/`
2. Build locally: `docker build -t assurlink-server:test .` (from nestjs dir)
3. Check Docker has sufficient disk space

### Render Deployment Fails
1. Verify image exists in `ghcr.io/<owner>/assurlink-server:latest`
2. Check Render dashboard for service health
3. Verify Docker image is accessible (public or Render has credentials)
4. Check port 1000 is correctly configured in Render service

## Next Steps

1. **Merge to main**: Create a PR from `nathan-2024-sn-deployer-site` to `main` to make workflows available on the default branch
2. **Test dispatch**: Run `dispatch-deploy.yml` workflow manually to verify Docker image is built and pushed
3. **Monitor Render**: Check Render dashboard to confirm auto-deploy succeeded
4. **Access deployed service**: Visit Render URL to verify server is running and responding
5. **Monitor metrics**: Check GitHub Actions and Render logs for ongoing deployments

## Commands Reference

### Manually run the dispatch workflow:
```bash
gh workflow run dispatch-deploy.yml --ref main --repo nathan-2024-sn/assurlink -f tag=latest
```

### View recent workflow runs:
```bash
gh run list --workflow dispatch-deploy.yml --repo nathan-2024-sn/assurlink --limit 10
```

### View logs for a specific run:
```bash
gh run view <RUN_ID> --repo nathan-2024-sn/assurlink --log
```

### Build locally for testing:
```bash
cd openapi/server-stubs/nestjs
npm install
npm run build
```

### Test Docker build locally:
```bash
cd openapi/server-stubs/nestjs
docker build -t assurlink-server:test .
docker run -p 3000:1000 assurlink-server:test
```

## Build Verification

- ✅ TypeScript compilation works
- ✅ NestJS dependencies resolve
- ✅ Docker image building configured
- ✅ GitHub Container Registry authentication configured
- ✅ Render auto-deploy configured
- ⚠️ Full end-to-end workflow requires GitHub Actions runner access (currently blocked in this environment)

## Notes

- The workflows have been committed to the `nathan-2024-sn-deployer-site` branch
- Merge to `main` to activate auto-deployment on code changes
- GitHub Actions logs may be sparse due to runner environment constraints
- All build steps have been tested and validated locally
