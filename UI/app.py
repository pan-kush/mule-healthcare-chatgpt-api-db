from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat',methods=["POST"])
def chat():
    received_data = request.get_json()
    print(received_data)
    api_url = 'http://localhost:8081/api/order-details'
    headers = {
        'client_id':'abc',
        'client_secret':'def',
        'Content-Type': 'application/json'
    }
    response = requests.post(api_url, headers=headers, json=received_data)
    print(response.text)
    if response.status_code == 200:
        return response.text
    else:
        return jsonify({'error': 'Unable to process your request at the moment'})

if __name__ == '__main__':
    app.run(debug=True)