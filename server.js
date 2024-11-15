// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const connectDB = require('./config/db');
// const schema = require('./routes/graphql');
// const auth = require('./middleware/auth');

// require('dotenv').config();

// const app = express();
// connectDB();

// app.use(express.json());

// // GraphQL endpoint
// app.use('/graphql', auth(['admin']), graphqlHTTP({
//   schema,
//   graphiql: true,
// }));

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}/graphql`);
// });

// Your GraphQL server setup goes here
// server.js

const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const authSchema = require('./routes/authSchema');
const employeeSchema = require('./routes/employeeSchema');
const auth = require('./middleware/auth');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*', // Replace with your client's origin
  credentials: true
}));

connectDB();

app.use(express.json());

// Authentication endpoint for generating tokens
app.use('/graphql/auth', graphqlHTTP({
  schema: authSchema,
  graphiql: true,
}));

// Employee management endpoint (protected)
app.use('/graphql/employee', auth(['admin']), graphqlHTTP({
  schema: employeeSchema,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql/auth`);
  console.log(`Employee management on http://localhost:${PORT}/graphql/employee`);
});