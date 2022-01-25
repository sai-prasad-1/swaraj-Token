import check from "../../assets/icons/check.svg";
import progress from "../../assets/icons/progress.svg";
import React, { useState, useRef } from 'react';
import { useSpring, animated } from "react-spring";
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

function Timeline(props) {
  if (props.last) {
    return (
      <div className="timeline-last">
        <div id="lastRoadMap" className="timelineStops"></div>
      </div>
    );
  } else {
    return (
      <div className="timeline">
        <div className="scrollLine" style={{width:"4px",backgroundColor:"#1daefd", height:"10px", position:"absolute"}}></div>
        <div  className="timelineStops"></div>
      </div>
    );
  }
}
function RoadMapCards(props) {
  const ref = useRef();
  const [isHovered, setHovered] = useState(false);
  const [animatedProps, setAnimatedProps] = useSpring(() => {
    return {
      // Array containing [rotateX, rotateY, and scale] values.
      // We store under a single key (xys) instead of separate keys ...
      // ... so that we can use animatedProps.xys.interpolate() to ...
      // ... easily generate the css transform value below.
      xys: [0, 0, 1],
      // Setup physics
      config: { mass: 5, tension: 400, friction: 40, precision: 0.00001 },
    };
  });
  return (
    <div className="RoadMapCardFrame">
      <Timeline last={props.last}></Timeline>
      <animated.div
      className="FeatureCard RoadMapCard"
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={({ clientX, clientY }) => {
        const x =
          clientX -
          (ref.current.offsetLeft -
            (window.scrollX || window.pageXOffset || document.body.scrollLeft));

        // Get mouse y position within card
        const y =
          clientY -
          (ref.current.offsetTop -
            (window.scrollY || window.pageYOffset || document.body.scrollTop));

        // Set animated values based on mouse position and card dimensions
        const dampen = 500; // Lower the number the less rotation
        const xys = [
          -(y - ref.current.clientHeight / 2) / (dampen*10), // rotateX
          (x - ref.current.clientWidth / 2) / dampen, // rotateY
          1.03, // Scale
        ];

        // Update values to animate to
        setAnimatedProps({ xys: xys });
      }}
      onMouseLeave={() => {
        setHovered(false);
        // Set xys back to original
        setAnimatedProps({ xys: [0, 0, 1] });
      }}
      style={{
        // If hovered we want it to overlap other cards when it scales up
        zIndex: isHovered ? 2 : 1,
        // Interpolate function to handle css changes
        transform: animatedProps.xys.interpolate(
          (x, y, s) =>
            `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        ),
      }} >
        <div>
          <div className="status">{props.phase.status}</div>
          <h3>{props.phase.title}</h3>
          {props.phase.tasks.map((task) => (
            <Status stat={task.stat} text={task.text}></Status>
          ))}
        </div>
      </animated.div>
    </div>
  );
}

export default RoadMapCards;
