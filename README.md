
# Password Cracker

Bienvenue dans le projet **Password Cracker**. Ce projet utilise **Flask** pour le backend et **Tailwind CSS** pour le frontend. L'objectif est de générer des combinaisons de mots de passe possibles en fonction de la longueur (`N`) et de la somme des chiffres (`K`) des mots de passe.

## Fonctionnalités

- Crée des combinaisons de mots de passe où la longueur du mot de passe est égale à `N` et la somme des chiffres est égale à `K`.
- Utilise une approche de backtracking pour générer les combinaisons possibles.
- L'API expose une route `/crack` qui accepte une requête `POST` pour récupérer les mots de passe possibles.

## Prérequis

Avant de lancer le projet, tu dois avoir les éléments suivants installés :

- **Python 3.8+**
- **Flask**
- **Flask-Cors**
- **Tailwind CSS** pour le frontend

## Installation

1. Clone ce dépôt sur ta machine locale :
   ```bash
   git clone https://github.com/naderyb/pwd_cracker
   cd password_cracker
   ```

2. Crée et active un environnement virtuel :
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Linux/Mac
   venv\Scripts\ctivate  # Sur Windows
   ```

3. Installe les dépendances Python :
   ```bash
   pip install -r requirements.txt
   ```

4. Installe Tailwind CSS pour le frontend :
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

   Ajoute la configuration Tailwind à ton fichier `tailwind.config.js` et dans ton fichier CSS.

## Lancer le projet

### Backend (Flask)

1. Dans ton terminal, lance l'application Flask :
   ```bash
   python app.py
   ```

2. L'API sera accessible sur [http://127.0.0.1:5000](http://127.0.0.1:5000).

### Frontend (Tailwind)

1. Compile les fichiers CSS avec Tailwind :
   ```bash
   npx tailwindcss -o ./static/css/styles.css --watch
   ```

2. Accède à la page du frontend via le navigateur sur [http://127.0.0.1:5000](http://127.0.0.1:5000).

## Utilisation

Pour générer des mots de passe, envoie une requête `POST` à l'endpoint `/crack` avec les paramètres `n` et `k` :

### Exemple de requête

```bash
curl -X POST http://127.0.0.1:5000/crack -H "Content-Type: application/json" -d '{"n": 4, "k": 10}'
```

### Réponse

```json
{
  "message": "Found 3 possible combinations.",
  "passwords": ["1234", "4321", "1123"]
}
```

## Commandes disponibles

- **`pwd_crack`** : Pour commencer à générer les mots de passe.
- **`clear`** : Pour nettoyer le terminal.
- **`help`** : Pour afficher les cmd disponible.
- **`exit`** : Pour quitter l'application.

## Footer

---

<p align="center">
  &copy; 2024 crack pwd. Tous droits réservés. <br>
  Développé par [YOUB Mahmoud Nader](https://github.com/naderyb)
</p>
