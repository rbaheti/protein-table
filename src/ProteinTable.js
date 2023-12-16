import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { LOAD_SAMPLES } from "./GraphQl/Queries";
import { Table, Pagination, PaginationItem, PaginationLink, Button } from "reactstrap";
import "./ProteinTable.css";

const ProteinTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [refreshBtnClicked, setRefreshBtnClicked] = useState(false);

  // Calling "useQuery" only to get full-data for pagination's 2nd page.
  // If we had a total count of data entries, then we wouldn't have needed to call this.
  const {
    error: fdError,
    loading: fdLoading,
    data: fullData,
  } = useQuery(LOAD_SAMPLES, { variables: { first: 10000, offset: 0 } });
  // first and offset variables are used here to know which elements to fetch from the GraphQl api.
  const [getSamplesData, { loading, error, data }] = useLazyQuery(LOAD_SAMPLES);

  useEffect(() => {
    if (refreshBtnClicked && currentPage > 0) {
      let first = 3;
      let offset = (currentPage - 1) * 3;
      getSamplesData({ variables: { first, offset } });
    }
  }, [currentPage]);

  const getRowData = (data) => {
    if (data && data.allSamples && data.allSamples.nodes) {
      return data.allSamples.nodes;
    }
    return [];
  };

  const onClickRefreshBtn = (e) => {
    e.preventDefault();
    setRefreshBtnClicked(true);
    setCurrentPage(1);
  };

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
    if (currentPage === Math.ceil(getRowData(fullData).length / 3)) return;
    changePage((currentPage) => currentPage + 1);
  };

  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === 2;

  if (loading) return <div style={{ color: "white" }}> Loading...</div>;
  if (error) return <div style={{ color: "white" }}>Error: {error?.message || "Error occured!"}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between m-2 ps-2 pe-2">
        <div className="results">Results</div>
        <Button className="refreshBtn" onClick={onClickRefreshBtn}>
          Refresh
        </Button>
      </div>
      <Table size="sm" dark>
        <thead>
          <tr>
            <th>Protein Name</th>
            <th>Abundance</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {getRowData(data).map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.proteinName}</td>
                <td>{row.abundance}</td>
                <td>{row.confidence}</td>
              </tr>
            );
          })}
          <tr size="sm">
            <td></td>
            <td></td>
            <td className="d-flex justify-content-end m-0">
              <Pagination size="sm">
                {/* using static array for pagination here to keep it simple. */}
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
    </div>
  );
};

export default ProteinTable;
