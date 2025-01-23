from datasets import load_dataset

dataset_name = "timdettmers/openassistant-guanaco"
dataset = load_dataset(dataset_name, split="train")

import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    BitsAndBytesConfig,
    AutoTokenizer,
)

model_name = "ybelkada/falcon-7b-sharded-bf16"

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
)

model = AutoModelForCausalLM.from_pretrained(
    model_name, quantization_config=bnb_config, trust_remote_code=True
)
model.config.use_cache = False
