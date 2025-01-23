from transformers import AutoModelForSequenceClassification, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("llama")
model = AutoModelForSequenceClassification.from_pretrained(
    "model-name", num_labels=NUM_LABELS
)
