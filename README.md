# IBM-DINER

## How to get started
1. Fork and clone this repo
2. Remove any local instances of node_modules - this is already in the docker container. Do not run `npm install` locally.
3. `docker build -t facompany/diner .`
4. `docker run -p 3001:3000 facompany/diner`
5. To run locally: `npm install` and then `npm start`

## tech stack
1. React (if more time allowed, would have wanted to refactor using React hooks)
2. NoSQL(Mongo) - considered PostgreSQL but liked that fact that Mongo provided consistency and partition tolerance. Also quicker dev time
3. Node/Express for backend - using middleware to proxy requests and build out needed routes
4. Sentiment npm package for sentiment analysis https://www.npmjs.com/package/sentiment
