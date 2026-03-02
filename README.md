Prerequisites

Node.js (18+) and npm installed.
Docker (recommended) or a running MongoDB instance.
    Optional: Rocket.Chat (for messaging) and Google OAuth credentials if you want OAuth flows.

Quick start (recommended using Docker for MongoDB)

1. Start MongoDB (Docker)
    - docker run -d --name mh-mongo -p 27017:27017 mongo:6

2. Backend: install, configure, run
    - cd backend
    - npm install
    - copy .env.example .env   # then edit .env to set values if needed (GOOGLE_CLIENT_ID, ROCKET_URL, etc.)
    - npm run dev

    Backend listens on port 4000 by default. Health check: open http://localhost:4000/ which should return JSON.

3. Frontend: install and run
    - cd frontend
    - npm install
    - npm run dev

Vite serves the frontend (default URL printed in terminal, e.g. http://localhost:5173). Open it in your browser.