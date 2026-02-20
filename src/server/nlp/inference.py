import json

import torch
from flask import Flask, jsonify, request
from transformers import AutoModelForSequenceClassification, AutoTokenizer

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("./trained_model")
model = AutoModelForSequenceClassification.from_pretrained("./trained_model")

# Load label map
with open("./trained_model/label_map.json", "r") as f:
    label_map = json.load(f)

# Initialize Flask app
app = Flask(__name__)


# Define prediction function
def predict(text):
    inputs = tokenizer(text, return_tensors="pt", padding="max_length", truncation=True)
    outputs = model(**inputs)
    predictions = torch.argmax(outputs.logits, dim=-1)
    label = list(label_map.keys())[list(label_map.values()).index(predictions.item())]
    return label


# Define route for prediction
@app.route("/predict", methods=["POST"])
def get_prediction():
    data = request.json
    text = data.get("text")
    if not text:
        return jsonify({"error": "No text provided"}), 400
    intent = predict(text)
    return jsonify({"intent": intent})


# Run the app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
