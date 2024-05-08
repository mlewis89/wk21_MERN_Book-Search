const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, {user}) => {
      console.log('user-', user);
      if (user) {
        const foundUser = await User.findOne({
          $or: [{ _id: user._id }, { username: user.username }],
        })
        console.log(foundUser);
        return foundUser;
      }
      console.log('user-error', user);
      throw AuthenticationError;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        console.log("no user found");
        throw AuthenticationError;
      }

      const CorrectPw = await user.isCorrectPassword(password);
      if (!CorrectPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({
        email: email,
        username: username,
        password: password,
      });
      if (!user) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token: token, user: user };
    },
    saveBook: async (parent, {book}, {user}) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: book } },
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
