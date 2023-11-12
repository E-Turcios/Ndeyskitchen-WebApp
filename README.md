# Ndey's Kitchen

1. Clone the project on your computer
2. Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
4. Install packages and run the server with the following prompts in the terminal:
   
```bash
cd server/
npm install
cd ..
```

5. Check doker-compose status with ```doker-compose --version```

5a. If there is a version found, run docker-compose with ```docker-compose --build```

5b. If there is no version found, open [Docker Desktop](https://www.docker.com/products/docker-desktop/) that you downloaded then run docker-compose with ```docker-compose --build```


6. Load up the database with some items by running:

```bash
node server/scripts/loadItemsCollection.js
```
7. Then launch in your preferred browser the link: http://localhost:8081/

## ACCESS KEYS REQUIRED


