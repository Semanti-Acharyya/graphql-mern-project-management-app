import React from "react";
// we can get the project id from the URL using useParams
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "../components/ClientInfo";

const Projects = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          {/* Project name and description */}
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          {/* Project status */}
          <h5 className="mt-3"> Project Status</h5>
          <p className="lead">{data.project.status}</p>

          {/* Client component with client info */}
          <ClientInfo client={data.project.client} />
        </div>
      )}
    </>
  );
};

export default Projects;
