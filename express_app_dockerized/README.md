# ON AWS
Create a new EC2 Instance

Make sure inbound security group rules allow for your current IP address and port that your app runs on. This app defaults to port 3000.

Download the .pem file when prompted, and change permissions.
```
chmod 600 ~/Downloads/PEM_FILE_NAME.pem
```

Use the pem file to ssh into instance with the url given in the portal:
```
ssh -i "../Downloads/PEM_FILE_NAME.pem" * ubuntu@ec2-52-12-8-25.us-west-2.compute.amazonaws.com
```
install node from nodejs.org for correct instance type

install build essentials

# Uploading Data to Instance.

## Option 1: scp files up!
```
scp -i "../Downloads/demo.pem" * ubuntu@ec2-52-12-8-25.us-west-2.compute.amazonaws.com:~/source

ssh ...
npm install
node app.js
```

## Option 2: Dockerize!!

DOCKERFILE is already created for you. Used this guide:
https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

create repo on docker hub

Build Image
```
docker build -t helenamerk/demo:first_upload .
```
Get image name with docker ps
Push to private repo (the name to push it to should be on dockerhub, I used demo)
```
docker push helenamerk/demo:first_upload
```

on ec2 instance, install docker!
docker login
pull image and start!!
```
sudo docker run --name silly_bardeen  -p 3000:3000 helenamerk/demo:first_upload
```
