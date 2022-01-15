import ReactPlayer from "react-player";
import { Helmet } from "react-helmet";
import { useScrollData } from "scroll-data-hook";
import { useWindowWidth } from "@react-hook/window-size";
import { useTitle } from "react-use";
import { useState } from "react";
import logo from "./assets/icons/swaraj.png";
import "./App.css";
import NFTCards from "./components/NFTCards";
import RoadMapCards from "./components/RoadMapCards";
import a from "./assets/5.png";
import b from "./assets/3.png";
import c from "./assets/2.png";
import d from "./assets/1.png";
import e from "./assets/6.png";
import f from "./assets/7.png";
import location from "./assets/icons/location.svg";
import metamask from "./assets/icons/download.svg";
import menu from "./assets/icons/menu.svg";
import close from "./assets/icons/close.svg";
import wallet from "./assets/icons/wallet.svg";
import balance from "./assets/icons/balance.svg";
import trade from "./assets/icons/trade.svg";
import decentralized from "./assets/features/decentralized.png";
import diagram1 from "./assets/features/G-tokens";
import diagram2 from "./assets/features/61";
import diagram3 from "./assets/features/62";
import telegram from "./assets/social-media-icons/telegram.svg";
import instagram from "./assets/social-media-icons/instagram.svg";
import facebook from "./assets/social-media-icons/facebook.svg";
import twitter from "./assets/social-media-icons/twitter.svg";
import whatsapp from "./assets/social-media-icons/whatsapp.svg";
import FeatureCards from "./components/FeatureCards";

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
  useTitle("Swaraj Coin");
  const [menuState, toggleMenu] = useState(false);
  const screenWidth = useWindowWidth();
  const { scrolling, direction } = useScrollData({
    onScrollStart: () => {
      console.log(direction);
    },
    onScrollEnd: () => {
      console.log(scrolling);
      // window.scrollTo(0,1000)
    },
  });

  return (
    <div className="App">
      <Helmet>
        <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/708453/perlin.js"></script>
      </Helmet>
      <canvas className="canvas"></canvas>
      <header className="App-header">
        <div className="gridContainer1">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="navigationTopBar">
            <button> Home </button>
            <button> Tokenomics </button>
            <button> RoadMap </button>
            <button> Contact Us </button>
          </div>
          <div className="mobileNav">
            <img onClick={()=>toggleMenu(false)} style={{display:menuState?"block":"none"}} src={close} />
            <img onClick={()=>toggleMenu(true)} style={{display:menuState?"none":"block"}} src={menu} />
            <div style={{display:menuState?"block":"none"}} className="menu">
              <div className="item">Home</div>
              <div className="item">Tokenomics</div>
              <div className="item">RoadMap</div>
              <div className="item">Contact Us</div>
            </div>
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
      <section className="videoSection">
        {/* Video */}
        <ReactPlayer
          width={screenWidth < 600 ? screenWidth : 600}
          className="video"
          url="https://www.youtube.com/watch?v=aqz-KE-bpKQ"
        />
        <p> Content under the video</p>
      </section>
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
      <section className="daoSection">
        {/* Dao NFT etx */}
        <img src={diagram1} className="diagram1" alt="diagram1" />
        <br />
        <img src={diagram2} className="diagram2" alt="diagram2" />
        <img src={diagram3} className="diagram3" alt="diagram3" />
      </section>
      <section className="featuresSection">
        {/* Features of Swaraj World */}
        <h1>Features Of Swaraj World</h1>
        <div className="featuresContainer">
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={decentralized}
            title="1. Decentralized"
          ></FeatureCards>
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={decentralized}
            title="1. Decentralized"
          ></FeatureCards>
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={decentralized}
            title="1. Decentralized"
          ></FeatureCards>
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={decentralized}
            title="1. Decentralized"
          ></FeatureCards>
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={decentralized}
            title="1. Decentralized"
          ></FeatureCards>
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={decentralized}
            title="1. Decentralized"
          ></FeatureCards>
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={decentralized}
            title="1. Decentralized"
          ></FeatureCards>
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={decentralized}
            title="1. Decentralized"
          ></FeatureCards>
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={decentralized}
            title="1. Decentralized"
          ></FeatureCards>
        </div>
      </section>

      <section className="instructionSection">
        {/* Instructions */}
        <div className="instructionContainer">
          <h2>Follow These Steps</h2>
          <div className="instructionFlex">
            <div className="instructionStep">
              <img src={metamask} alt="Metamask" />
              <h3>1. Install MetaMask</h3>
              <p>
                On a desktop browser install the MetaMask wallet extension from
                MetaMask.io
              </p>
            </div>
            <div className="verticalLine"></div>

            <div className="instructionStep">
              <img src={wallet} alt="Metamask" />
              <h3>2. Trasfer Matic or BNB to your MetaMask</h3>
              <p>
                You can buy Matic or BNB from any major cryptocurrency exchange
                and then transfer them to your MetaMask.
              </p>
            </div>
            <div className="verticalLine"></div>
            <div className="instructionStep">
              <img src={trade} alt="Metamask" />
              <h3>3. Trade Matic/BNB for $SWRJ</h3>
              <p>
                Visit Swarajcoin.com/buy and connect your MetaMask. Then,trade
                your MATIC/BNB for $SWRJ tokens
              </p>
            </div>
            <div className="verticalLine"></div>

            <div className="instructionStep">
              <img src={balance} alt="Metamask" />
              <h3>4. View $SWRJ Balance</h3>
              <p>
                Visit Swarajcoin.com/buy and connect your MetaMask. Then trade
                your MATIC/BNB for $SWRJ tokens
              </p>
            </div>
          </div>
          <button>More Detailed Instructions</button>
        </div>
      </section>

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
