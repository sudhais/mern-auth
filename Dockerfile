FROM node:13-alpine

#Environment variables example in mern what we declare in .env file
ENV MONGO_DB_USERNAME=admin MONGO_DB_PWD=password

#create a directory in image
RUN mkdir -p /home/app

# . means copy the current paths to /home/app directory
COPY . /home/app

#locate the index.js
CMD ["node", "/api/index.js"]
