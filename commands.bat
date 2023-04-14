call appwrite databases create --databaseId test --name test
call appwrite databases createCollection --databaseId test --collectionId Game --name Game --permissions "create(\"users\")" 
call appwrite databases createCollection --databaseId test --collectionId Player --name Player --permissions "create(\"users\")" 
call appwrite databases createCollection --databaseId test --collectionId Attribute --name Attribute --permissions "create(\"users\")" "read(\"users\")" 
call appwrite databases createCollection --databaseId test --collectionId Item --name Item 
call appwrite databases createCollection --databaseId test --collectionId PlayerAttributes --name PlayerAttributes --permissions "create(\"users\")" 
call appwrite databases createCollection --databaseId test --collectionId PlayerItems --name PlayerItems 
call appwrite databases createCollection --databaseId test --collectionId ItemAttributes --name ItemAttributes 
call appwrite databases createStringAttribute --databaseId test --collectionId Game --key name --required true --array false --size 40
call appwrite databases createStringAttribute --databaseId test --collectionId Game --key description --required false --array false --size 1000
call appwrite databases createStringAttribute --databaseId test --collectionId Game --key hostID --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId test --collectionId Game --key teamID --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId test --collectionId Game --key imageID --required true --array false --size 100
call appwrite databases createRelationshipAttribute --databaseId test --collectionId Game --key attributes --relatedCollectionId Attribute --type oneToMany --twoWay false --twoWayKey Game --onDelete cascade
call appwrite databases createStringAttribute --databaseId test --collectionId Player --key name --required true --array false --size 40
call appwrite databases createStringAttribute --databaseId test --collectionId Player --key gameID --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId test --collectionId Player --key ownerID --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId test --collectionId Player --key imageID --required true --array false --size 100
call appwrite databases createRelationshipAttribute --databaseId test --collectionId Player --key attributes --relatedCollectionId PlayerAttributes --type oneToMany --twoWay false --twoWayKey Player --onDelete cascade
call appwrite databases createFloatAttribute --databaseId test --collectionId Player --key money --required true --array false
call appwrite databases createIntegerAttribute --databaseId test --collectionId Attribute --key baseValue --required true --array false --min 0
call appwrite databases createStringAttribute --databaseId test --collectionId Attribute --key name --required true --array false --size 40
call appwrite databases createStringAttribute --databaseId test --collectionId Item --key name --required true --array false --size 99
call appwrite databases createStringAttribute --databaseId test --collectionId Item --key description --required true --array false --size 1000
call appwrite databases createUrlAttribute --databaseId test --collectionId Item --key icon --required true --array false
call appwrite databases createFloatAttribute --databaseId test --collectionId Item --key price --required true --array false
call appwrite databases createEnumAttribute --databaseId test --collectionId Item --key slot --required false --array false --elements  none head chest leg foot weapon1 weapon2 hand ring earrings necklace  --xdefault none
call appwrite databases createIntegerAttribute --databaseId test --collectionId PlayerAttributes --key value --required true --array false
call appwrite databases createRelationshipAttribute --databaseId test --collectionId PlayerAttributes --key attribute --relatedCollectionId Attribute --type manyToOne --twoWay false --twoWayKey PlayerAttributes --onDelete setNull
call appwrite databases createIntegerAttribute --databaseId test --collectionId PlayerAttributes --key valueAddition --required true --array false
call appwrite databases createStringAttribute --databaseId test --collectionId PlayerItems --key player --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId test --collectionId PlayerItems --key item --required true --array false --size 100
call appwrite databases createIntegerAttribute --databaseId test --collectionId PlayerItems --key slotID --required true --array false --min 0
call appwrite databases createBooleanAttribute --databaseId test --collectionId PlayerItems --key equiped --required false --array false
call appwrite databases createStringAttribute --databaseId test --collectionId ItemAttributes --key item --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId test --collectionId ItemAttributes --key attribute --required true --array false --size 100
call appwrite databases createIntegerAttribute --databaseId test --collectionId ItemAttributes --key value --required true --array false
call appwrite storage createBucket --name Maps --bucketId Maps  --fileSecurity false --enabled true --maximumFileSize 30000000 --allowedFileExtensions  --compression none  --compression none --encryption true --antivirus true
call appwrite storage createBucket --name Items --bucketId Items  --fileSecurity false --enabled true --maximumFileSize 30000000 --allowedFileExtensions  --compression none  --compression none --encryption true --antivirus true
call appwrite storage createBucket --name Profiles --bucketId Profiles --permissions "create(\"users\")"  --fileSecurity true --enabled true --maximumFileSize 2097152 --allowedFileExtensions  jpg png svg gif  --compression none --encryption true --antivirus true
call appwrite storage createBucket --name GamePreviews --bucketId GamePreviews --permissions "create(\"users\")" "read(\"users\")"  --fileSecurity true --enabled true --maximumFileSize 2097152 --allowedFileExtensions  jpg png svg gif  --compression none --encryption true --antivirus true
