import logo from "./logo_swrj.png";
import "./App.css";
import NFTCards from "./components/NFTCards";
import a from "./assets/5.png";
import b from "./assets/3.png";
import c from "./assets/2.png";
import d from "./assets/1.png";
import e from "./assets/6.png";
import f from "./assets/7.png";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="gridContainer1">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="navigationTopBar">
            <button> Home </button>
            <button> Tokenomics </button>
            <button> RoadMap </button>
            <button> Contact Us </button>
          </div>
          <div className="heroTitleContainer">
            <h1>
              The New Standard For Freedom And <br />
              Self-Governance
            </h1>
            <span className="subText">
              A Truly Community Driven Metaverse Project,
              <br /> Built On The Concept Of
              <a className="colorWhite"> Self Governance</a>.
            </span>
            <p>
              <button> Freedom Paper V2.1 </button>
            </p>
          </div>
          <div className="heroEmpty"></div>
        </div>
      </header>
      <section className="videoSection">{/* Video */}</section>
      <section align="center" className="assetSection">
        {/* Storyline missing assets */}
        <h2 className="roboto">STORYLINE MISSING ASSETS</h2>
        <div className="cardContainer">
          <NFTCards
            title="Deviants Series NFT"
            characters={{ a: a, b: b, c: c }}
          >
            They are Cute, but vicious. These 10,000 animated characters NFTs
            would be the avatars in the metaverse with certain perks which can
            be customized and upgraded.
          </NFTCards>
          <NFTCards
            title="Sentinel Series NFT"
            characters={{ a: f, b: d, c: e }}
          >
            100 Smart NFTs with AI capabilites. They possess governing rights
            thus making them "Councilor" of certain areas in the metaverse. Also
            these highly intelligent beings can be trained to interact with
            people, excecute specific commandsoutside the metaverse.
          </NFTCards>
          <NFTCards title="Orion Series NFT" characters={{ a: f, b: d, c: e }}>
            Large Regions of devided into 5000 Virtual Land NFTs consisting of
            cities, forests, farmlands etc. They will be used to advertise,
            develop multilevel games, construct structures, hold events and
            social gatherings and engage in commercial ventures such as..
          </NFTCards>
        </div>
      </section>
      <section className="landscapeSection">{/* 3D Landscape */}</section>
      <section className="daoSection">{/* Dao NFT etx */}</section>
      <section className="featuresSection">
        {/* Features of Swaraj World */}
      </section>
      <section className="instructionSection">{/* Instructions */}</section>
      <section className="roadmapSection">{/* RoadMap */}</section>
      <section className="partnerSection">{/* Partners  */}</section>
      <footer>{/* Footer */}</footer>
    </div>
  );
}

export default App;
