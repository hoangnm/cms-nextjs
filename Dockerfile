FROM node:latest
WORKDIR /opt/app
ENV NODE_ENV production
COPY package*.json ./
COPY . /opt/app
RUN npm install --dev && npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
