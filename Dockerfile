# specify the node base image with your desired version node:<version>
FROM node:current

# Copy the file from your host to your current location.
# COPY ["package.json", "package-lock.json*", "./"]
COPY . .

# Run the command inside your image filesystem.
RUN npm install


# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 3000

# Run the specified command within the container.
CMD [ "npm", "start" ]