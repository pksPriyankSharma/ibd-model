import "./Modal.css"; // For styling the modal
export default function FileList() {
    var files = ["File One","File Two","File Three","File Four","File Five", "File Six","File Seven","File Eight","File Nine","File Ten"]
    return (
        <div style={{padding:'10px 0px'}}>
            <ul type='none' style={{overflowY:'scroll', height:300}}>
            {files.map((item, index)=>(
                <li className={`file-list-item ${index===files.length-1?'last-list-item':''}`}>{item}</li>
            ))}
            </ul>
        </div>
    )
}