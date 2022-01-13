import check from "../../assets/icons/check.svg";
import progress from "../../assets/icons/progress.svg";

function Status(props) {
  return (
    <div className="task">
      <img
        src={props.stat === "completed" ? check : progress}
        className="taskStat"
        alt="Check"
      />
      {props.text}
    </div>
  );
}

function RoadMapCards(props) {
  return (
    <div className="RoadMapCard">
      <div>
        <div className="status">{props.phase.status}</div>
        <h3>{props.phase.title}</h3>
        {props.phase.tasks.map((task) => (
          <Status stat={task.stat} text={task.text}></Status>
        ))}
      </div>
    </div>
  );
}

export default RoadMapCards;
