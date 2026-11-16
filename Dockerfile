FROM mcr.microsoft.com/playwright:v1.48.0-jammy

WORKDIR /work

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npx playwright install chromium

ENV SF_BASE_URL=https://login.salesforce.com
ENV BROWSER=chromium
ENV HEADLESS=true
ENV CI=true

CMD ["npm", "test"]