import base64
import os

import numpy as np
import torch
import whisper
from pydub import AudioSegment
from scipy.io import wavfile


def transcribe_audio_file(file_path, model="medium", non_english=False):
    audio = AudioSegment.from_file(file_path)
    audio = audio.set_frame_rate(16000)
    audio.export("converted.wav", format="wav")

    sample_rate, audio_data = wavfile.read("converted.wav")

    audio_np = np.frombuffer(audio_data, dtype=np.int16).astype(np.float32) / 32768.0

    DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    print("Using GPU to run.") if torch.cuda.is_available() else print(
        "Using CPU to run."
    )

    if model != "large" and not non_english:
        model = model + ".en"
    audio_model = whisper.load_model(model, device=DEVICE)

    fp16 = torch.cuda.is_available()
    result = audio_model.transcribe(audio_np, fp16=fp16)
    text = result["text"].strip()

    print("\n\nTranscription:")
    print(text)

    os.remove("converted.wav")
    return text


def main(data: str):
    # file_path = r"C:\\Users\\haoha\\OneDrive\\Desktop\\personal\\Projects\\Hackathons\\hacksingapore 2024\\fin siri\\transcribeaudio1.mp3"
    print(data)
    if len(data) % 4:
        data += "=" * (4 - len(data) % 4)
    decoded_data = base64.b64decode(data)
    with open("audio.webm", "wb") as file:
        file.write(decoded_data)
    return transcribe_audio_file("audio.webm")


if __name__ == "__main__":
    main()