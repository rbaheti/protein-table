import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import "./ProteinTable.css";
// ag-theme-quartz[.min].css
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
// Create new GridExample component
const ProteinTable = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    {
      "protein name": "Voyager",
      abundance: "NASA",
      confidence: "Cape Canaveral",
    },
    {
      "protein name": "Apollo 13",
      abundance: "NASA",
      confidence: "Kennedy Space Center",
    },
    {
      "protein name": "Falcon 9",
      abundance: "SpaceX",
      confidence: "Cape Canaveral",
    },
  ]);
  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([{ field: "protein name" }, { field: "abundance" }, { field: "confidence" }]);
  // Container: Defines the grid's theme & dimensions.
  return (
    // <div className={"ag-theme-quartz-dark"} style={{ width: "100%", height: 500 }}>
    //   <AgGridReact rowData={rowData} columnDefs={colDefs} />
    // </div>
    <Table size="sm">
      <thead>
        <tr>
          <th>Protein Name</th>
          <th>Abundance</th>
          <th>Confidence</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr size="sm">
          <td></td>
          <td></td>
          <td className="d-flex justify-content-end m-0">
            <Pagination size="sm">
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" previous />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" next />
              </PaginationItem>
            </Pagination>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ProteinTable;
