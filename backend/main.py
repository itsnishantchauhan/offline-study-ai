from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import ollama

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Offline StudyAI backend is working!"}


class StudyQuestion(BaseModel):
    question: str


@app.post("/ask")
def ask_question(data: StudyQuestion):

    response = ollama.chat(
        model="qwen3:1.7b",
        messages=[
            {
                "role": "system",
                "content": """
You are Offline StudyAI, a simple study assistant.

Rules:
- Answer the student's question clearly and briefly.
- Use simple language.
- Do not give unnecessary explanations.
- Avoid long introductions.
- Use short paragraphs or bullet points when useful.
- For simple questions, give a direct answer.
- If the user asks "in short", keep the answer very short.
- If code is needed, provide only the necessary code.
"""
            },
            {
                "role": "user",
                "content": data.question
            }
        ]
    )

    return {
        "question": data.question,
        "answer": response.message.content
    }


