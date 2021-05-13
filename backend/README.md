mongo installaton instructions

- download and install docker (windows/linux depending on your operatons sytem)
- open terminal and positions yourself in backend\docker folder
- run command: docker-compose up -d 
- in PowerShell run command docker ps -a // to check if engines in docker are running;
- to restart engines in docker run docker restart $(docker ps -a -q);
- open http://localhost:8081;
create new database react-blogpost in Mongo Express;