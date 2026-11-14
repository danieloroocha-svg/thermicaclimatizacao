FROM node:22-bookworm-slim
WORKDIR /app
COPY social_media ./social_media
ENV PORT=8080 SOCIAL_DATA_DIR=/data
USER node
EXPOSE 8080
CMD ["node", "social_media/server.mjs"]
