import openai
import os
from dotenv import load_dotenv

# Cargar la clave de la API desde el archivo .env
load_dotenv()

# Obtener la clave de la variable de entorno
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_response_from_gpt(message: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # O usa "gpt-4" si tienes acceso
        messages=[
            {"role": "user", "content": message}
        ]
    )
    return response['choices'][0]['message']['content']
