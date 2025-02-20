# Fetch Frontend Take-Home Project

A React application that helps users search through and match with shelter dogs. Users can filter dogs by various criteria, favorite potential matches, and generate matches based on their favorites.

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 
- npm or Yarn 

## Installation

1. Clone the repository
```bash
git clone <https://github.com/benjaehyun/fetch-frontend>
cd fetch-frontend
```

2. Install dependencies using either:

With npm:
```bash
npm install
```

With Yarn:
```bash
yarn install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the API base URL:
```bash
VITE_API_BASE_URL=Base URL for fetch API 
```

## Running the Application

To start the development server:

With npm:
```bash
npm run dev
```

With Yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:5173` by default.

To build for production:
```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── utils/         # API client
└── theme.js       # MUI theme configuration
```

## Notes

### Authentication Implementation
- The application uses HttpOnly cookies for session management
- Session validation is performed by making requests to the `/dogs/breeds` endpoint
- This approach ensures no sensitive authentication information (tokens, expiration times) is exposed to the client
- No user information is stored in localStorage or sessionStorage

### State Persistence
- Due to the backend architecture, user data (favorites, matches) is not persisted between sessions
- Favorites and matches are stored in memory using React Context
- This data will reset when the page is refreshed or when the user logs out

### Technology Choices
- React + Vite for fast development and optimal build output
- Material-UI (MUI) for consistent, customizable UI components
- Axios for API interactions with built-in cookie handling
- React Router for client-side routing
- Framer Motion for smooth animations

