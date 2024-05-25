import threading

import uvicorn
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel

import realtime
import transcribe


class RealTimeParams(BaseModel):
    model: str = 'medium'
    non_english: bool = False
    energy_threshold: int = 1000
    record_timeout: float = 8
    phrase_timeout: float = 8
    default_microphone: str = None

class TranscribeParams(BaseModel):
    file_path: str

app = FastAPI()

@app.post("/realtimespeech")
async def start_recording(params: RealTimeParams):
    threading.Thread(target=realtime.main, args=(params,)).start()
    return FileResponse("output.txt", media_type="text/plain", filename="output.txt")

@app.post("/transcribe")
async def start_transcription(params: TranscribeParams):
    result = transcribe.main(params.file_path)
    return {"transcription": result}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5002)