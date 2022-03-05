FROM node:latest
WORKDIR /usr/src/azimiao
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD [ "npm", "start"]