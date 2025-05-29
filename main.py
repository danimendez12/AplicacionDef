from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Permitir CORS para el origen localhost:5173 en todas las rutas
CORS(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Datos recibidos:", data)
    return jsonify({"message": "Usuario registrado con éxito"})

if __name__ == '__main__':
    app.run(debug=True)

