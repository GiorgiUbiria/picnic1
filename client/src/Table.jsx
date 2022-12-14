import "./App.css";

const Table = ({ Question, SegmentType, SegmentDescription, Answer, Count, Percentage }) => {
  return (
    <tr>
      <td className="question">{Question}</td>
      <td className="segments">{SegmentType}</td>
      <td className="segments">{SegmentDescription}</td>
      <td className="answer">{Answer}</td>
      <td className="count">{Count}</td>
      <td className="percentage">{Percentage}</td>
    </tr>
  );
};

export default Table;
