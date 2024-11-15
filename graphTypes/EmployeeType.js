const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      class: { type: GraphQLString },
      subjects: { type: new GraphQLList(GraphQLString) },
      attendance: { type: GraphQLInt },
      role: { type: GraphQLString },
      password: {type: GraphQLString}
    }),
  });

module.exports = EmployeeType