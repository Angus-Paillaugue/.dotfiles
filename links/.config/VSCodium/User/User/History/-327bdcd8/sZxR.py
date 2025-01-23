from transformers import LlamaForCausalLM, LlamaTokenizer
import markdown
from sklearn.model_selection import train_test_split

from huggingface_hub import login

login(token="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")


# Read the Markdown file
with open("../frontend/src/lib/assets/ai/context.md", "r") as file:
    markdown_content = file.read()

# Convert Markdown to plain text
text_content = markdown.markdown(markdown_content)

# Load the pre-trained Llama model
model = LlamaForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B-Instruct")
tokenizer = LlamaTokenizer.from_pretrained("meta-llama/Llama-3.2-1B-Instruct")

# Preprocess the text
text_content = text_content.replace("\n", " ")
tokens = tokenizer.encode(text_content, return_tensors="pt")

# Split the data into training and validation sets
train_tokens, val_tokens = train_test_split(tokens, test_size=0.2, random_state=42)

# Your train_data and val_data are now ready to be used for fine-tuning the Llama model
train_data = train_tokens
val_data = val_tokens


# Fine-tune the model on your data
model.train_on_batch(train_data, learning_rate=1e-5)

# Evaluate the model on the validation set
val_loss = model.evaluate(val_data)
print(f"Validation loss: {val_loss}")

# Save the fine-tuned model
model.save_pretrained("./trained-llama")
