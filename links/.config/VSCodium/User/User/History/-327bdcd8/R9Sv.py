
from transformers import LlamaForCausalLM, LlamaTokenizer

# Load the pre-trained Llama model
model = LlamaForCausalLM.from_pretrained("decapoda-research/llama-3.2-3b")
tokenizer = LlamaTokenizer.from_pretrained("decapoda-research/llama-3.2-3b")

# Fine-tune the model on your data
model.train_on_batch(train_data, learning_rate=1e-5)

# Evaluate the model on the validation set
val_loss = model.evaluate(val_data)
print(f"Validation loss: {val_loss}")

# Save the fine-tuned model
model.save_pretrained("./trained-llama")
