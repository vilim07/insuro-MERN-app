
# insuro

A small insurance app mockup

# Setup

Pull the project from github.

## Server

1. Create a new MongoDB database cluster and copy the provided URI.

2. Create a **'.env'** file inside the **'backend'** folder.

3. Populate the **'.env'** file:

`PORT=4000`  \
`MONGO_URI=[URI]` Paste the MongoDB URI over [URI].

4. Run `npm i`
To build and start:\
`npm run build` \
`npm run start` \
\
To run in dev mode:\
`npm run dev` \

Starting the server will automatically seed the database with default data located inside the `dist/seeding/` folder.

## Frontend

1. Run `npm i`
To run in dev mode:\
`npm run dev` \
\
To build for production and preview:\
`npm run build` \
`npm run preview` \


