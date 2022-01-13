import logo from "./logo_swrj.png";
import "./App.css";
import NFTCards from "./components/NFTCards";
import a from "./assets/5.png";
import b from "./assets/3.png";
import c from "./assets/2.png";
import d from "./assets/1.png";
import e from "./assets/6.png";
import f from "./assets/7.png";
import location from "./assets/icons/location.svg";
import telegram from "./assets/social-media-icons/telegram.svg";
import instagram from "./assets/social-media-icons/instagram.svg";
import facebook from "./assets/social-media-icons/facebook.svg";
import twitter from "./assets/social-media-icons/twitter.svg";
import whatsapp from "./assets/social-media-icons/whatsapp.svg";
import RoadMapCards from "./components/RoadMapCards";

const phase1 = {
  title: "Phase 1",
  status: "DONE",
  tasks: [
    { stat: "completed", text: "Conceptualization initial" },
    { stat: "completed", text: "Coin Marketing" },
    { stat: "completed", text: "Seed Sale" },
    { stat: "completed", text: "Private Sale" },
    { stat: "incomplete", text: "Website Launch" },
  ],
};

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
              <span className="colorWhite"> Self Governance</span>.
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
      <section className="roadmapSection">
        {/* RoadMap */}
        <h2 className="roboto">The RoadMap</h2>
        <div className="RoadMapScroll">
          <div className="RoadMapContainer">
            <RoadMapCards phase={phase1}></RoadMapCards>
            <RoadMapCards phase={phase1}></RoadMapCards>
            <RoadMapCards phase={phase1}></RoadMapCards>
            <RoadMapCards phase={phase1}></RoadMapCards>
            <RoadMapCards phase={phase1}></RoadMapCards>
            <RoadMapCards phase={phase1}></RoadMapCards>
          </div>
        </div>
      </section>
      <section className="partnerSection">
        {/* Partners  */}
        <h2 className="roboto">Our Partners</h2>
      </section>
      <footer>
        {/* Footer */}
        <div className="footerGrid">
          <div className="footerLogo">
            <img src={logo} className="logo" alt="logo" />
            <h2>SWARAJ COIN</h2>
          </div>
          <div className="footerLeft">
            <h4>Our Mission</h4>
            <p>
              To accelerate mass adoption of crypto by bringing the next 10M
              users with next gen technology.
            </p>
          </div>
          <div className="footerLocation">
            <img src={location} className="location" alt="location" />
            <h3>SWARAJ HQ</h3>
            <p>
              Bengaluru,
              <br />
              India
            </p>
          </div>
          <div className="footerRight">
            <div className="leftCol">
              <p>Metaverse</p>
              <p>NFT</p>
              <p>RoadMap</p>
            </div>
            <div className="rightCol">
              <p>Tokenomics</p>
              <p>Contact Us</p>
            </div>
          </div>
          <div className="footerCopyright">
            SWARAJ COIN ©2022 All Rights Reserved
          </div>
          <div className="footerSocial">
            <img src={telegram} className="socialIcons" alt="telegram" />
            <img src={facebook} className="socialIcons" alt="facebook" />
            <img src={instagram} className="socialIcons" alt="instagram" />
            <img src={twitter} className="socialIcons" alt="twitter" />
            <img src={whatsapp} className="socialIcons" alt="whatsapp" />
          </div>
          <div className="footerTerms">
            <div className="leftCol">Terms&conditions</div>
            <div className="rightCol">Privacy Policy</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
