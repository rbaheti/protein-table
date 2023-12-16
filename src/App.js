import "./App.css";
import ProteinTable from "./ProteinTable";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane, Button, Row, Col } from "reactstrap";

function App() {
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tabId) => {
    if (activeTab !== tabId) {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="bg-dark" style={{ height: "100%" }}>
      <div>
        <Nav tabs>
          <NavItem id="1">
            <NavLink
              className={`${activeTab === "1" ? "active" : ""}`}
              onClick={() => {
                toggleTab("1");
              }}
            >
              Navigation 1
            </NavLink>
          </NavItem>
          <NavItem id="2">
            <NavLink
              className={`${activeTab === "2" ? "active" : ""}`}
              onClick={() => {
                toggleTab("2");
              }}
            >
              Navigation 2
            </NavLink>
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
      </div>
      {/* <TabContent activeTab="1">
        <TabPane tabId="1">
          <GridExample />
        </TabPane>
      </TabContent>
      <TabContent activeTab="2">
        <TabPane tabId="2">
          <div>Hello there!</div>
        </TabPane>
      </TabContent> */}
    </div>
  );
}

export default App;
