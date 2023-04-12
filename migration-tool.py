import os
import json

class appwriteMigrationTool:
    
    def __init__(self):
        self.init = True
        self.collections = {}
        self.storage = {}
        self.commandList = []

    def login(self):
        os.system(f'cmd /c "appwrite login')
        print("Logged in")

    def getDatabases(self,id):
        os.system(f'cmd /c "appwrite databases listCollections --databaseId {id} --json > collections.json"')
        #remove last line
        with open("collections.json", "r") as f:
            lines = f.readlines()
        with open("collections.json", "w") as f:
            f.writelines(lines[:-1])
        print("Collections loaded")
        self.loadCollections()
        print(self.collections)

    def getStorage(self):
        os.system(f'cmd /c "appwrite storage listBuckets --json > storage.json"')
        #remove last line
        with open("storage.json", "r") as f:
            lines = f.readlines()
        with open("storage.json", "w") as f:
            f.writelines(lines[:-1])
        print("Storage loaded")
        self.loadStorage()
        print(self.storage)
        
    def loadCollections(self):
        with open("collections.json") as f:
            collections = f.read()
        collectionJson = json.loads(collections)
        self.collections = collectionJson

    def loadStorage(self):
        with open("storage.json") as f:
            storage = f.read()
        storageJson = json.loads(storage)
        self.storage = storageJson

    def uploadDatabases(self,databasename):
        if(databasename==""):
            print("Database name invalid")
            return

        self.loadCollections()
        #create database in appwrite
        #os.system(f'cmd /c "appwrite databases create --databaseId {databasename} --name {databasename}')
        self.commandList.append(f'appwrite databases create --databaseId {databasename} --name {databasename}')
        self.create_appwrite_collections(self.collections,databasename)

        

    def uploadStorage(self):
        self.loadStorage()
        for bucket in self.storage['buckets']:
            collection_permissions = self.get_permissions(bucket['$permissions'])
            cmd = f'appwrite storage createBucket --name {bucket["name"]} --bucketId {bucket["$id"]} {collection_permissions}'
            for key, value in bucket.items():
                v = value
                if key == 'name' : continue
                if(type(value)==bool) : v = str(value).lower()
                if key in ["$id","$createdAt","$updatedAt","$permissions"]: continue
                if key == 'allowedFileExtensions':
                    v = " "
                    for e in value:
                        v += e + " "

                cmd += f' --{key} {v}'
            self.commandList.append(cmd)
        
        
        


    
    def createCollection(self,collection):
        print("Creating collection",collection)

    def create_appwrite_collections(self,data, database_id):
        print("Creating",data['total'], "collections")
        for i in range(int(data['total'])):
            collection = data['collections'][i]
            collection_name = collection['name']
            collection_id = collection['$id']
            collection_permissions = self.get_permissions(collection['$permissions'])
            
            # Create collection
            create_collection_cmd = f'appwrite databases createCollection --databaseId {database_id} --collectionId {collection_id} --name {collection_name} {collection_permissions}'
            self.commandList.append(create_collection_cmd)
            # Create attributes
            for attr in collection['attributes']:
                attr_name = attr['key']
                attr_type = self.get_type(attr)
                create_attr_cmd = f'appwrite databases create{attr_type}Attribute --databaseId {database_id} --collectionId {collection_id} --key {attr_name}'
                for key, value in attr.items():
                    v = value
                    k = key

                    #skip some keys and handle execptions and weird cases
                    if key in ['key', 'type', 'format', 'status'] : continue
                    if key == 'default' and value == None : continue
                    if key == 'default' : k = "xdefault"
                    if(type(value)==bool) : v = str(value).lower()
                    #if value is to big for int skip it
                    if key == 'max' and type(value)==str : continue
                    if key == 'min' and type(value)==str : continue
                    if key == 'elements':
                        v = " "
                        for e in value:
                            v += e + " "

                    create_attr_cmd += f' --{k} {v}'

                self.commandList.append(create_attr_cmd)

    def get_type(self,attribute):
        attr_type = attribute['type']
        #if type is string, look at format
        if attr_type == 'string':
            if 'format' not in attribute.keys(): return 'String'
            attr_format = attribute['format']
            if attr_format == 'enum': return 'Enum'
            elif attr_format == 'date-time': return 'Datetime'
            elif attr_format == 'url': return 'Url'
            elif attr_format == 'email': return 'Email'
        elif attr_type =='double': return 'Float'
            
        #else return type With Capital letter
        return attr_type.capitalize()

    def get_permissions(self,permissions):
        
        res =""
        if(len(permissions)!=0):
            res = "--permissions "
        for p in permissions:
            res += "\"" +  p.replace('"','\\"') + "\" " #

        return res
    
    def getCollectionsDatabaseID(self):
        return self.collections['collections'][0]['databaseId']
    
    def getFunctions(self):
        #remove last line
        with open("appwrite.json", "r") as f:
            content = f.read()
        
        return json.loads(content)["functions"]

    def generateEnvironmentFile(self,endpoint,projectid):
        print("Work in progress")
        self.loadCollections()
        self.loadStorage()
        with open("environment.ts", "w") as f:
            f.write("//This file is generated\n")
            f.write("\n//GENERAL\n")
            f.write("export const API_URL = \"" + endpoint + "\";\n")
            f.write("export const PROJECT_ID = \"" + projectid + "\";\n")
            f.write("export const DATABASE_ID = \"" + self.getCollectionsDatabaseID() + "\";\n")

            f.write("\n//COLLECTIONS\n")
            for collection in self.collections['collections']:
                f.write("export const " + collection['name'].upper() +"_COLLECTION_ID" " = \"" + collection['$id'] + "\";\n")
            f.write("\n//STORAGE\n")
            for storage in self.storage['buckets']:
                f.write("export const " + storage['name'].upper() +"_STORAGE_ID" " = \"" + storage['$id'] + "\";\n")
            f.write("\n//SERVER FUNCTIONS\n")
            f.write("export const enum SERVER_FUNCTIONS{\n")
            for function in self.getFunctions():
                f.write("\t"+function['name'] + " = \"" + function['$id'] + "\",\n")
            f.write("};\n")

            f.write("//end of file")






def showMenu():
    print("1. Login")
    print("2. Get database from project")
    print("3. Get storage from project")
    print("4. upload database & storage to project")
    print("5. generate environment.ts file for frontend")
    print("6. Exit")
    return input("Enter your choice: ")

if __name__ == "__main__":
    appwriteMigration = appwriteMigrationTool()
    choice = ""
    while choice != "6":
        choice = showMenu()
        if choice == "1":
            appwriteMigration.login()
        elif choice == "2":
            databaseid = input("Enter your database id: ")
            appwriteMigration.getDatabases(databaseid)
        elif choice == "3":
            appwriteMigration.getStorage()
        elif choice == "4":
            databasename = input("Enter the database name: ")
            appwriteMigration.uploadDatabases(databasename)
            appwriteMigration.uploadStorage()
            #save all commands to file
            with open("commands.bat", "w") as f:
                for cmd in appwriteMigration.commandList:
                    f.write("call " + cmd + "\n")
            
            #run commands.bat file
            os.system(f'cmd /c "commands.bat"')
        elif choice == "5":
            print("Work in progress")
            endpoint = input("Enter your endpoint: ")
            projectid = input("Enter your project id: ")
            appwriteMigration.generateEnvironmentFile(endpoint,projectid)
