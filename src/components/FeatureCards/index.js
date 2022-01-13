function FeatureCards(props) {
    return (
      <div className="FeatureCard">
        <img src={props.image} alt="alt"/>
        <h3>{props.title}</h3>
        <p>{props.text}</p>
      </div>
    );
  }
  
  export default FeatureCards;
  