# Talkie

A real-time chat application built with React, Redux Toolkit, and Socket.IO.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [Contributing](#contributing)

---

## Overview

Talkie is a real-time messaging web application that enables users to communicate instantly via WebSocket connections. The client is built as a single-page application (SPA) using React 19 and managed through Vite for fast development and optimized production builds.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 19 |
| State Management | Redux Toolkit |
| Routing | React Router DOM v7 |
| Real-time Communication | Socket.IO Client |
| HTTP Client | Axios |
| Styling | Tailwind CSS v3 |
| Build Tool | Vite 6 |
| Linting | ESLint 9 |

---

## Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── hooks/
│   ├── utils/
│   ├── main.jsx
│   └── App.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Prerequisites

Ensure the following are installed on your system before proceeding:

- Node.js >= 18.x
- npm >= 9.x

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/talkie.git
cd talkie/client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the `client` directory. Refer to the [Environment Variables](#environment-variables) section for the required keys.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and bundles the application for production |
| `npm run preview` | Serves the production build locally for preview |
| `npm run lint` | Runs ESLint across all source files |

---

## Environment Variables

Create a `.env` file in the client root directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

> All environment variables exposed to the client must be prefixed with `VITE_` as required by Vite.

---

## Dependencies

### Production

| Package | Version | Purpose |
|---|---|---|
| react | ^19.1.0 | Core UI library |
| react-dom | ^19.1.0 | DOM rendering for React |
| react-router-dom | ^7.6.2 | Client-side routing |
| @reduxjs/toolkit | ^2.8.2 | State management |
| react-redux | ^9.2.0 | React bindings for Redux |
| socket.io-client | ^4.8.1 | WebSocket communication |
| axios | ^1.10.0 | HTTP requests |
| lucide-react | ^0.522.0 | Icon library |
| react-hot-toast | ^2.6.0 | Toast notifications |
| react-toastify | ^11.0.5 | Toast notification alternative |

### Development

| Package | Version | Purpose |
|---|---|---|
| vite | ^6.3.5 | Development server and build tool |
| @vitejs/plugin-react | ^4.4.1 | React support for Vite |
| tailwindcss | ^3.4.17 | Utility-first CSS framework |
| postcss | ^8.5.6 | CSS transformation |
| autoprefixer | ^10.4.21 | CSS vendor prefixing |
| eslint | ^9.25.0 | Code linting |
| eslint-plugin-react-hooks | ^5.2.0 | Lint rules for React Hooks |
| eslint-plugin-react-refresh | ^0.4.19 | Fast Refresh lint rules |

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

Please follow the existing code style and ensure all ESLint checks pass before submitting a pull request.

---

## License

This project is private. All rights reserved.
