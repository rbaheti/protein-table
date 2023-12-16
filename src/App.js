import "./App.css";
import ProteinTable from "./ProteinTable";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Button, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: "http://35.92.236.234:9190/graphql" })]);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tabId) => {
    if (activeTab !== tabId) {
      setActiveTab(tabId);
    }
  };

  return (
    <ApolloProvider client={client}>
      <div className="bg-dark" style={{ height: "100%" }}>
        <Router>
          <Nav tabs>
            <NavItem id="1">
              <Link to="/navigation1">
                <NavLink
                  className={`${activeTab === "1" ? "active" : ""}`}
                  onClick={() => {
                    toggleTab("1");
                  }}
                  style={{ textDecoration: "none" }}
                >
                  Navigation 1
                </NavLink>
              </Link>
            </NavItem>
            <NavItem id="2">
              <Link to="/navigation2">
                <NavLink
                  className={`${activeTab === "2" ? "active" : ""}`}
                  onClick={() => {
                    toggleTab("2");
                  }}
                >
                  Navigation 2
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
          <div className="d-flex justify-content-between m-2 ps-2 pe-2">
            <div className="results">Results</div>
            <Button className="refreshBtn">Refresh</Button>
          </div>
          <div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div className="m-2 p-2">
                  <ProteinTable />
                </div>
              </TabPane>
            </TabContent>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="2">
                <div className="m-2 p-2">
                  <Row>
                    <Col sm="6" style={{ color: "white" }}>
                      Tab 2 contents
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
