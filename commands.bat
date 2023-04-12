call appwrite databases create --databaseId rpgmanager_db --name rpgmanager_db
call appwrite databases createCollection --databaseId rpgmanager_db --collectionId Game --name Game --permissions "create(\"users\")" 
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Game --key name --required true --array false --size 40
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Game --key description --required false --array false --size 1000
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Game --key hostID --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Game --key teamID --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Game --key imageID --required true --array false --size 100
call appwrite databases createCollection --databaseId rpgmanager_db --collectionId Player --name Player 
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Player --key name --required true --array false --size 40
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Player --key gameID --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Player --key ownerID --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Player --key imageID --required true --array false --size 100
call appwrite databases createCollection --databaseId rpgmanager_db --collectionId Attribute --name Attribute --permissions "create(\"users\")" "read(\"users\")" 
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Attribute --key gameID --required true --array false --size 100
call appwrite databases createIntegerAttribute --databaseId rpgmanager_db --collectionId Attribute --key baseValue --required true --array false --min 0
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Attribute --key name --required true --array false --size 40
call appwrite databases createCollection --databaseId rpgmanager_db --collectionId Item --name Item 
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Item --key name --required true --array false --size 99
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId Item --key description --required true --array false --size 1000
call appwrite databases createUrlAttribute --databaseId rpgmanager_db --collectionId Item --key icon --required true --array false
call appwrite databases createFloatAttribute --databaseId rpgmanager_db --collectionId Item --key price --required true --array false
call appwrite databases createEnumAttribute --databaseId rpgmanager_db --collectionId Item --key slot --required false --array false --elements  none head chest leg foot weapon1 weapon2 hand ring earrings necklace  --xdefault none
call appwrite databases createCollection --databaseId rpgmanager_db --collectionId PlayerAttributes --name PlayerAttributes 
call appwrite databases createIntegerAttribute --databaseId rpgmanager_db --collectionId PlayerAttributes --key value --required true --array false
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId PlayerAttributes --key playerID --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId PlayerAttributes --key attributeID --required true --array false --size 100
call appwrite databases createCollection --databaseId rpgmanager_db --collectionId PlayerItems --name PlayerItems 
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId PlayerItems --key player --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId PlayerItems --key item --required true --array false --size 100
call appwrite databases createIntegerAttribute --databaseId rpgmanager_db --collectionId PlayerItems --key slotID --required true --array false --min 0
call appwrite databases createBooleanAttribute --databaseId rpgmanager_db --collectionId PlayerItems --key equiped --required false --array false
call appwrite databases createCollection --databaseId rpgmanager_db --collectionId ItemAttributes --name ItemAttributes 
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId ItemAttributes --key item --required true --array false --size 100
call appwrite databases createStringAttribute --databaseId rpgmanager_db --collectionId ItemAttributes --key attribute --required true --array false --size 100
call appwrite databases createIntegerAttribute --databaseId rpgmanager_db --collectionId ItemAttributes --key value --required true --array false
call appwrite storage createBucket --name Maps --bucketId Maps  --fileSecurity false --enabled true --maximumFileSize 30000000 --allowedFileExtensions   --compression none --encryption true --antivirus true
call appwrite storage createBucket --name Items --bucketId Items  --fileSecurity false --enabled true --maximumFileSize 30000000 --allowedFileExtensions   --compression none --encryption true --antivirus true
call appwrite storage createBucket --name Profiles --bucketId Profiles --permissions "create(\"users\")"  --fileSecurity true --enabled true --maximumFileSize 2097152 --allowedFileExtensions  jpg png svg gif  --compression none --encryption true --antivirus true
call appwrite storage createBucket --name GamePreviews --bucketId GamePreviews --permissions "create(\"users\")" "read(\"users\")"  --fileSecurity true --enabled true --maximumFileSize 2097152 --allowedFileExtensions  jpg png svg gif  --compression none --encryption true --antivirus true
