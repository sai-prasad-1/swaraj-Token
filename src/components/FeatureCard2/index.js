function FeatureCards2(props) {
  return (
    <div className="FeatureCard2">
      <div>
        <img src={props.icon} alt="icon"/>
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

export default FeatureCards2;
