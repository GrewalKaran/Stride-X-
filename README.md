# StrideX

StrideX is a real-time multiplayer running platform built to make fitness more competitive, social, and interactive.

The platform allows users to:
• Track solo running sessions
• Compete with friends in real-time multiplayer races
• View previous running history and race reports
• Experience live GPS tracking and map visualization

StrideX was built during InnovateX 2026 at Chitkara University, where it secured 2nd Place.

---

# Features

## Solo Mode

• Start individual running sessions
• Track distance, duration, and pace
• Generate race reports after every run

## Multiplayer Mode

• Create or join live race rooms
• Real-time player synchronization
• Live race updates using Socket.io

## Previous Runs

• Access running history
• Compare previous performances
• Track progress over time

## Live GPS Tracking

• Browser Geolocation API integration
• Real-time location updates
• Interactive route visualization

## Authentication

• Secure authentication using Clerk
• Protected frontend routes
• Backend route protection using Clerk Middleware

---

# Tech Stack

## Frontend

• React
• Vite
• React Router
• Context API
• Leaflet.js
• Socket.io Client

## Backend

• Node.js
• Express.js
• Socket.io
• MongoDB
• Mongoose
• Clerk Middleware

## Maps & GPS

• Leaflet.js
• OpenStreetMap
• Browser Geolocation API

## Deployment

• Render (Frontend)
• Render (Backend)

---


# Real-Time Multiplayer

StrideX uses Socket.io for:
• Live room creation
• Real-time player updates
• Multiplayer race synchronization
• Live event communication

---

# Maps & Location Tracking

StrideX uses:
• Browser Geolocation API for GPS tracking
• Leaflet.js for map rendering
• OpenStreetMap for map tiles

---

# Deployment Notes

The project is deployed using Render free tier services.

Important:
• Backend services may sleep after inactivity
• First request can take 30–50 seconds to wake up
• This may temporarily affect:
• Login/signup requests
• API response time
• Multiplayer socket connections

---

# Lessons Learned

Building StrideX taught us:
• Real-time systems are difficult to synchronize
• Deployment issues are different from local development
• Authentication flows require careful production setup
• WebSocket handling in production needs proper configuration
• Hackathons push rapid learning and problem-solving

---

# Future Improvements

• Live leaderboard system
• Voice chat during multiplayer races
• Mobile app version
• Better race analytics
• Friend system and matchmaking
• Push notifications

---

