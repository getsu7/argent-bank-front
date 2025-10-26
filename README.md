# Argent Bank - Frontend

Application bancaire moderne développée avec React 19, TypeScript et Redux Toolkit.

## 📋 Prérequis

- **Node.js** : >= 18.0.0 (recommandé: LTS 20.x)
- **npm** : >= 9.0.0

⚠️ **Important** : Les versions de Node.js inférieures à 18 ne sont pas supportées en raison de TypeScript 5.9 et ESLint

9.

### Vérifier votre version

```bash
node --version  # Devrait afficher v18.x.x ou plus
npm --version   # Devrait afficher 9.x.x ou plus
```

### Mettre à jour Node.js (si nécessaire)

**macOS avec Homebrew :**

```bash
brew install node@20
```

**macOS/Linux avec nvm :**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

## 🛠️ Installation

```bash
# 1. Cloner le repository
git clone <url-du-repo>
cd argent-bank-front

# 2. Installer les dépendances
npm install
```

## 🚀 Lancement

### Mode développement

```bash
npm run dev
```

→ Ouvre http://localhost:5173

### Build de production

```bash
npm run build
```

→ Génère les fichiers dans `/dist`

### Preview du build

```bash
npm run preview
```

→ Teste le build localement

### Linting

```bash
npm run lint
```

→ Vérifie la qualité du code

## 📁 Structure du projet

```
src/
├── assets/              # Images et ressources
├── components/          # Composants réutilisables
│   ├── ErrorBoundary.tsx    # Gestion globale des erreurs
│   ├── ProtectedRoute.tsx
│   ├── feature/
│   ├── footer/
│   └── navigation/
├── models/              # Types TypeScript
├── pages/               # Pages de l'application
│   ├── home/            
│   ├── login/           
│   └── profile/         
├── sass/                # Styles globaux
├── services/            # Services API
│   ├── endpoints.ts     
│   └── UserService.ts   
└── store/               # Redux store
    ├── hooks.ts
    ├── store.ts
    └── user.ts
```

## 🔐 Variables d'environnement

### Fichier `.env`

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001

# Application Configuration
VITE_APP_NAME=Argent Bank

```

## 🔧 Fonctionnalités principales

### ✅ Implémenté

- Authentification (login/logout)
- Gestion de session (Remember Me)
- Profil utilisateur (affichage et modification)
- Routes protégées
- Persistance de session (localStorage/sessionStorage)
- Gestion avancée des erreurs
- Error Boundary
- Optimisations de performance
