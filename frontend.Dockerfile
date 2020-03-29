# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app
EXPOSE 3000

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD frontend /app
# RUN npm install --silent
RUN npm install
RUN npm install react-scripts@3.0.1 -g



# start app
CMD ["npm", "run", "dev"]