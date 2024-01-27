# WaOSearch

## FrontEnd
- Vue
- ElementUI

## BackEnd
- Express & multer & ejs
- node-schedule

## Middleware
- Etcd
    - npm install etcd3
- ElasticSearch
    - npm install @elastic/elasticsearch
- MongoDB
    - npm install mongoose
- Redis
    - npm install redis
- Mysql
    - npm install mysql2
- MinIO
    - npm install minio
- Neo4j
    - npm install neo4j-driver

## Usage
```
# Neo4j
docker run -d --name neo4j \
    --publish=7474:7474 --publish=7687:7687 \
    --env NEO4J_AUTH=neo4j/neo4j001 \
    --volume=/home/ervin/neo4j/data:/data \
    neo4j:5.16.0

## clear
match (n) detach delete n

## add
CREATE (database:Database {name:"Neo4j"})-[r:SAYS]->(so:SystemObj {title:"xxTitle",content:"xxContent",link:"http://localhost:9999"}) RETURN database, so, r

# Server
cd search-server
npm install
npm run start
```