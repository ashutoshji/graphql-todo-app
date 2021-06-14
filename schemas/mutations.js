const graphql = require("graphql");
const db = require("../pgAdaptor").db;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;
const { TodoType, UserType } = require("./types");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        userId: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        createdOn: { type: GraphQLString },
        createdBy: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO todo(user_id, createdOn, title, description, createdBy) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        const values = [
          args.userId,
          new Date(),
          args.title,
          args.description,
          args.createdBy
        ];

        return db
          .one(query, values)
          .then(res => res)
          .catch(err => err);
      }
    },
    updateTodo: {
        type: TodoType,
        args: {
          id: { type: GraphQLID },
          title: { type: GraphQLString },
          description: { type: GraphQLString },
          createdBy: { type: GraphQLString }
        },
        resolve(parentValue, args) {
          const query = `UPDATE Todo SET title = $1, description = $2, createdBy = $3 WHERE id = $4`;
          const values = [
            args.title,
            args.description,
            args.createdBy,
            args.id
          ];
  
          return db
            .one(query, values)
            .then(res => res)
            .catch(err => err);
        }
    },
    removeTodo: {
        type: TodoType,
        args: {
          id: { type: GraphQLID }
        },
        resolve(parentValue, args) {
          const query = `DELETE FROM todo WHERE id = $1`;
          const values = [
            args.id
          ];
  
          return db
            .one(query, values)
            .then(res => res)
            .catch(err => err);
        }
    },
    fetchUserTodo:{
        type: TodoType,
        args: {
            userId: { type: GraphQLID }
        },
        resolve(parentValue, args) {
          const query = `SELECT * FROM todo WHERE user_id = $1`;
          const values = [
            args.userId
          ];
  
          return db
            .one(query, values)
            .then(res => res)
            .catch(err => err);
        }
    },
    fetchAllUserTodo:{
        type: TodoType,
        resolve(parentValue, args) {
          const query = `SELECT * FROM todo`;
          return db
            .one(query)
            .then(res => res)
            .catch(err => err);
        }
    },
    addUser: {
        type: UserType,
        args: {
          name: { type: GraphQLString },
          email: { type: GraphQLString }
        },
        resolve(parentValue, args) {
          const query = `INSERT INTO user(name, email) VALUES ($1, $2) RETURNING id`;
          const values = [
            args.name,
            args.email
          ];
  
          return db
            .one(query, values)
            .then(res => res)
            .catch(err => err);
        }
    }
  }
});

exports.mutation = RootMutation;