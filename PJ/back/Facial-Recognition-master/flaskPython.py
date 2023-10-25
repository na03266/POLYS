from flask import Flask, request, jsonify

app = Flask(__name__)

# 예제 데이터
users = [
    {"id": 1, "name": "John"},
    {"id": 2, "name": "Alice"}
]

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((user for user in users if user["id"] == user_id), None)
    if user:
        return jsonify(user)
    else:
        return "User not found", 404

if __name__ == '__main__':
    app.run(debug=True)
