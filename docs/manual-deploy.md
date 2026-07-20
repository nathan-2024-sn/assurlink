Guide de déploiement manuel

1) Déclencher depuis GitHub (recommandé si GitHub Actions & Docker sont disponibles)

- Ouvrir Actions > Dispatch Deploy NestJS > Run workflow, choisir tag si besoin.
- Ou via CLI (si authentifié):
  gh workflow run dispatch-deploy.yml --repo nathan-2024-sn/assurlink -f tag=latest

2) Déployer localement (si Docker disponible et accès ghcr):

- Dans openapi/server-stubs/nestjs:
  npm install
  npm run build

- Construire l'image Docker et la pousser (ex):
  docker build -t ghcr.io/<owner>/assurlink-server:latest .
  echo $CR_PAT | docker login ghcr.io -u <user> --password-stdin
  docker push ghcr.io/<owner>/assurlink-server:latest

3) Déploiement Render

- Le fichier render.yaml configure un service Docker qui utilise openapi/server-stubs/nestjs/Dockerfile et écoute sur le port 1000.
- Render est configuré pour autoDeploy sur la branche main. Après l'image sur ghcr, mettre à jour le service Render pour utiliser le tag voulu si nécessaire.

4) Remarques

- Ce dépôt ne sait pas s'il y a des checks/protections sur main; la fusion automatique peut échouer si des règles existent.
- Ici, Docker n'est pas installé dans l'environnement d'exécution — la construction/push locale doit être faite depuis une machine avec Docker ou via GitHub Actions.
