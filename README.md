# About The Project

Severly is an app for managing and deploying servers and displaying them in web applications,
the servers are stored in a database and the application runs in docker.

# Built With 

- React
- Nodejs Express
- PostgreSQL database
- typescript

# Getting Started

## Installation
    
    To run the app, first you'll need to install docker,
    to install docker go through the explanation in docker's website.
    > https://docs.docker.com/get-docker/

## Running The App

    Once you installed docker, open the terminal, change directory to the folder where the project exists.
    to make sure you are there, check if a file called "docker-compose.yaml" is there(And this README FILE).
    after that, type "docker-compose up --build" in the console.
    depends on your computer, but after a minutes more or less the website will be up and running.
    to open the website type in your browser - http://localhost:3000/

## Closing The App

    To close the app go back to the console in the right directory 
    and type "docker-compose down"
    and that's it


# Notes 

    * when severly app launches it creates the database automatically with fake servers, you are free to delete the servers if you'd like
    * Severly's db does not contain docker volumes and therefore does not save your list of servers!



# ENJOY !

