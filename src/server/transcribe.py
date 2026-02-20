import base64
import os
import subprocess

# import sqlite3
import numpy as np
import torch
import whisper
from pydub import AudioSegment
from scipy.io import wavfile


def transcribe_audio_file(file_path, model="medium", non_english=False):
    audio = AudioSegment.from_wav(file_path)
    audio = audio.set_frame_rate(16000)
    audio.export("audio-framed.wav", format="wav")

    sample_rate, audio_data = wavfile.read("audio-framed.wav")

    audio_np = np.frombuffer(audio_data, dtype=np.int16).astype(np.float32) / 32768.0
    DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    print("Using GPU to run.") if torch.cuda.is_available() else print(
        "Using CPU to run."
    )

    if model != "large" and not non_english:
        model = model + ".en"
    audio_model = whisper.load_model(model, device=DEVICE, download_root="models")

    fp16 = torch.cuda.is_available()
    result = audio_model.transcribe(audio_np, fp16=fp16)
    text = result["text"].strip()

    print("\n\nTranscription:")
    print(text)

    # Save transcription to SQLite3 database (uncomment when ready)
    # save_transcription_to_db(text)

    os.remove("audio.wav")
    os.remove("audio-framed.wav")
    return text

# def save_transcription_to_db(text):
#     """
#     Save transcription to SQLite3 database.
#     """
#     # Connect to SQLite3 database (it will create the database if it doesn't exist)
#     conn = sqlite3.connect("chatbot_output.db")
#     cursor = conn.cursor()

#     # Create table if it doesn't exist
#     cursor.execute("""
#     CREATE TABLE IF NOT EXISTS transcriptions (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         transcription TEXT NOT NULL
#     )
#     """)

#     # Insert transcription into the table
#     cursor.execute("INSERT INTO transcriptions (transcription) VALUES (?)", (text,))

#     # Commit changes and close connection
#     conn.commit()
#     conn.close()

def main(data: str):
    # file_path = r"C:\\Users\\haoha\\OneDrive\\Desktop\\personal\\Projects\\Hackathons\\hacksingapore 2024\\fin siri\\transcribeaudio1.mp3"
    print(data)
    if len(data) % 4:
        data += "=" * (4 - len(data) % 4)
    decoded_data = base64.b64decode(data)
    with open("audio.webm", "wb") as file:
        file.write(decoded_data)
    subprocess.call(["../mods/ffmpeg/bin/ffmpeg.exe", "-i", "audio.webm", "audio.wav"])
    os.remove("audio.webm")
    return transcribe_audio_file("audio.wav")


if __name__ == "__main__":
    main()
