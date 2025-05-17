import { useContext } from "react";
import { AuthContext } from "../store/Auth";
import "../css/taskagent.css";
import { useParams } from "react-router-dom";

export const DisplayTaskAgents = () => {
  const { TaskAgents } = useContext(AuthContext);
  const {email}=useParams();
  // console.log("xuugfegyegwiu",email,TaskAgents);

  return (
    <>
      <h2 className="agent-heading">Agents</h2>

      <div className="agent-grid">
        {TaskAgents && TaskAgents.length > 0 ? (
          TaskAgents.map((curElem, index) => 
            curElem.email==email?(
            <div className="agent-card" key={index}>
              <div className="agent-name">{curElem.name}</div>
              <div className="agent-email">{curElem.email}</div>
              <div className="agent-order">
                {curElem.orders.map((order, i) => (
                  <div key={i} className="order-item">
                    📦 
                    <li>{order.taskname}</li>
                    <li>{order.phone}</li>
                    <li>{order.notes}</li>
                  </div>
                ))}
              </div>
            </div>
          ):(null))
        ) : (
          <p>No agents found.</p>
        )}
      </div>
    </>
  );
};
