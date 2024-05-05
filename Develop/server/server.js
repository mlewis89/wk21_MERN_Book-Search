//import external librairies
const express = require('express');
const {ApolloServer} = require('@apolloserver');
const {expressMIddleware} = require('@apllo/server/express4');
const path = require('path');

//import local files
const db = require('./config/connection');
//const routes = require('./routes');
const {typeDefs, resolvers} = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer(
  {typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMIddleware(server));

  //if production, server 'dist' folder as static assests
  if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client/dist')));
  }

  app.get('*'), req, res => {
    res.sendFile(path.join(_dirname, '../client/dist/index.html'));
  }
}

db.once('open', () => {
  app.listen(PORT, ()=>{
    app.listen(PORT, ()=>{
      console.log(`🌍 Now listening on localhost:${PORT}`)
    })
  })
});

/*
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});*/
