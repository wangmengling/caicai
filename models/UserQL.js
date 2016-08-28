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

// import UserModel from './UserModel.js';

import UserModel from './UserModel.js';

//GraphQLUser Type
export const UserType = new GraphQLObjectType({
  name: 'User',
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
    // resolve:  () => UserModel.findById("579a0f2b89aab21406354e76"),
  },
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
    },
    resolve: (root, {id}) => {
      return UserModel.getUserById(id)
    }
    // resolve: UserModel.getUserById('579a0f2b89aab21406354e76',function(err,doc){
    // //找到所有名字叫krouky的人
    //   return doc
    // })
    // resolve: () => {
    //   // return new Promise((resolve, reject) => {
    //     UserModel.getUserById('579a0f2b89aab21406354e76',function(err, res){
    //       console.log(res)
    //       err ? reject(err): resolve(res);
    //     });
    //   // });
    // }
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
