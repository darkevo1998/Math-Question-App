# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Copy requirements first for better caching
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy frontend package files
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy the rest of the application
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm run build

# Set working directory back to app root
WORKDIR /app

# Expose port
EXPOSE 5001

# Start the application
CMD ["python", "backend/app.py"]
