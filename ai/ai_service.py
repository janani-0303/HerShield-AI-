from fastapi import FastAPI
import uvicorn
import tensorflow as tf

app = FastAPI()

@app.post("/voice-distress")
def detect_voice(file: bytes):
    # Placeholder ML model
    return {"distress_detected": True}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
