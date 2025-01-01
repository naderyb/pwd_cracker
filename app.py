from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  #pour que tout le monde puisse accéder à l'API

def find_password_combinations(n, k):
    results = []
    
    def backtrack(current, current_sum):
        #si la longueur de la combinaison est égale à N et que la somme est égale à K, on ajoute la combinaison
        if len(current) == n:
            if current_sum == k:
                results.append(''.join(map(str, current)))
            return
        
        #on essaie chaque chiffre de 0 à 9
        for digit in range(10):
            #si la somme actuelle dépasse K, on arrête de chercher plus loin
            if current_sum + digit > k:
                continue
            current.append(digit)
            backtrack(current, current_sum + digit)
            current.pop()  #enlever le dernier chiffre et essayer un autre
    backtrack([], 0)
    return results

@app.route('/crack', methods=['POST'])
def crack_password():
    data = request.json
    n = data.get('n')
    k = data.get('k')

    #input validation
    if n is None or k is None:
        return jsonify({"message": "Invalid input: N and K are required."}), 400
    
    if not isinstance(n, int) or not isinstance(k, int):
        return jsonify({"message": "N and K must be integers."}), 400

    #trouver les combinaisons de mots de passe possibles
    passwords = find_password_combinations(n, k)

    #si aucune combinaison n'est trouvée on retourne un message d'erreur
    if not passwords:
        return jsonify({"message": "No valid password combinations found."}), 404
    
    #retouner la liste des mdps trouvee
    return jsonify({"message": f"Found {len(passwords)} possible combinations.", "passwords": passwords[:5]})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))  # Utilise la variable d'environnement PORT si disponible
    app.run(host='0.0.0.0', port=port)
