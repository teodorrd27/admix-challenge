
# Admix API Challenge

## Set up
```
1) npm i
2) docker-compose up -d
3) tsc
4) sls offline
```

## Task

Admix wants to create a CRUD service that allows users to create, update, and fetch advertising Campaigns. In addition to this, Admix want to help users find apps that match with certain audience demographics, so they can more effectively target adverts.

Please unpack the zip provided and complete the api outline provided.

## Requirements:

 - The service needs to be able to fetch, create and update Users. (Schema provided)
 - The service needs to be able to fetch, create and update campaigns. (Schema provided)
 - The service needs to be able to assign Campaigns to Users.
 - The service needs to be able to assign Creatives to Campaigns (Schema Provided).
 - The service needs to be able to query the app collection provided and order them by percentage audience match. (Query spec provided)

## App Query Example
```
{
    "categories":["ACTION", "GAME_ACTION"], 
    "store" : ["AppStore", "StreamStore"], @required
    "demographics":["young", "old"], @required
    "geos":["us"] ,
    "gender":["male", "female"]  @required
}
```

## Resources
 - TypeORM - https://typeorm.io/#/mongodb
 - Serverless - https://www.serverless.com/framework/docs/
 - Mocha - https://mochajs.org/
 - Chai - https://www.chaijs.com/
 - Sinon - https://sinonjs.org/
 - Middy - https://github.com/middyjs/middy


## Possible Required Fix
If when you run `docker-compose up -d` and mongo does not seed, then you may need to give the import.sh file permissions to run.
Please use the below line of code from the root directory
`chmod +x ./mongo-seed/import.sh`

