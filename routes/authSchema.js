const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLSchema, GraphQLInt , GraphQLList, GraphQLID} = require('graphql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Employee = require('../models/employeeModel');

const EmployeeType = require('../graphTypes/EmployeeType')
const AuthType = require('../graphTypes/AuthType')


// Create a basic RootQuery for the auth schema
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    dummy: {
      type: GraphQLString,
      resolve: () => 'This is a dummy query for authentication schema',
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'AuthMutation',
  fields: {
    login: {
      type: AuthType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const employee = await Employee.findOne({ name: args.name });
        if (!employee) throw new Error('Employee not found');

        // const isMatch = await bcrypt.compare(args.password, employee.password);
        // if (!isMatch) throw new Error('Invalid credentials');
        const isMatch = args.password === employee.password;
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign(
          { id: employee.id, role: employee.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return { token }; // Return the generated token
      },
    },
    registerEmployee: {
      type: EmployeeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        class: { type: new GraphQLNonNull(GraphQLString) },
        subjects: { type: new GraphQLList(GraphQLString) },
        role: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        const employee = new Employee(args);
        return employee.save();
      },
    },
  },
});

const authSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = authSchema;