import Header from "./components/Header";
// using InMemoryCache so that the added data shows up right
// away on the UI and we don't have to refresh the page
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";
import AddClientsModal from "./components/AddClientsModal";

const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientsModal />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
