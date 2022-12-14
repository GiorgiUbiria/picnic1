import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import "./App.css";

import Table from "./Table";

function App() {
  let i = 0;
  let j = 1;
  const [dataSet, setDataSet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchDataSet = async () => {
      const response = await axios.get(`http://localhost:3000/`);
      console.log(response.data);
      setDataSet(response.data);
    };

    fetchDataSet();
  }, []);

  function handleExport() {
    // Create an array of arrays where each inner array contains the values for a row of data
    const data = dataSet.map((data) => Object.values(data));

    // Pass the array of arrays to the aoa_to_sheet method
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    saveAs(
      new Blob([XLSX.write(wb, { bookType: "xlsx", type: "array" })], {
        type: "application/octet-stream",
      }),
      "dataSet.xlsx"
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataSet.slice(indexOfFirstItem, indexOfLastItem);

  const spanList = Array.from(
    { length: Math.ceil(dataSet.length / itemsPerPage) },
    (_, index) => <span key={index} />
  );

  return (
    <main className="display">
      <h1 className="page__number"> {currentPage}</h1>
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Question</th>
              <th className="segmnets__headers">Segment Type</th>
              <th className="segmnets__headers">Segment Description</th>
              <th>Answer</th>
              <th>Count</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data) => (
              <Table
                key={i++}
                Question={data.Question}
                SegmentType={data["Segment Type"]}
                SegmentDescription={data["Segment Description"]}
                Answer={data.Answer}
                Count={data.Count}
                Percentage={`${(data.Percentage * 100).toFixed(2)}%  (${
                  data.Percentage
                })`}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <button
          className="btn"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First Page
        </button>
        <button
          className="btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(dataSet.length / itemsPerPage)}
        >
          Next{" "}
        </button>
        <button
          className="btn"
          onClick={() =>
            setCurrentPage(Math.ceil(dataSet.length / itemsPerPage))
          }
          disabled={currentPage === Math.ceil(dataSet.length / itemsPerPage)}
        >
          Last Page
        </button>
      </div>
      <div>
        {spanList.map((span, index) => (
          <span
            className="span__nums"
            onClick={() => setCurrentPage(index + 1)}
          >
            {j++}
          </span>
        ))}
      </div>
      <button className="export__btn" onClick={handleExport}>
        Export to Excel
      </button>
    </main>
  );
}

export default App;
