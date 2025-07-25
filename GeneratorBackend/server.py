from fastapi import FastAPI
from pydantic import BaseModel
from transformers import T5Tokenizer, T5ForConditionalGeneration
from openai import OpenAI
import httpx

app = FastAPI()

class TextRequest(BaseModel):
    prompt: str

model_path = "./model" 
tokenizer = T5Tokenizer.from_pretrained(model_path)
model = T5ForConditionalGeneration.from_pretrained(model_path)

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

model_path1 = "./model1" 
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

model_path2 = "./ModelCO" 
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
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
    }
    data = {
        "model": "deepseek/deepseek-r1:free",
        "messages": [{"role": "user", "content":request.prompt }]
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=data)
    return response.json()
#"This is an introductory course in programming that cultivates skills and notions vital to good programming practice and problem-solving using a C program. It covers fundamental programming notions such as algorithms and flowcharts, basic data types, simple I/O, conditional statements, and functions. It also includes the use of testing and debugging methods. Key to software development practice remains the capacity to develop programs that employ fitting constructs aside from attainment into solving computing problems. This course serves as supplemental material for intermediate programming. By the end of the course, students are expected, i want to change the languge to Java, Ps. direct answer, 1 paragraph only, dont put bold text,no extra message"