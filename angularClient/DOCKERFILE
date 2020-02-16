FROM node:10.13

ENV NODE_VERSION 10.13.0

WORKDIR /usr/src/app

COPY package*.json ./

# Install any needed packages
RUN npm install

#RUN npm install -g @angular/cli #added

# Bundle app source
COPY . ./

EXPOSE 4200

CMD [ "npm", "start" ]
