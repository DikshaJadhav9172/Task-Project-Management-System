# Build frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy everything
COPY . .

# Install frontend deps & build
WORKDIR /app/frontend
RUN npm install && npm run build

# Install backend deps
WORKDIR /app/backend
RUN npm install --production

# Final stage
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=build /app/backend ./backend

# Copy built frontend into backend public folder
COPY --from=build /app/frontend/dist ./backend/public

WORKDIR /app/backend

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
