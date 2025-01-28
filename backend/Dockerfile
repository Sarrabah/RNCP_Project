# Use an official Node.js image for building the frontend
FROM node:18 AS frontend-build

# Set working directory for the frontend
WORKDIR /app/frontend

# Copy frontend source files
COPY ../frontend/ ./

# Install dependencies and build the frontend 
RUN npm install && npm run build
RUN ls -l /app/frontend/build && echo "Build contents listed successfully."



# Use an official Python image
FROM python:3.11-slim

# Set environment variables for python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    default-libmysqlclient-dev \
    pkg-config \
    && apt-get clean

# Install dependencies
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source files
COPY backend/ /app/

# Copy React build into Django staticfiles
COPY --from=frontend-build /app/frontend/build /app/staticfiles

# Collect static files
RUN python manage.py collectstatic --noinput

# Run the Django application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
