# Iskor - Student Performance Tracking Application

A modern web application for tracking and managing student academic performance.

## Features

- Real-time progress tracking
- Performance analytics and insights
- Class management system
- Student-teacher communication
- Secure access code system

## Local Development

### Prerequisites

- Node.js 18 or newer
- npm

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/iskor.git
   cd iskor
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Create environment files:
   ```bash
   # Copy example env files
   cp .env.example .env
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # In a new terminal, start frontend
   cd client
   npm start
   ```

## Deployment to Render

### Automatic Deployment

1. Fork this repository to your GitHub account.

2. Create a new Web Service on Render:
   - Go to https://dashboard.render.com
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` configuration

3. Configure Environment Variables:
   - In your Render dashboard, go to the Environment section
   - Add the required environment variables as specified in `.env.example`
   - Make sure to set `NODE_ENV` to `production`

### Manual Deployment

If you prefer to set up the services manually:

#### Frontend Deployment

1. Create a new Static Site on Render:
   - Set build command: `cd client && npm install && npm run build`
   - Set publish directory: `client/build`
   - Add environment variables:
     - `NODE_ENV`: `production`

2. Configure the following:
   - Add a redirect rule: `/* /index.html`
   - Enable HTTPS

#### Backend Deployment

1. Create a new Web Service:
   - Set build command: `cd server && npm install`
   - Set start command: `cd server && npm start`
   - Add environment variables from `.env.example`
   - Set Node.js version to 18 or newer

2. Configure the following:
   - Set environment variables
   - Enable auto-deploy

## Project Structure

- `/client` - React frontend application
- `/server` - Express backend API
- `render.yaml` - Render deployment configuration
- `.env.example` - Example environment variables

## Support

For support, please open an issue in the GitHub repository or contact the development team. 