from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import get_response_from_gpt
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringir esto a ["http://127.0.0.1:5500"] si quieres
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(msg: Message):
    reply = get_response_from_gpt(msg.message)
    return {"response": reply}
