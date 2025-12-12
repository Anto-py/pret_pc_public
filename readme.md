# 📱 Prêt PC - Gestion des prêts de laptops

Application web simple pour gérer les prêts de PC/laptops dans un établissement scolaire.

🔗 **Démo :** [VOTRE_LIEN_GITHUB_PAGES]

![Capture d'écran](screenshot.png)

## ✨ Fonctionnalités

- **Prêt rapide** : Sigle enseignant + nombre de PC en 2 secondes
- **Retours flexibles** : Tout rendre ou retour partiel
- **Historique complet** : Toutes les opérations horodatées
- **Sync Google Sheets** : Données partagées entre plusieurs postes
- **Mode hors-ligne** : Fonctionne sans connexion, sync au retour
- **Responsive** : Mobile et desktop
- **Export CSV** : Pour vos rapports

## 🚀 Installation

### Prérequis
- Un compte Google (pour Google Sheets)
- Un compte GitHub (pour l'hébergement gratuit)

### Étape 1 : Créer le Google Sheet

1. Créer un nouveau [Google Sheet](https://sheets.new)
2. Renommer la première feuille : `Prets`
3. Ajouter les en-têtes en ligne 1 :

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| id | sigle | nbPC | retournes | heure | timestamp |

4. Créer une deuxième feuille : `Historique`
5. Ajouter les en-têtes en ligne 1 :

| A | B | C | D | E |
|---|---|---|---|---|
| id | timestamp | sigle | action | type |

### Étape 2 : Configurer Google Apps Script

1. Dans votre Google Sheet : **Extensions → Apps Script**
2. Supprimer le code existant
3. Coller le contenu du fichier `google-apps-script.js`
4. **Enregistrer** (Ctrl+S)
5. Cliquer sur **Exécuter** pour autoriser le script (accepter les permissions)
6. **Déployer → Nouveau déploiement**
   - Type : **Application Web**
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
7. Cliquer **Déployer**
8. **Copier l'URL** qui ressemble à :
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

### Étape 3 : Configurer l'application

1. Télécharger le fichier `index.html`
2. Ouvrir dans un éditeur de texte
3. Trouver cette ligne (vers le début) :
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/XXXXXX/exec";
   ```
4. Remplacer `XXXXXX` par votre ID de déploiement

### Étape 4 : Héberger sur GitHub Pages

1. Créer un nouveau repository sur GitHub
2. Uploader le fichier `index.html`
3. Aller dans **Settings → Pages**
4. Source : **Deploy from a branch**
5. Branch : **main** / **/ (root)**
6. **Save**

Votre app est accessible à : `https://VOTRE_USERNAME.github.io/NOM_DU_REPO/`

## 📖 Utilisation

### Enregistrer un prêt
1. Saisir le sigle de l'enseignant (2-4 lettres)
2. Saisir le nombre de PC
3. Cliquer **Prêter** ou appuyer sur **Entrée**

### Enregistrer un retour
- **Retour total** : Cliquer le bouton vert **Tout (X)**
- **Retour partiel** : Cliquer **Partiel**, saisir le nombre, valider

### Consulter l'historique
- Cliquer sur l'onglet **Historique**
- Export possible en CSV

## 🔧 Dépannage

### "Mode hors-ligne" reste affiché
- Vérifier l'URL du script dans `index.html`
- Tester l'URL directement dans le navigateur : `VOTRE_URL?action=load`
- Doit afficher : `{"pretsActifs":[],"historique":[]}`

### "Action inconnue"
- Redéployer le Apps Script avec une **nouvelle version**
- Vérifier que les permissions sont accordées

### Les données ne se synchronisent pas
- Vérifier que les feuilles s'appellent exactement `Prets` et `Historique`
- Vérifier que les en-têtes sont corrects

## 📁 Fichiers

| Fichier | Description |
|---------|-------------|
| `index.html` | Application web (à héberger sur GitHub Pages) |
| `google-apps-script.js` | Script à coller dans Google Apps Script |

## 🤝 Contribution

Les suggestions et améliorations sont les bienvenues ! Ouvrez une issue ou une PR.

## 📄 Licence

MIT - Libre d'utilisation et de modification.

---

Créé avec ❤️ et l'aide de [Claude](https://claude.ai) (Anthropic)
