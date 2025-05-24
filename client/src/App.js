import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// using InMemoryCache so that the added data shows up right
// away on the UI and we don't have to refresh the page
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";

const client = new ApolloClient({
  uri: "http://localhost:5001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Projects />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
