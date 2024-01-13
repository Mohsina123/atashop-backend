## Features
- [x] ES6 for the latest & greatest javascript awesomeness
- [x] [MongoDB](https://www.mongodb.com/) w/ [Mongoose](http://mongoosejs.com/) for data layer
- [x] Testing via [Mocha](https://mochajs.org/) & [Chai](http://chaijs.com/)
- [x] Test coverage via [Isparta](https://github.com/douglasduteil/isparta)
- [x] Username/Email registration and authentication

## Getting Started
First, ensure you have node and mongo installed on your system.

```sh

#Make it your own
npm init
#Fill all details like this
"name": "backend-demo",
"version": "1.0.0",
"description": "this is backend project","main": "index.js",


# Install dependencies
npm install

# Run it
npm start

## Environment Variables
Place a `.env` file in the top level of the directory you've cloned. These variables will be automatically assigned to `process.env` when the application boots. It is gitignored by default as it's not good practice to store your environment variables in your remote repository.
Your `.env` file can look something like this:

```shell
MONGO_URI=mongodb://somewhere:27017
SESSION_SECRET=lolthisissecret
```

Now we can access one of these variables with something like `process.env.MONGO_URI`!

## NPM Scripts

- **`npm start`** - Start live-reloading development server

# Table Contents

## App Folder
This folder Include 6(six) folders- and 3(Three)files.

|                |Folders                          |Files                         |                
|----------------|------------------------------------------------|-----------------------------|
|1               |`Config`                       |`index.js`            |
|2               |`Core`                         |`server.js`           |
|3               |`Database`                     |`routes.js`           |
|4               |`Public`                       |                      |   
|5               |`Services`                     |                      |
|6               |`views`                        |                      |

## Folders
- >Config
- >Core
- >Database
- >Public
- >Services
- >Views

## Files
- >index.js
- >routes.js
- >server.js

## Config Folder
 This folder Include two Files -

- **`constants or config File`** - In this file environment or connection relative data are stored.
- **`multer File`**             - Multer is a node.js middleware for handling **multipart/form-data**, which is primarily used for uploading files.

## Core Folder
this folder contains 7(seven) folder

- **`common`**                    - This folder contains all common functions which is used universally.
- **`controllers`**               - This folder contains controllers functions .
- **`middleware`**                - This folder contains **error** handling functions and **authenticate** related functions.
- **`models`**                    - This folder contains models of the product. 
- **`repo`**                      - This folder contains repositories related functions . 
- **`routes`**                    - This folder contains routes or crud operations routes of the product .
- **`services`**                  - This folder contains Logic of products functions.
 
## Database Folder

- This folder include all database connection relatd functions example- **`mongodb`** .
                              
## Public Folder
- This folder used for store files like image ,pdf .etc and also used for storing **`UI`** related data. 

## Services Folder

- This folder contains services related functions which is given below -

> parse the request.
> validate the request.
> communicate with the third parties.
> communicate with the database.
> do calculations.
> build the response.

## Views Folder

This folder contains templete files example- **Email Template**

## Index file

This File used For-

>**` Load environment variables`**
>**` Initialize Database`**
> **`Initialize Server`**

## Routes File
The route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), an URL path/pattern, and a function that is called to 
handle that pattern.

## Server File
- a static file server will listen for requests and try to match the requested URL to a file on the local filesystem.


##  Logs Folder
This folder is used for recording all operations which is performed from backed  also store errors logs.

## Public Folder
This Folder containes testing files example-**swagger**


## Node Module Folder 
This folder contains all **installed packeges** which is used in that particular project.

## .env File 
Environment variables offer information on the process's operating environment (producton, development, build pipeline, and so on). Environment variables in 
Node are used to **store sensitive data such as passwords**, API credentials, and other information that should not be written directly in code. Environment 
variables must be used to configure any variables or configuration details that may differ between environments.

## index File 
This is main file which is require to **`start backend`** .

## package.json File
The package. json file is the **heart of any Node project**. It records important **metadata** about a project which is required before publishing to NPM, and 
also 
defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to our package.

## package-lock.json File

package.lock.json. It contains basic **information** about the project. It describes the exact tree that was generated to allow subsequent installs to have the 
identical tree. It is mandatory for every project. It is automatically generated for those operations where npm modifies either node_modules tree or package.

## migrate File
this file is used to **`migrate database`**.


## .gitignore File
gitignore is a simple text file containing a list of files and directories you wish to exclude from the git repository.


## Seed File
This file includes the seeding **database configuration** and Seeding a database is a process in which an initial set of data is provided to a database when it is 
being installed. It is especially useful when we want to populate the database with data we want to develop in future. So our goal is to **“feed”** the database 
with dummy data on its initialization

## Test Folder
This folder contains  **testing files**.


## randomlyOutput.json file
this is a JSON file which is used as a software tool used for designing, building, documenting, and using **RESTful APIs**.

## Credits ##
All [MyExpertise](https://myexpertise.io/) Teammembers.








