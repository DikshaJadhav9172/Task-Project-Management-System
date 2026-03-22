
FROM node:18-alpine AS build

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN echo "🔥 BUILD TIME ENV CHECK"
RUN echo "VITE_API_URL=$VITE_API_URL"

COPY . .

WORKDIR /app/frontend

RUN echo "📦 Installing frontend deps..."
RUN npm install

RUN echo "🏗️ Building frontend..."
RUN npm run build

RUN echo "📂 Frontend build output:"
RUN ls -la dist

WORKDIR /app/backend

RUN echo "📦 Installing backend deps..."
RUN npm install --production

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/backend ./backend

COPY --from=build /app/frontend/dist ./backend/public

WORKDIR /app/backend

ENV NODE_ENV=production
ENV PORT=3000

RUN echo "🚀 Runtime ENV CHECK"
RUN echo "PORT=$PORT"
RUN echo "NODE_ENV=$NODE_ENV"

EXPOSE 3000

CMD ["npm", "start"]
