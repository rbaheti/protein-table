import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_SAMPLES } from "./GraphQl/Queries";
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "./ProteinTable.css";

const ProteinTable = () => {
  const { error, loading, data } = useQuery(LOAD_SAMPLES, {
    variables: { first: 3, offset: 2 },
  });
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    console.log("data: ", data);
    if (data && data.allSamples && data.allSamples.nodes) {
      setRowData(data.allSamples.nodes);
    }
  }, data);
  const changePage = (pageNumber) => {
    if (currentPage === pageNumber) return;
    setCurrentPage(pageNumber);
  };
  const onPageNumberClick = (pageNumber) => {
    changePage(pageNumber);
  };
  const onPreviousPageClick = () => {
    if (currentPage === 1) return;
    changePage((currentPage) => currentPage - 1);
  };
  const onNextPageClick = () => {
    if (currentPage === Math.ceil(rowData.length / 3)) return;
    changePage((currentPage) => currentPage + 1);
  };
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === 2;
  const renderTablePage = () => {
    if (rowData.length === 0) return null;
    let end = 3 * currentPage;
    let start = end - 3;
    if (end > rowData.length) {
      end = rowData.length;
    }
    const renderRows = [];
    for (let i = start; i < end; i++) {
      renderRows.push(
        <tr>
          <td>{rowData[i].proteinName}</td>
          <td>{rowData[i].abundance}</td>
          <td>{rowData[i].confidence}</td>
        </tr>
      );
    }
    return renderRows;
  };
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Protein Name</th>
          <th>Abundance</th>
          <th>Confidence</th>
        </tr>
      </thead>
      <tbody>
        {renderTablePage()}
        {/* {rowData.map((row, index) => {
          if (currentPage === 1 && index < 3) {
            return (
              <tr>
                <td>{row.proteinName}</td>
                <td>{row.abundance}</td>
                <td>{row.confidence}</td>
              </tr>
            );
          } else {
            return (
              <tr>
                <td>{row.proteinName}</td>
                <td>{row.abundance}</td>
                <td>{row.confidence}</td>
              </tr>
            );
          }
        })} */}
        <tr size="sm">
          <td></td>
          <td></td>
          <td className="d-flex justify-content-end m-0">
            <Pagination size="sm">
              {[1, 2].map((pageNumber) => {
                return (
                  <PaginationItem
                    key={pageNumber}
                    onClick={() => onPageNumberClick(pageNumber)}
                    active={pageNumber === currentPage}
                  >
                    <PaginationLink href="#">{pageNumber}</PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem onClick={onPreviousPageClick} disabled={isCurrentPageFirst}>
                <PaginationLink href="#" previous />
              </PaginationItem>
              <PaginationItem onClick={onNextPageClick} disabled={isCurrentPageLast}>
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
