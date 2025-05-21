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
  GraphQLEnumType,
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
        return client.save();
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

    // Add Project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // creating a new project using the Project mongoose model
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        // saving the project to the database
        return project.save();
      },
    },

    // Delete Project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        // deleting the project from the Project mongoose model
        return Project.findByIdAndDelete(args.id);
      },
    },

    // Update Project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        // updating the project from the Project mongoose model
        return Project.findByIdAndUpdate(
          args.id,
          {
            // setting the values to be updated using the $set operator
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          // if the values are not passed, it will be set as a new project using kw 'new'
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
