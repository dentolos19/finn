<h1>
  <img src="public/icon.png" alt="Icon" height="30">
  <span>Finn</span>
</h1>

Simplify your retirement planning with personal financial advice, provided by AI-boosted advisor on your phone.

## 🫂 Project Information

**Problem Statement**: Develop a solution that empowers the ageing population to achieve a financially secure retirement as the country becomes more affluent.

### Team Members

- Hao Han (Leader/Backend Developer)
- Dennise (Frontend Developer)
- De Hui (UI/UX Designer)
- Dean (Marketing)
- ~~Jian Wei (The Extra)~~

### Tech Stack

#### Frontend

- Next.js (w/ TypeScript)
- Material UI

#### Backend

- Python
- Torch
- SQLite

### Development Pipeline

#### Real-Time Speech Recognition

Captures audio from the microphone.
Processes audio data in real-time.
Transcribes the audio and stores the transcription in the SQLite database.

#### Batch Audio Transcription

Reads audio files.
Processes and transcribes the audio data.
Stores the transcription result in the SQLite database.

#### API Service

Exposes endpoints for real-time speech recognition and batch transcription.
Handles incoming requests and triggers the corresponding processes.
Stores the transcription results and responses in the SQLite database.
Returns results to the client using Postman.

#### Docker Setup

Containers for training, inference, real-time processing, batch transcription, API service, and SQLite database.
Uses Docker Compose to manage multi-container setup and ensure services are integrated properly.
The SQLite database container is set up to persist data across container restarts.

## ⚒️ Usage

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- [pnpm](https://pnpm.io) 9+
- [Python](https://python.org) 3.12+

### Installation

1. Setup the environment: `setup.ps1`
2. Run the backend: `mod/backend/start.bat`
3. Run the frontend: `pnpm run dev`

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.