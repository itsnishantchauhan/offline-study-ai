from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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
    return {
        "question": data.question,
        "answer": "This is a test answer from Offline StudyAI."
    }


