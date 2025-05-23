import React from "react";
import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientsModal from "../components/AddClientsModal";

const Home = () => {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientsModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
};

export default Home;
