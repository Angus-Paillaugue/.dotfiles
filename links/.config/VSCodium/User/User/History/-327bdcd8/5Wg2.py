import torch
from transformers import LlamaForCausalLM, LlamaTokenizer
from datasets import Dataset

import ollama

# Load the Llama model
model = ollama.Llama(model_dir="../data/ollama")

# Load the pre-trained model and tokenizer
model = LlamaForCausalLM.from_pretrained(
    "../data/ollama"
)
tokenizer = LlamaTokenizer.from_pretrained(
    "../data/ollama"
)


# Create a custom dataset class
class ProjectDataset(Dataset):
    def __init__(self, data, tokenizer):
        self.data = data
        self.tokenizer = tokenizer

    def __getitem__(self, idx):
        text = self.data[idx]
        inputs = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=512,
            return_attention_mask=True,
            return_tensors="pt",
        )
        return inputs

    def __len__(self):
        return len(self.data)


# Load your project content
with open("../frontend/src/lib/assets/ai/context.md", "r") as f:
    project_content = f.read()

# Create a dataset instance
dataset = ProjectDataset([project_content], tokenizer)

# Fine-tune the model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
dataset.to(device)

trainer = Trainer(model=model, dataset=dataset, batch_size=16, epochs=3)
trainer.train()
