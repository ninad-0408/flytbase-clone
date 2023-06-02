FROM node:14

WORKDIR /home/ninad_0408/Coding/Projects/fltbase_assignment

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
