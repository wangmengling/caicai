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

import {UserType,UserQueries,UserMutations} from '../models/UserQL.js'


const AppRootQuery = new GraphQLObjectType({
  name: 'AppRootQuery',
  fields: {
    user: UserQueries.user,
    users: UserQueries.users,
  },
});

const AppRootMutation = new GraphQLObjectType({
  name: 'AppRootMutation',
  fields: {
    addUser: UserMutations.addUser,
  },
});

export const schema = new GraphQLSchema({
  query: AppRootQuery,
  mutation: AppRootMutation,
});
