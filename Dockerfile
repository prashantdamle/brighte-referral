FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Copy prisma schema
RUN mkdir -p apps/prisma
COPY ./apps/api/prisma/ ./apps/api/prisma/

# Install yarn
RUN npm install yarn

# Install npm packages using yarn
RUN yarn install

# Bundle app source
COPY . .

# Reset the database to its default state
RUN rm ./apps/api/prisma/dev.db*

# Run prisma migration
RUN yarn prisma migrate deploy

EXPOSE 3333

CMD [ "yarn", "start", "api" ]
