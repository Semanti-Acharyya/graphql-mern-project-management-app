// Import mogoose models
const Project = require("../models/Projects");
const Client = require("../models/Clients");

// when we have diff resources (projects & clients in this case),
// we create a type for all of those
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    // this is an arrow function that returns an object
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        // finding the client for the project using parent.clientId
        // as client id is a child of the parent (project)
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    // this is an arrow function that returns an object
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // this is an arrow function that returns an object
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },

    project: {
      type: ProjectType,
      // we need to pass an id to get a project
      // so we need to define the args
      // args is an object that contains the id
      args: { id: { type: GraphQLID } },
      // resolve is a function that takes in the parent and args
      // parent is the parent object
      // args is the arguments passed to the query
      resolve(parent, args) {
        // return projects by id
        return Project.findById(args.id);
      },
    },

    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },

    client: {
      type: ClientType,
      // we need to pass an id to get a client
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return clients by id
        return Client.findById(args.id);
      },
    },
  },
});

// Mutations

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add Client
    addClient: {
      type: ClientType,
      args: {
        // GraphQLNonNull esnure that the field is not null when submitted, i.e., required field
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        // creating a new client using the Client mongoose model
        const client = new Client({
          //  passing the key values
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        // saving the client to the database
        return Client.save();
      },
    },
    // Delete Client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // deleting the client from the Client mongoose model
        return Client.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
