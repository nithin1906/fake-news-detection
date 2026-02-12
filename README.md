# TrueSight — Fake News Detection

**TrueSight** is an AI-powered news verification platform designed with the prestigious aesthetic of a Latin American broadsheet newspaper. It uses natural language processing (NLP) and machine learning models to analyze the credibility of news articles and URLs, providing explainable insights through semantic heatmaps.

## Features

- **Credibility Analysis**: Detects whether a news article is likely REAL or FAKE.
- **Explainable AI (XAI)**: Visualizes which words contributed most to the decision using a semantic heatmap.
- **URL Analysis**: Fetches and analyzes content directly from news URLs.
- **Digital Newspaper UX**: A bespoke, trustworthy "broadsheet" design with "Parchment Cream" backgrounds and "Editorial Red" accents.

## Tech Stack

### Backend
- **Python** (Flask)
- **Transformers** (Hugging Face)
- **Torch** (PyTorch)
- **Scikit-learn**
- **Newspaper3k** (Article scraping)

### Frontend
- **React** (Vite)
- **TypeScript**
- **Tailwind CSS** (Custom configuration)
- **Lucide React** (Icons)

---

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

- **Python 3.8+** installed.
- **Node.js 16+** (v18 recommended) installed.
- **Git** installed.

### 1. Clone the Repository

```bash
git clone https://github.com/nithin1906/fake-news-detection.git
cd fake-news-detection
```

### 2. Backend Setup

The backend runs on Flask and serves the AI model.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment (recommended):
    ```bash
    # Windows
    python -m venv venv
    .\venv\Scripts\activate

    # macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Start the server:
    ```bash
    python run.py
    ```
    The backend will start at `http://127.0.0.1:5000`.

### 3. Frontend Setup

The frontend is a React application built with Vite.

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

---

## Usage

1.  Open your browser to `http://localhost:5173`.
2.  **Paste Text**: Copy and paste the body of a news article into the text area.
3.  **Analyze URL**: Switch to the URL tab and paste a link to a news article.
4.  Click **"Analizar Credibilidad"** (Analyze Credibility).
5.  View the prediction (Real/Fake), confidence score, and the XAI heatmap highlighting key terms.

## Project Structure

```
fake-news-detection/
├── backend/            # Flask API and ML Models
│   ├── app/            # Application logic
│   ├── run.py          # Entry point
│   └── requirements.txt
├── frontend/           # React Frontend
│   ├── src/            # Components and Logic
│   ├── tailwind.config.js # Design System Config
│   └── package.json
└── README.md           # Documentation
```

## Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

---

© 2026 TrueSight. All rights reserved.
