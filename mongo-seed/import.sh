#! /bin/bash

mongoimport --host mongodb --db challenge --collection users --type json --file /mongo-seed/mongo-seed/user.json --jsonArray
mongoimport --host mongodb --db challenge --collection campaigns --type json --file /mongo-seed/mongo-seed/campaign.json --jsonArray
mongoimport --host mongodb --db challenge --collection apps --type json --file /mongo-seed/mongo-seed/apps.json --jsonArray
mongoimport --host mongodb --db challenge --collection categories --type json --file /mongo-seed/mongo-seed/categories.json --jsonArray