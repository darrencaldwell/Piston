# Piston
WIP Digital version of a Card based game developed by Brendan Head, Oscar Katz, Sam Evans and Darren Caldwell

## Frameworks
Typescript : For interaction between the MongoDB database and in future the game itself.
MongoDB    : NoSQL db for flexible card storage
Docker     : For easy and replicable setup and running
Unity      : Game Engine

## Services Checklist

- [ ] Cards - In progress
- [ ] Game
- [ ] Cards
- [ ] Lobby
- [ ] Auth
- [ ] Analysis
- [ ] Logging 

## Unity Game Client Checklist

- [ ] Write checklist

## Usage
Currently it is set up to initialize the Cards service via nodemon, to automatically restart during development.
First install and setup Docker and Docker Compose.

To start run the following in the root of the directory:
`sudo docker-compose up -d`
Then navigate to `http://localhost:21450/` to check functionality.
