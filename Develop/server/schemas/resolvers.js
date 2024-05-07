const { User} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context ) => {
      const foundUser = await User.findOne({
        $or: [
          { _id: context._id},
          { username: context.username },
        ],
      });

      return foundUser;
    },
  },
  Mutation: {
    login: async (parent, {email, password}) => {      
      console.log(email, password);
      const user = await User.findOne({email, password});
      if (!user)
        {throw AuthenticationError;}
      const CorrectPw =  await User.isCorrectPassword(password);
      if(!CorrectPw)
        {throw AuthenticationError;}
      const token =  signToken(user);
      console.log(user, token);
      return {token, user};
    },
    addUser: async (parent, {username, email,  password}) => {
      
      const user = await User.create({email: email, username: username, password: password});
      if (!user)
        {throw AuthenticationError;}
      
      const token = signToken(user);
      return { token: token, user: user };
    },
    saveBook: async (parent, {bookInput}) => {
       const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { $addToSet: { savedBooks: bookInput } },
              { new: true, runValidators: true }
            );
            return updatedUser;
    },
    removeBook: async (parent, bookId) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: { bookId: bookId } } },
            { new: true }
          );
          return updatedUser;
    },
  },
};

module.exports = resolvers;
