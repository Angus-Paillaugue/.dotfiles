from transformers import AutoModelForSequenceClassification, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("llama3.2:3b")
model = AutoModelForSequenceClassification.from_pretrained(
    "model-name", num_labels=NUM_LABELS
)
