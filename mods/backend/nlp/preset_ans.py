import spacy
from transformers import XLNetTokenizer, XLNetLMHeadModel
import torch
from nltk import CFG
from nltk.parse import ChartParser

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Load XLNet model and tokenizer
tokenizer = XLNetTokenizer.from_pretrained("xlnet-base-cased")
model = XLNetLMHeadModel.from_pretrained("xlnet-base-cased")

# Define grammar using CFG
grammar = CFG.fromstring("""
S -> NP VP | Greeting
NP -> Det N | Det N PP | 'I' | 'some' N | N
VP -> V NP | V NP PP | V Adv | V VP
PP -> P NP
Det -> 'a' | 'an' | 'the' | 'my' | 'your'
N -> 'financial' | 'insurance' | 'retirement' | 'help' | 'emergency' | 'literacy' | 'advice' | 'savings'
V -> 'need' | 'want' | 'have' | 'am' | 'seeking' | 'know' | 'about'
P -> 'in' | 'with' | 'for' | 'to'
Adv -> 'some' | 'more'
Greeting -> 'hello' | 'hi' | 'hey' | 'goodbye' | 'bye'
""")

parser = ChartParser(grammar)

# Define keyword dictionaries
keyword_dict = {
    "hello": "Hi, how can I assist you today?",
    "hi": "Hi, how can I assist you today?",
    "hey": "Hi, how can I assist you today?",
    "bye": "Goodbye! Have a great day!",
    "goodbye": "Goodbye! Have a great day!",
    "help": "Sure, I'm here to help. What do you need?",
}

financial_terms = {
    "Financial Literacy": [
        "Budgeting", "Savings", "Investments", "Interest", "Credit", "Debt",
        "Net Worth", "Cash Flow", "Assets", "Liabilities", "Income", "Expenses",
        "Emergency Fund", "Diversification", "Inflation"
    ],
    "Insurance": [
        "Premium", "Policy", "Coverage", "Claim", "Deductible", "Beneficiary",
        "Underwriting", "Liability", "Actuary", "Exclusion", "Endorsement",
        "Renewal", "Term", "Rider", "Subrogation"
    ],
    "Retirement": [
        "Pension", "401(k)", "IRA", "Annuity", "Social Security", "Roth IRA",
        "Retirement Age", "Retirement Planning", "Contribution", "Distribution",
        "Deferred Compensation", "Early Withdrawal", "Mandatory Distribution",
        "Defined Benefit Plan", "Defined Contribution Plan"
    ]
}

def extract_keywords(sentence):
    doc = nlp(sentence.lower())
    keywords = [token.text for token in doc if token.pos_ in ['NOUN', 'VERB', 'ADJ']]
    return keywords

def generate_response_with_xlnet(input_text):
    inputs = tokenizer.encode(input_text, return_tensors="pt")
    outputs = model.generate(
        inputs,
        max_length=50,
        num_return_sequences=1,
        temperature=0.7,
        top_k=50,
        top_p=0.95,
        repetition_penalty=2.0,
        do_sample=True  # Enable sampling
    )
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response

def parse_sentence(sentence):
    tokens = sentence.lower().split()
    try:
        tree = next(parser.parse(tokens))
        return tree
    except Exception as e:
        return None

def respond_to_query(sentence):
    # First check for exact matches in the keyword_dict
    tokens = sentence.lower().split()
    for token in tokens:
        if token in keyword_dict:
            return keyword_dict[token]

    # If no exact match, use spaCy to extract keywords
    keywords = extract_keywords(sentence)

    # Check for financial terms
    for keyword in keywords:
        for category, terms in financial_terms.items():
            if keyword.capitalize() in terms:
                return f"You mentioned {keyword}. Do you need information on {category}?"

    # Parse sentence to extract intent
    tree = parse_sentence(sentence)
    if tree:
        print("Parsed Tree: ", tree)
        # Generate syntactic response
        return "I see you're talking about financial topics. How can I assist you specifically?"

    # If no relevant keywords are found, generate a response with XLNet
    return generate_response_with_xlnet(sentence)

# Example usage
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit", "bye"]:
        print("Bot: Goodbye! Have a great day!")
        break
    response = respond_to_query(user_input)
    print(f"Bot: {response}")