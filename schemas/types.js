const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  type: "Query",
  fields: {
    user_id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  }
});

const TodoType = new GraphQLObjectType({
  name: "Todo",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    createdOn: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    creatorBy: { type: GraphQLString }
  }
});

exports.UserType = UserType;
exports.TodoType = TodoType;