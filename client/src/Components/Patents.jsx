import { useState,useEffect } from "react";
import "./Patents.css"
const Patents=({state})=>{
    const [patents,setPatents]=useState([]);
    const {contract}=state;
    useEffect(()=>{
        const patentsMessage = async()=>{
          const patents = await contract.getPatents();
          setPatents(patents)
          //console.log(patents)
        }
        contract && patentsMessage()
    },[contract])
    return (
        <div className="container-fluid">
          <h3 style={{ textAlign: "center", marginTop: "20px" }}>Messages</h3>           
                <table>
                <tbody >
          {patents.map((patent) => {
            return (
                    <tr >
                      <td 
                        style={{
                          backgroundColor: "rgb(75, 18, 18)",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "100px",
                          color:"white",
                         
                        }}
                      >
                        {patent.name}
                      </td>
                      <td 
                        style={{
                          backgroundColor: "rgb(75, 18, 18)",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "800px",
                          color:"white"
                        }}
                      >
                        {new Date(patent.timestamp * 1000).toLocaleString()}
                      </td>
                      <td  
                        style={{
                          backgroundColor: "rgb(75, 18, 18)",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "300px",
                          color:"white"
                        }}
                      >
                        {patent.message}
                      </td>
                      <td  className="container-fluid"
                        style={{
                          backgroundColor: "rgb(75, 18, 18)",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "400px",
                          color:"white"
                        }}
                      >
                        {patent.from}
                      </td>
                    </tr>
             
            );
          })}
               </tbody>
                </table>
        </div>
      );
}
export default Patents;