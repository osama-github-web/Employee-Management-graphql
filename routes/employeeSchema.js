const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');

const EmployeeType = require('../graphTypes/EmployeeType')
const { addEmployee, getAllEmployees, getEmployee, deleteEmployee, updateEmployee } = require('../services/employeeService')

// Define your employee queries and mutations here
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllEmployees: {
      type: new GraphQLList(EmployeeType),
      async resolve(parent, args) {
        return await getAllEmployees();
      },
    },
    getEmployee: {
      type: EmployeeType,
      args: { 
        id: { type: GraphQLID } 
      },
      async resolve(parent, args) {
        return await getEmployee(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'EmployeeMutation',
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        class: { type: new GraphQLNonNull(GraphQLString) },
        subjects: { type: new GraphQLList(GraphQLString) },
        role: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const employee = await addEmployee(args);
        return employee
      },
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        class: { type: new GraphQLNonNull(GraphQLString) },
        subjects: { type: new GraphQLList(GraphQLString) },
        role: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const employee = await updateEmployee(args);
        return employee
      },
    },
    deleteEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID }
      },
      async resolve(parent, args) {
        const employee = await deleteEmployee(args.id)
        return employee
      },
    },
    // Add other mutations like updateEmployee, deleteEmployee here
  },
});

const employeeSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = employeeSchema;