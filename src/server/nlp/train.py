import json
import spacy
import torch
from transformers import Trainer, TrainingArguments, AutoModelForSequenceClassification, AutoTokenizer
from datasets import Dataset, DatasetDict
import os

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Function to load intents from JSON files
def load_intents(filenames):
    data = []
    for filename in filenames:
        with open(filename, 'r') as f:
            data.extend(json.load(f))
    return data

# List of JSON files containing intents
filenames = ['intents1.json', 'intents2.json', 'intents3.json', 'intents4.json', 'intents5.json']

# Load intents from JSON files
data = load_intents(filenames)

# Function to preprocess data and create dataset
def preprocess_data(data):
    texts = []
    labels = []
    label_map = {label: i for i, label in enumerate(set(item['intent'] for item in data))}

    for item in data:
        texts.append(f"{item['text']} {item.get('details', '')}")
        labels.append(label_map[item['intent']])

    return texts, labels, label_map

texts, labels, label_map = preprocess_data(data)

# Create Hugging Face dataset
dataset = Dataset.from_dict({"text": texts, "label": labels})
dataset = dataset.train_test_split(test_size=0.2)

# Load tokenizer and model
model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=len(label_map))

# Tokenize data
def tokenize_function(examples):
    return tokenizer(examples["text"], padding="max_length", truncation=True)

tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Define training arguments
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=16,
    num_train_epochs=3,
    weight_decay=0.01,
)

# Create Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["test"],
    tokenizer=tokenizer,
)

# Train the model
trainer.train()

# Save the model and tokenizer
trained_model_path = "/app/trained_model"
trainer.save_model(trained_model_path)
tokenizer.save_pretrained(trained_model_path)

# Save label map
with open(os.path.join(trained_model_path, "label_map.json"), "w") as f:
    json.dump(label_map, f)

# Function to make predictions
def predict(text):
    inputs = tokenizer(text, return_tensors="pt", padding="max_length", truncation=True)
    outputs = model(**inputs)
    predictions = torch.argmax(outputs.logits, dim=-1)
    label = list(label_map.keys())[list(label_map.values()).index(predictions.item())]
    return label

# Example usage
if __name__ == '__main__':
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit", "bye"]:
            print("Bot: Goodbye! Have a great day!")
            break
        intent = predict(user_input)
        print(f"Bot: Detected intent - {intent}")
