import os
import json

class appwriteMigrationTool:
    
    def __init__(self):
        self.init = True
        self.collections = []

    def login(self):
        os.system(f'cmd /c "appwrite login')
        print("Logged in")

    def getDatabases(self,id):
        os.system(f'cmd /c "appwrite databases listCollections --databaseId {id} --json > collections.txt"')
        #remove last line
        with open("collections.txt", "r") as f:
            lines = f.readlines()
        with open("collections.txt", "w") as f:
            f.writelines(lines[:-1])
        print("Collections loaded")
        self.loadCollections()
        print(self.collections)
        
    def loadCollections(self):
        with open("collections.txt") as f:
            collections = f.read()
        collectionJson = json.loads(collections)
        self.collections = collectionJson

    def uploadDatabases(self,projectid,databasename):
        if(projectid==""):
            print("Project id invalid")
            return
        if(databasename==""):
            print("Database name invalid")
            return
        #create database in appwrite
        os.system(f'cmd /c "appwrite databases create --databaseId {databasename} --name {databasename}')
    
    def createCollection(self,collection):
        print("Creating collection",collection)


def showMenu():
    print("1. Login")
    print("2. Get database")
    print("3. upload database")
    print("4. generate environment.ts file for frontend")
    print("5. Exit")
    return input("Enter your choice: ")

if __name__ == "__main__":
    #email = input("Enter your email: ")
    #pwd = input("Enter your password: ")
    appwriteMigration = appwriteMigrationTool()
    choice = ""
    while choice != "5":
        choice = showMenu()
        if choice == "1":
            appwriteMigration.login()
        elif choice == "2":
            databaseid = input("Enter your database id: ")
            appwriteMigration.getDatabases(databaseid)
        elif choice == "3":
            print("Work in progress")
            projectid = input("Enter your project id: ")
            databasename = input("Enter the database name: ")
            appwriteMigration.uploadDatabases(projectid,databasename)
        elif choice == "4":
            print("Work in progress")
