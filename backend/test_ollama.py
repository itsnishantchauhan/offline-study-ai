import ollama

response = ollama.chat(
    model="qwen3:1.7b",
    messages=[
        {
            "role": "user",
            "content": "What is a cell? Explain simply."
        }
    ]
)

print(response.message.content)