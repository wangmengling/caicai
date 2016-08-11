import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import UserModel from './UserModel.js';

//GraphQLUser Type
export const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'A user',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    email:{
      type: GraphQLString
    },
    password:{
      type: GraphQLString
    },
    regcity:{
      type: GraphQLString
    }
  })
});

//UserQueries
export const UserQueries =  {
  users: {
    type: new GraphQLList(UserType),
    resolve: UserModel.findById
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID
      }
    },
    resolve: UserModel.create
  }
};
// UserMutations
export const UserMutations = {
  addUser:{
    type:UserType,
    args: {
      name:{
        name:'name',
        type:new GraphQLNonNull(GraphQLString)
      },
      surname:{
        name:'surname',
        type: new GraphQLNonNull(GraphQLString)
      },
      age:{
        name:'age',
        type: GraphQLInt
      }
    },
    resolve: (root, {name, surname, age}) => {
      var newUser = new UserModel({name:name, surname:surname, age:age});

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err): resolve(res);
        });
      });
    }
  }
};
