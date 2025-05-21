import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations.js";
import { GET_CLIENTS } from "../queries/clientQueries.js";

const ClientRow = ({ client }) => {
  // for deleting the client data
  // useMutation is a hook that allows you to execute a mutation
  // and get the result of that mutation
  // DELETE_CLIENT is the mutation that we defined in clientMutations.js
  // useMutation returns an array with the first element being the function to call the mutation
  // and the second element being an object with the result of the mutation
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries is an array of queries that we want to refetch after the mutation
    // this is useful to update the UI after the mutation
    // in this case, we want to refetch the GET_CLIENTS query
    // to get the updated list of clients after deleting a client
    // refetchQueries: [{ query: GET_CLIENTS }],

    // now using update function to update the cache
    update(cache, { data: { deleteClient } }) {
      // get the existing clients from the cache
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      // filter out the deleted client from the existing clients
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          // loop through the existing clients to check if its id is equal to the deleted client id
          // if its not equal then filter those clients
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        {/* for deleting the client data */}
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
