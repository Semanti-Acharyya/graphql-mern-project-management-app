import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

// exporting the file by variable name
export { GET_CLIENTS };
