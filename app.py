from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Allow everyone to access the API

# Function to find password combinations
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

# Route for the homepage
@app.route('/')
def home():
    return render_template('index.html')  # Make sure index.html is in the templates folder

# API route to crack the password
@app.route('/crack', methods=['POST'])
def crack_password():
    data = request.json
    n = data.get('n')
    k = data.get('k')

    # Input validation
    if n is None or k is None:
        return jsonify({"message": "Invalid input: N and K are required."}), 400
    
    if not isinstance(n, int) or not isinstance(k, int):
        return jsonify({"message": "N and K must be integers."}), 400

    # Find the possible password combinations
    passwords = find_password_combinations(n, k)

    if not passwords:
        return jsonify({"message": "No valid password combinations found."}), 404
    
    # Return the first 5 password combinations
    return jsonify({"message": f"Found {len(passwords)} possible combinations.", "passwords": passwords[:5]})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Use the PORT environment variable if available
    app.run(host='0.0.0.0', port=port)
