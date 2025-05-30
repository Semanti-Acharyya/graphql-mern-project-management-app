import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutations";

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      navigate("/");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button
        className="btn btn-danger m-2"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this project?")) {
            deleteProject({ variables: { id: projectId } });
          }
        }}
      >
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
