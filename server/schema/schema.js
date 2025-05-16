// destrcuture the sampleData.js file to get the projects and clients arrays
const { projects, clients } = require("../sampleData.js");

// when we have diff resources (projects & clients in this case),
// we create a type for all of those
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
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
        // finfing the client for the project using parent.clientId
        return clients.find((client) => client.id === parent.clientId);
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
        // this is a function that returns the projects
        return projects; // return the projects array directly
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
        // we need to find the client with the id passed in
        // we can use the find method to find the client
        return projects.find((project) => project.id === args.id);
      },
    },

    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return clients; // return the clients array directly
      },
    },

    client: {
      type: ClientType,
      // we need to pass an id to get a client
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // we need to find the project with the id passed in
        // we can use the find method to find the project
        return clients.find((client) => client.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
