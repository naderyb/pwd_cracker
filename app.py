from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  #activer CORS pour permettre les requêtes de n'importe quel domaine

#fonction pour trouver les combinaisons de mots de passe possibles
def find_password_combinations(n, k):
    results = []

    def backtrack(current, current_sum):
        if len(current) == n:
            if current_sum == k:
                results.append(''.join(map(str, current)))
            return
        
        for digit in range(10):
            if current_sum + digit > k:
                continue
            current.append(digit)
            backtrack(current, current_sum + digit)
            current.pop()
    
    backtrack([], 0)
    return results

#path pour la page d'accueil
@app.route('/')
def home():
    return render_template('index.html')

#API path pour la page d'accueil
@app.route('/crack', methods=['POST'])
def crack_password():
    data = request.json
    n = data.get('n')
    k = data.get('k')

    #validation de l'input
    if n is None or k is None:
        return jsonify({"message": "Invalid input: N and K are required."}), 400
    
    if not isinstance(n, int) or not isinstance(k, int):
        return jsonify({"message": "N and K must be integers."}), 400

    #trouver les combinaisons de mots de passe possibles
    passwords = find_password_combinations(n, k)

    if not passwords:
        return jsonify({"message": "No valid password combinations found."}), 404
    
    return jsonify({"message": f"Found {len(passwords)} possible combinations.", "passwords": passwords[:5]})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
