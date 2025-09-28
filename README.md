# Lunar Mechanics Explorer

Welcome to the Lunar Mechanics Explorer, a web application for logging and viewing celestial observations.

This project is a full-stack application built entirely on the Manifest platform. The frontend is a modern React application styled with Tailwind CSS, and it communicates exclusively with the Manifest-generated backend via the Manifest SDK.

## Features

- **User Authentication**: Secure sign-up and login for researchers.
- **Observation Logging**: Create, read, and update personal celestial observations.
- **Reference Data**: Viewable lists of scientific theories and celestial bodies, managed by administrators.
- **Ownership Policies**: Users can only modify or delete their own observations.
- **Admin Panel**: A complete back-office interface for managing all data, users, and settings.

## Tech Stack

- **Backend**: Manifest (auto-generated REST API, database, auth, and file storage)
- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **SDK**: `@mnfst/sdk`

## Getting Started

To get this project up and running on your local machine, follow the setup guide.

1.  **Install Dependencies**: `npm install`
2.  **Run the Frontend**: `npm run dev`

Your application will be running at `http://localhost:5173`. The Manifest backend is hosted remotely and requires no local setup.
