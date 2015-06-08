#!/bin/bash

docker run --name postgres_container -e POSTGRES_PASSWORD=thepasswordforthepostgresserver -d postgres:latest
docker run --name nodejs --link dbserver:postgres_container -d eladrk/webserver