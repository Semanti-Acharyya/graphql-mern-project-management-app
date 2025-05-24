import React from "react";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";

const AddProjectsModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  // new is the default status of the project
  // new is the key for the staus 'Not Started'; its an enum
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      // get the existing projects from the cache
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      // write the new project to the cache
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  // get clients for select dropdown
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || clientId === "") {
      return alert("Please fill in all fields");
    }

    addProject(name, description, status, clientId);

    setName("");
    setDescription("");
    setClientId("");
    setStatus("new");
  };

  if (loading) return null;
  if (error) return "Something went wrong";

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectsModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          {/* Modal */}
          <div
            className="modal fade"
            id="addProjectsModal"
            aria-labelledby="addProjectsModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectsModalLabel">
                    Add Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        valu={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        id="status"
                        value={status}
                        className="form-select"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="clientId"
                        className="form-select"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="">Select Client</option>
                        {/* mapping the clients */}
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {/* will show client name */}
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* data-bs-dismiss="modal" will make the modal disapper/close once we click submit */}
                    <button
                      className="btn btn-primary"
                      type="submit"
                      data-bs-dismiss="modal"
                    >
                      Submit Details
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddProjectsModal;
