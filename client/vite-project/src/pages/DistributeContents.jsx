import { useContext } from "react";
import "../css/distributetask.css"
import { AuthContext } from "../store/Auth";

export const DistributeContents=()=> {
// made sure that files have to be .csv,.xlsx
    const{data,handleFileUpload,handleDivison,uploadData}=useContext(AuthContext);
  return (
    <div className="ditribute_task_body">

      <input 
        type="file" 
        accept=".xlsx, .xls,.csv" 
        onChange={handleFileUpload} 
      />

      {data.length > 0 && (
        <table className="table_tasks">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br /><br />
      <div className="button-group">
      <button className="distribute-btn" onClick={()=>handleDivison()}>Distribute</button>
      <button className="upload-btn"  onClick={uploadData}>Upload Tasks</button>
      </div>
    </div>

  );
}

export default DistributeContents;