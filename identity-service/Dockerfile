FROM node:20-alpine AS base

WORKDIR /app

FROM base AS dependencies
COPY package*.json ./
RUN npm install

FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npx prisma generate

FROM base AS production
ENV NODE_ENV=production
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY package*.json ./

EXPOSE 3001
CMD ["npm", "start"]

