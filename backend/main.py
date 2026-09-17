from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Offline StudyAI backend is working!"}

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


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


