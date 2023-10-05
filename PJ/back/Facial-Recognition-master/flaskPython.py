from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/do_something', methods=['POST'])
def do_something():
    data = request.json
    # 파이썬 코드 실행 및 결과 생성
    result = {"result": "Your Python code result here"}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
