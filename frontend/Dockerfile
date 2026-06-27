FROM node:22

WORKDIR /app

COPY frontend/package*.json ./

RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 2000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install --prefer-offline --no-audit --no-fund

COPY frontend/ .

EXPOSE 5173

CMD ["npm","run","dev","--","--host"]