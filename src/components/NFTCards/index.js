function NFTCards(props) {
  return (
    <div className="NFTCard">
      <div>
        <div className="characterContainer">
          <img src={props.characters.a} className="characterMiddle" alt="A" />
          <img src={props.characters.b} className="characterLeft" alt="B" />
          <img src={props.characters.c} className="characterRight" alt="C" />
        </div>
        <h3>{props.title}</h3>
        <p>
          {props.children}
        </p>
      </div>
    </div>
  );
}

export default NFTCards;
