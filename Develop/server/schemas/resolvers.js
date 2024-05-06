const { Query } = require('mongoose');
const {User, Book} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async ()=>{
            return User;
        }
    },
    Mutation:{
        login: async ()=>{
            return Auth;
        },
        addUser: async ()=>{
            return Auth;
        },
        saveBook: async ()=>{
            return User;
        }, 
        removeBook: async ()=>{
            return User;
        },
    },
};

module.exports =  resolvers;
