import torch

with open("../frontend/src/lib/assets/ai/context.md", "r") as file:
    content = file.read()


from transformers import LlamaForCausalLM, LlamaTokenizer

model_name = "ownllama"  # Replace with the actual model name
model = LlamaForCausalLM.from_pretrained(model_name)
tokenizer = LlamaTokenizer.from_pretrained(model_name)
