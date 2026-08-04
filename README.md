# Français pour Tous Pro 2026

Application moderne d'apprentissage du français avec support hors ligne, interface mobile-first et fonctionnalités avancées.

## 🌟 Fonctionnalités

- ✅ Authentification Firebase (Email, Google)
- 📚 Vocabulaire, grammaire, conjugaison
- 🎯 Quiz interactifs
- 🎬 Vidéos éducatives
- 💎 Abonnement Premium (MVola, Orange Money, Airtel Money)
- 🌙 Mode sombre
- 🗣️ Support multilingue (FR, EN, MG)
- 📱 Application Progressive Web App (PWA)
- 🔄 Support hors ligne (Service Worker, IndexedDB)
- 🎨 Interface Material Design 3

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/BENJASOA/francais-pour-tous-pro-2026.git
cd francais-pour-tous-pro-2026

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env
# Éditer .env avec vos clés Firebase

# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

## 📁 Structure du projet

```
src/
├── components/       # Composants réutilisables
├── pages/           # Pages de l'application
├── hooks/           # Custom hooks
├── store/           # Zustand stores
├── services/        # Services (API, Firebase, etc.)
├── types/           # Types TypeScript
├── constants/       # Constantes
├── utils/           # Utilitaires
└── App.tsx          # Composant principal
```

## 🛠️ Technologies utilisées

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Material-UI (MUI) v5
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Backend**: Firebase
- **Database**: Firestore, IndexedDB
- **Notifications**: React Hot Toast
- **Forms**: Material-UI TextField
- **Routing**: React Router v6

## 📱 Pages principales

- 🏠 **Accueil**: Vue d'ensemble des leçons
- 📖 **Vocabulaire**: Apprentissage des mots
- ❓ **Quiz**: Tests interactifs
- 🎥 **Vidéos**: Contenu vidéo éducatif
- 💎 **VIP**: Abonnement Premium
- 👤 **Profil**: Gestion du compte
- ⚙️ **Paramètres**: Préférences utilisateur

## 🔐 Authentification

- Connexion par email/mot de passe
- Connexion Google OAuth
- Inscription utilisateur
- Gestion de session

## 💳 Paiements

- MVola (Telma)
- Orange Money
- Airtel Money

## 📊 Fonctionnalités Premium

- Accès illimité aux leçons
- Téléchargement de contenu
- Sans publicités
- Support prioritaire
- Contenu exclusif

## 🤝 Contribution

Les contributions sont bienvenues! Veuillez créer une branche pour votre feature et soumettre une pull request.

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails

## 👨‍💼 Auteur

**BENJASOA** - [GitHub](https://github.com/BENJASOA)

## 📞 Support

Pour toute question ou problème, veuillez créer une issue sur GitHub.

---

**Dernière mise à jour**: Août 2026
