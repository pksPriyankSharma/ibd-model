import "./Modal.css"; // For styling the modal
export default function FileList({ list }) {
  var files = list;
  return (
    <div style={{ padding: "10px 0px" }}>
      <ul type="none" style={{ overflowY: "scroll", height: 300 }}>
        {files.map((item, index) => (
          <li
            key={index}
            className={`file-list-item ${
              index === files.length - 1 ? "last-list-item" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
