feature/pilot-mvp

Branche de travail pour le MVP du pilote.

# Déploiement

Le service NestJS est situé dans `openapi/server-stubs/nestjs`.

## Déploiement Render

- Le fichier `render.yaml` configure un service `assurlink-server` en mode Docker.
- Render utilisera `openapi/server-stubs/nestjs/Dockerfile` pour construire l'image.
- Le service écoute sur le port `1000`.
- Le déploiement automatique est activé pour la branche `main`.

## Workflow GitHub Actions

- `.github/workflows/deploy-nestjs.yml` construit l'application et pousse une image Docker vers GitHub Container Registry (`ghcr.io`).
- Le service Docker est prêt à être déployé sur Render ou tout autre runtime Docker.
