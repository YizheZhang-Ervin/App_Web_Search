# WaOSearch

## Features
```
- 前端输入关键词，后端根据关键词到neo4j搜索/到redis搜索(暂无)
- 后端登录验证通过etcd
- 后端文件存本地/存minio(暂无)
```

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
# 1. Neo4j
docker run -d --name neo4j \
    --publish=7474:7474 --publish=7687:7687 \
    --env NEO4J_AUTH=neo4j/neo4j001 \
    --volume=/home/ervin/neo4j/data:/data \
    neo4j:5.16.0

## clear
match (n) detach delete n

## add
CREATE (database:Database {name:"Neo4j"})-[r:SAYS]->(so:SystemObj {title:"xxTitle",content:"xxContent",link:"http://localhost:9999"}) RETURN database, so, r

# 2. redis
## 配置文件 /home/ervin/redis/redis.conf
daemonize no
port 6379
bind 0.0.0.0 
requirepass redispwd
appendonly yes

## 启动
docker run --name redis \
-p 6379:6379 \
-v /home/ervin/redis/redis.conf:/etc/redis/redis.conf \
-v /home/ervin/redis/data:/data \
-d redis /etc/redis/redis.conf --appendonly yes --requirepass redispwd

## 使用
HMSET xxKey xxProp "xxVal" xxProp2 "xxVal2"
HGETALL xxKey

# 3. Server
cd search-server
npm install
npm run start
```