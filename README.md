# RPGManager-back

## Deploy

1. On your appwrite console, create a project.
2. Create an appwrite.json file and replace project ID & project Name.

## setup appwrite project with the migration-tool

1. start the script and login to your appwrite account.
2. select upload database & storage option
3. enter a name for the database (example: rpgmanager_db). This will create a database, all collections and buckets needed.
4. Generate environments.ts file with the option "generate environment.ts file for frontend" You can use this file for your frontend app. It contains all the needed environment and endpoints variables.
5. Some functions needs endpoints for collections etc.. You have to replace the endpoints in the functions with the endpoints of your appwrite project. You can find the endpoints in environment.ts file you generated. NEED TO FIND A WAY TO AUTOMATE THIS
6. Go in the appwrite project overview and generate a new API key for your functions.
7. In the file appwrite.json replace the following variables with the values of your appwrite project
   1. APPWRITE_FUNCTION_ENDPOINT=https://example.com/v1
   2. APPWRITE_FUNCTION_PROJECT_ID=projectID
   3. APPWRITE_FUNCTION_API_KEY=API_KEY
8. Use appwrite CLI to deploy the functions with `appwrite deploy function`

And it's done ! You know have a working appwrite project with all the needed collections, buckets and functions. 

## get the changes from the appwrite server
If you did some changes on the appwrite server, you can get the changes in order to regenerate the commands.bat file with the option "get database from project" or "get storage from project". This is important if you want to keep the database structure saved in this repository up to date.

 
