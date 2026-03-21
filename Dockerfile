# -----------------------------
# 1. BUILD STAGE
# -----------------------------
FROM node:18-alpine AS build

WORKDIR /app

# Accept build-time env variable
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Debug: print env
RUN echo "🔥 BUILD TIME ENV CHECK"
RUN echo "VITE_API_URL=$VITE_API_URL"

# Copy full project
COPY . .

# -----------------------------
# Build Frontend
# -----------------------------
WORKDIR /app/frontend

RUN echo "📦 Installing frontend deps..."
RUN npm install

RUN echo "🏗️ Building frontend..."
RUN npm run build

# Debug: check built files
RUN echo "📂 Frontend build output:"
RUN ls -la dist

# -----------------------------
# Install Backend
# -----------------------------
WORKDIR /app/backend

RUN echo "📦 Installing backend deps..."
RUN npm install --production

# -----------------------------
# 2. FINAL STAGE
# -----------------------------
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=build /app/backend ./backend

# Copy frontend build into backend public
COPY --from=build /app/frontend/dist ./backend/public

WORKDIR /app/backend

# Runtime env
ENV NODE_ENV=production
ENV PORT=3000

# Debug: runtime check
RUN echo "🚀 Runtime ENV CHECK"
RUN echo "PORT=$PORT"
RUN echo "NODE_ENV=$NODE_ENV"

EXPOSE 3000

CMD ["npm", "start"]
