from fastapi import FastAPI
from pydantic import BaseModel
from transformers import T5Tokenizer, T5ForConditionalGeneration
from openai import OpenAI
import httpx
from dotenv import load_dotenv
import os

app = FastAPI()

class TextRequest(BaseModel):
    prompt: str

model_name = "LauxDevs/my-model-slo" 
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

@app.post("/generate")
async def generate_text(request: TextRequest):
    inputs = tokenizer(request.prompt, return_tensors="pt", padding=True, truncation=True)
    output = model.generate(
        **inputs, 
        max_length=300,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        temperature=0.7
    )
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return {"generated_text": generated_text}

model_path1 = "LauxDevs/my-model-desc" 
tokenizer1 = T5Tokenizer.from_pretrained(model_path1)
model1 = T5ForConditionalGeneration.from_pretrained(model_path1)
@app.post("/generate/course_description")
async def generate_text(request: TextRequest):
    inputs = tokenizer1(request.prompt, return_tensors="pt", padding=True, truncation=True)
    output = model1.generate(
        **inputs, 
        max_length=500,
        do_sample=True,
        top_k=80,
        top_p=0.98,
        temperature=0.7,
        repetition_penalty=2.0
    )
    generated_text = tokenizer1.decode(output[0], skip_special_tokens=True)
    print(generated_text)
    return {"generated_text": generated_text}

model_path2 = "LauxDevs/model-co" 
tokenizer2 = T5Tokenizer.from_pretrained(model_path2)
model2 = T5ForConditionalGeneration.from_pretrained(model_path2)

@app.post("/generate/course_outcomes")
async def generate_text(request: TextRequest):
    inputs = tokenizer2(request.prompt, return_tensors="pt", padding=True, truncation=True)
    output = model2.generate(
        **inputs, 
        max_length=500,
        do_sample=True,
        top_k=80,
        top_p=0.98,
        temperature=0.7,
        repetition_penalty=2.0
    )
 
    generated_text = tokenizer2.decode(output[0], skip_special_tokens=True)
    print(generated_text)
    return {"generated_text": generated_text}

@app.post("/chat/request/chatbot")
async def testing(request: TextRequest):
    CHAT_BOT_KEY = os.getenv("CHAT_BOT_API_KEY")
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": CHAT_BOT_KEY,
        "Content-Type": "application/json",
    }
    data = {
        "model": "deepseek/deepseek-r1:free",
        "messages": [{"role": "user", "content":request.prompt }]
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=data)
    return response.json()