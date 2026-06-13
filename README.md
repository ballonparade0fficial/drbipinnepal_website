# Dr. Bipin Nepal Website (React + Flask)

Professional website for Dr. Bipin Nepal with a React frontend and Flask backend, fully driven by editable JSON content.

## Project Structure

- `dr-nepal-website/frontend` - React app
- `dr-nepal-website/backend` - Flask API and website content storage

## Backend Setup (Flask)

1. Open a terminal in `dr-nepal-website/backend`
2. Install dependencies:
   - `pip install flask flask-cors`
3. Start backend server:
   - `python app.py`
4. Flask will run at:
   - `http://localhost:5001`

### Backend Endpoints

- `GET /content` - returns `content.json`
- `POST /update` - overwrites `content.json` with posted JSON

## Frontend Setup (React)

1. Open a terminal in `dr-nepal-website/frontend`
2. Install dependencies:
   - `npm install`
3. Start React app:
   - `npm start`
4. React app will run at:
   - `http://localhost:3000`

## Admin Dashboard

- Public website: `http://localhost:3000`
- Full admin route: `http://localhost:3000/admin`
- Embedded admin panel is also included at the bottom of the public page.

All major website sections are editable from the admin panel. On save, content is sent to Flask and persisted to `backend/content.json`.

## Design Highlights

- **Color Palette**: Navy, teal, soft white, with gradients and shadows.
- **Typography**: 'Inter' for body, 'Playfair Display' for headings.
- **Hero Section**: Full viewport height, animated stats, and profile image.
- **Responsive Design**: Fully mobile-friendly with smooth animations.
- **Contact Form**: Functional form with placeholders for backend integration.

## Notes

- Make sure Flask backend is running before opening the React frontend.
- Website content is centralized in `backend/content.json`.
- Replace `/images/placeholder.jpg` in frontend public assets with a real profile photo when available.
