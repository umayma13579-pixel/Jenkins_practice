# ---------- 1) Dependencies layer (faster, smaller builds)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ---------- 2) Runtime image
FROM node:20-alpine AS runtime
WORKDIR /app

# Add curl for healthcheck
RUN apk add --no-cache curl

# Create a non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy production node_modules and app code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ensure our user owns the files
RUN chown -R app:app /app

# Environment & networking
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Docker-level health probe (uses your /healthz endpoint)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost:3000/healthz || exit 1

# Drop privileges
USER app

# Start app via npm (uses your package.json "start" script)
CMD ["npm", "start"]
