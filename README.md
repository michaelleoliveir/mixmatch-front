# 🎵 Mix&Match - AI-Powered Playlist Curator

Mix&Match is a full-stack web application that combines the power of **Google Gemini AI** with the **Spotify Web API** to create personalized music experiences. Users can describe their current mood or a specific vibe, and the AI will curate a tailored list of tracks that can be instantly saved to their Spotify library.

## ✨ Features

-   **AI Mood Analysis**: Describe how you feel (e.g., "I'm feeling like a villain in a noir movie") and get matching tracks.
-   **Spotify Integration**: Full OAuth2 authentication and direct playlist creation.
-   **Interactive Preview**: Visualize your AI-generated playlist with album art and artist details before saving.
-   **Modern UI/UX**: Built with a "Spotify-inspired" dark mode, featuring smooth animations and responsive design.
-   **Error Handling**: Robust feedback system for API limits (Gemini/Spotify) using elegant toast notifications.

## 🚀 Tech Stack

### Frontend
-   **React / Next.js**: Core framework for a fast, SEO-friendly SPA.
-   **Tailwind CSS**: Utility-first styling for a sleek, modern interface.
-   **Framer Motion**: Advanced animations for transitions and loading states.
-   **Lucide React**: Beautifully crafted icons.

### Backend (API)
-   **Laravel**: PHP framework for robust API logic and service architecture.
-   **Google Gemini API**: Generative AI for intelligent music curation.
-   **Spotify Web API**: Integration for music data and user library management.

## 🛠️ Getting Started

### Prerequisites
-   Node.js & npm/yarn
-   PHP 8.2+ & Composer
-   Spotify Developer Account (Client ID and Secret)
-   Google Cloud Console (Gemini API Key)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/michaelleoliveir/mixmatch-front.git
    cd mixmatch-front
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the root:
    ```env
    VITE_BACKEND_API=http://localhost:8000/api
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

*Note: Make sure your [Mix&Match Backend](https://github.com/michaelleoliveir/mixmatch-api) is also running.*

## 📐 Architecture Insights

The project follows a **Service-Pattern** on the backend to decouple AI logic from controllers, ensuring easy maintenance. On the frontend, custom hooks like `usePreview` and `useCreatePlaylist` manage complex state transitions and API interactions, keeping components clean and focused on the UI.

## 👩‍💻 Author

**Michaelle Oliveira** - Fullstack Developer
-   GitHub: [@michaelleoliveir](https://github.com/michaelleoliveir)
-   Status: **Available for new opportunities and collaborations!**

---