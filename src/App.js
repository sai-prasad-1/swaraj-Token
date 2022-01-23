import Vimeo from "@u-wave/react-vimeo";
import { Link } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";
import { useTitle } from "react-use";
import { useState } from "react";
import logo from "./assets/icons/swaraj.png";
import entertainment from "./assets/icons/entertainment.svg";
import monetize from "./assets/icons/monetize.svg";
import develop from "./assets/icons/develop.svg";
import gameplay from "./assets/icons/gameplay.svg";
import explore from "./assets/icons/explore.svg";
import polygon from "./assets/icons/polygon.png";
import infivr from "./assets/icons/infivr.png";
import personalization from "./assets/icons/personalization.svg";
import "./App.css";
import FeatureCards2 from "./components/FeatureCard2";
import NFTCards from "./components/NFTCards";
import RoadMapCards from "./components/RoadMapCards";
import a from "./assets/5.png";
import b from "./assets/3.png";
import c from "./assets/2.png";
import glitch from "./assets/glitch.mp4";
import orion from "./assets/Orions_realm.png";
// import metamask from "./assets/icons/download.svg";
import menu from "./assets/icons/menu.svg";
import close from "./assets/icons/close.svg";
// import wallet from "./assets/icons/wallet.svg";
// import balance from "./assets/icons/balance.svg";
// import trade from "./assets/icons/trade.svg";
// import decentralized from "./assets/features/decentralized.png";
import feature1 from "./assets/features/01.png";
import feature2 from "./assets/features/02.png";
import feature3 from "./assets/features/03.png";
import feature4 from "./assets/features/04.png";
import feature5 from "./assets/features/05.png";
import feature6 from "./assets/features/06.png";
import feature7 from "./assets/features/07.png";
import feature8 from "./assets/features/08.png";
import feature9 from "./assets/features/09.png";
// import diagram1 from "./assets/features/G-tokens";
import diagram2 from "./assets/features/61";
import diagram3 from "./assets/features/62";
import run_gif from "./assets/run.gif";
import run_gif2 from "./assets/run2.gif";
import telegram from "./assets/social-media-icons/telegram.svg";
import instagram from "./assets/social-media-icons/instagram.svg";
import facebook from "./assets/social-media-icons/facebook.svg";
import twitter from "./assets/social-media-icons/twitter.svg";
import linktree from "./assets/social-media-icons/linktree.svg";
import FeatureCards from "./components/FeatureCards";
import yahoofin from "./assets/News/Yahoo-Finance.png";
import yahoonews from "./assets/News/yahoo-news-logo.png";
import newsbtc from "./assets/News/newsbtc-logo.jpg";
import cryptonews from "./assets/News/Cryptonews.png";
import cointelegrah from "./assets/News/cointelegraph.png";
const phase1 = {
  title: "Phase 1: 2021",
  status: "DONE",
  tasks: [
    { stat: "completed", text: "Conceptualization" },
    { stat: "completed", text: "Team Building" },
    { stat: "completed", text: "Whitepaper v1" },
    { stat: "completed", text: "Seed Sale" },
    { stat: "completed", text: "Investor Relatations" },
    { stat: "incomplete", text: "Website Launch v1" },
  ],
};

const phase2 = {
  title: "Phase 2: 2022 Q1",
  status: "IN-PROGRESS",
  tasks: [
    { stat: "completed", text: "Initial Coin Marketing" },
    { stat: "completed", text: "Game Studio Partnership" },
    { stat: "completed", text: "Private Sale" },
    { stat: "incomplete", text: "Website Launch v2" },
    { stat: "completed", text: "Code audit Completed" },
  ],
};

const phase2continued = {
  title: "Phase 2: Continued",
  status: "IN-PROGRESS",
  tasks: [
    { stat: "completed", text: "The Deviants NFT Drop" },
    { stat: "completed", text: "Presale" },
    { stat: "completed", text: "Coin Gecko & CoinMarketCap listing" },
    { stat: "incomplete", text: "Launch Pad Sale" },
  ],
};

const phase3 = {
  title: "Phase 3: 2022 Q2",
  status: "WAIT FOR IT",
  tasks: [
    { stat: "incomplete", text: "LP Locked & Ownership Renounced" },
    { stat: "incomplete", text: "Orion's Realm Land NFTs Drop" },
    { stat: "incomplete", text: "Gameplay Teaser" },
    { stat: "incomplete", text: "Listing on CEX" },
    { stat: "incomplete", text: "Listing on Swaps" },
    { stat: "incomplete", text: "Aditional Game Studio Partnerships" },
  ],
};
const phase3continued = {
  title: "Phase 3: Continued",
  status: "WAIT FOR IT",
  tasks: [
    { stat: "incomplete", text: "Dedicated wallet for charity" },
    {
      stat: "incomplete",
      text: "Debuit NFT Collaboration with top crypto influencers",
    },
    { stat: "incomplete", text: "First Minigame launch" },
    { stat: "incomplete", text: "Release Swaraj Bazinga" },
    { stat: "incomplete", text: "Metaverse - Unreal Engine Development" },
  ],
};
const phase4 = {
  title: "Phase 4: 2022 Q3",
  status: "WAIT FOR IT",
  tasks: [
    { stat: "incomplete", text: "NFT sentinel series auction drop" },
    { stat: "incomplete", text: "NFT marketplace Launch" },
    { stat: "incomplete", text: "More Minigames launches" },
    { stat: "incomplete", text: "Additional Game Studio Partnerships" },
    { stat: "incomplete", text: "DeFi features(Staking & Farming" },
  ],
};
const phase5 = {
  title: "Phase 5: 2022 Q4",
  status: "WAIT FOR IT",
  tasks: [
    { stat: "incomplete", text: "Alpha metaverse testing" },
    { stat: "incomplete", text: "New marketing contents" },
    { stat: "incomplete", text: "1st charity funds release" },
    { stat: "incomplete", text: "Branded merchandise" },
  ],
};

const phase6 = {
  title: "Phase 6: 2023 Q1",
  status: "WAIT FOR IT",
  tasks: [
    { stat: "incomplete", text: "Metaverse Beta version" },
    {
      stat: "incomplete",
      text: "Swaraj army reaching milestones & burn event",
    },
    { stat: "incomplete", text: "Building swaraj ecosystem" },
  ],
};

const phase6continued = {
  title: "Phase 6: Continued",
  status: "WAIT FOR IT",
  tasks: [
    { stat: "incomplete", text: "Voting rights to the people- G Token" },
    { stat: "incomplete", text: "Implement 1% Burn Tax on transactions" },
    { stat: "incomplete", text: "Swaraj Go Green Movement" },
  ],
};

const phase7 = {
  title: "Phase 7: 2023 Q2",
  status: "WAIT FOR IT",
  tasks: [
    { stat: "incomplete", text: "NFT upgrades/ accessories drop" },
    { stat: "incomplete", text: "Swaraj army reaching milestones" },
    { stat: "incomplete", text: "Listing on more exchanges" },
    { stat: "incomplete", text: "Raising funds for major exchange listings" },
  ],
};

const phase8 = {
  title: "Phase 8: 2023 Q3",
  status: "WAIT FOR IT",
  tasks: [
    { stat: "incomplete", text: "AI training platform for Sentinel Series" },
    { stat: "incomplete", text: "SWARAJ Launchpad" },
    { stat: "incomplete", text: "2nd Charity Funds Release" },
  ],
};

const phase9 = {
  title: "Phase 9: 2023 Q4",
  status: "WAIT FOR IT",
  tasks: [
    { stat: "incomplete", text: "Swaraj DEX" },
    { stat: "incomplete", text: "Swaraj wallet/app" },
    { stat: "incomplete", text: "New products and services included in app" },
  ],
};

const phase10 = {
  title: "Phase 10: 2024 Q1",
  status: "WAIT FOR IT",
  tasks: [
    {
      stat: "incomplete",
      text: "Integration with payment services for eCommerce, etc.",
    },
    { stat: "incomplete", text: "Listing on more exchanges" },
    { stat: "incomplete", text: "Corporate endorsement and sponsorships" },
  ],
};

function App() {
  useTitle("Swaraj Coin");
  const [menuState, toggleMenu] = useState(false);
  const screenWidth = useWindowWidth();
  return (
    <div className="App">
      <header id="section1" className="App-header">
        <div className="gridContainer1">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="navigationTopBar">
            {/* <button> Home </button> */}
            <button> Tokenomics </button>
            <button onClick={() => (window.location.href = "#roadmap")}>
              {" "}
              RoadMap{" "}
            </button>
            <button onClick={() => (window.location.href = "#contactUs")}>
              {" "}
              Contact Us{" "}
            </button>
          </div>
          <div className="mobileNav">
            <img
              alt="Close"
              onClick={() => toggleMenu(false)}
              style={{ display: menuState ? "block" : "none" }}
              src={close}
            />
            <img
              alt="Menu"
              onClick={() => toggleMenu(true)}
              style={{ display: menuState ? "none" : "block" }}
              src={menu}
            />
            <div
              style={{ display: menuState ? "block" : "none" }}
              className="menu"
            >
              {/* <div className="item">Home</div> */}
              <div className="item">Tokenomics</div>
              <div
                onClick={() => (window.location.href = "#roadmap")}
                className="item"
              >
                RoadMap
              </div>
              <div
                onClick={() => (window.location.href = "#contactUs")}
                className="item"
              >
                Contact Us
              </div>
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
              <div id="orbClickInfo" className="clickOnOrb">
                Click on the Orb ⮞
              </div>
            </p>
          </div>
          <div className="heroEmpty"></div>
        </div>
      </header>
      <section id="section2" className="videoSection">
        {/* Video */}
        <Vimeo video="669116664" width="100%" height={screenWidth} autoplay />
        {/* <ReactPlayer
          width={screenWidth}
          className="video"
          url="https://vimeo.com/669116664"
        /> */}
      </section>
      <section className="storySection">
        <h2>Story So Far</h2>
        <div className="storyContainer">
          <p>
            Some years ago, amid our own ongoing problems, a crisis of
            unforeseen <strong>magnitude</strong> arrived in our world. Driven
            away from their home by their own magical calamity,{" "}
            <strong>the Elves</strong> and their peoples invaded our world
            instead. They seized control of a <strong>landmass</strong> and
            refused all the feeble attempts at diplomacy, defending to the death
            their new home. They were determined to control this{" "}
            <strong>"new world"</strong> the way they did theirs. We retaliated,
            of course, trying to regain the land that they{" "}
            <strong>stole</strong> from us. As powerful as I am, I felt I could
            not sit back and do nothing.
          </p>
          <p>
            {" "}
            I tried to reason with both sides. Even used threats. I warned them
            of my <strong>premonitions</strong>. Nothing worked. Politicians and
            leaders on both sides were determined to use this conflict for their
            own agendas. War could not be prevented.{" "}
            <strong>A vivid dream</strong> came to me many times now, and I am
            convinced the threat is real. There is something worse coming, much
            worse. If we do not stop this pointless fighting, if we do not unite
            and learn to live in peace, not a single one of us will survive this
            threat. <strong>Humans, Elves, Trolls, Fairies</strong>, we will all
            be wiped out.
          </p>
        </div>
        <Link to="/prologue">
          <button>Prologue</button>
        </Link>
      </section>
      <section id="section3" align="center" className="assetSection">
        {/* Storyline missing assets */}
        <div className="cardContainer">
          <NFTCards title="Deviants Series" characters={{ a: a, b: b, c: c }}>
            They are Cute, but vicious. These 10,000 animated characters NFTs
            would be the avatars in the metaverse with certain perks which can
            be customized and upgraded.
          </NFTCards>
          <NFTCards title="Orion Realm Land Series" image={orion}>
            Large Regions of devided into 5000 Virtual Land NFTs consisting of
            cities, forests, farmlands etc. They will be used to advertise,
            develop multilevel games, construct structures, hold events and
            social gatherings and engage in commercial ventures such as..
          </NFTCards>
          <NFTCards title="Sentinel Series" glitch={glitch}>
            100 Smart NFTs with AI capabilites. They possess governing rights
            thus making them "Councilor" of certain areas in the metaverse. Also
            these highly intelligent beings can be trained to interact with
            people, excecute specific commandsoutside the metaverse.
          </NFTCards>
        </div>
      </section>
      <section id="section4" className="landscapeSection">
        {/* 3D Landscape */}
        <img src={run_gif} alt="run" />
        <img src={run_gif2} alt="run" />
      </section>
      <section className="daoSection">
        <h2 className="roboto">Features of Swaraj World</h2>
        <div className="RoadMapScroll">
          <div className="RoadMapContainer">
            <FeatureCards2
              icon={entertainment}
              title="Entertainment"
              text="Users can host events, social gatherings and network with fellow users bridging the real world and the virtual world."
            ></FeatureCards2>
            <FeatureCards2
              icon={monetize}
              title="Monetize"
              text="Metaverse also provides an extensive array of mediums for advertising and provides opportunities to generate and trade NFTs in the marketplace or hold the NFTs as long-term assets."
            ></FeatureCards2>
            <FeatureCards2
              icon={develop}
              title="Develop"
              text="Users can develop games, make artworks, build their own cities, and dream houses with easy-to-use built-in tools. Furthermore, professionals can used the pro-toolkit to enhance their development."
            ></FeatureCards2>
            <FeatureCards2
              icon={gameplay}
              title="Game Play"
              text="Users can play PvP& P2E games & host game tournaments created by users as well as the games created by the community developers."
            ></FeatureCards2>
            <FeatureCards2
              icon={explore}
              title="Explore"
              text="Discover the vast Metaverse by taking the journey of your lifetime.Get lost in a variety of settings, including jungles, seas, and more as you wander across the world."
            ></FeatureCards2>
            <FeatureCards2
              icon={personalization}
              title="Personalization"
              text="Players can  be whoever they want to be and personalize their avatar and their lands by constructing whatever they envision."
            ></FeatureCards2>
          </div>
        </div>
        {/* Dao NFT etx */}
        <div style={{ marginBottom: "300px" }} className="horizontalFlex">
          <div className="diagramFrame">
            <img src={diagram2} className="diagram1" alt="diagram2" />
            <h3>$SWRJ</h3>
          </div>
          <div className="diagramFrame">
            <img src={diagram3} className="diagram2" alt="diagram3" />
            <h3>$G-TKN</h3>
          </div>
        </div>
      </section>
      <section id="section5" className="featuresSection">
        <h1>Features Of Swaraj Coin</h1>
        <div className="featuresContainer">
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={feature1}
            title="1. Decentralized"
          ></FeatureCards>
          <FeatureCards
            text="A dedicated token called G-Token, which contains various uses such as voting on goverance issues, rewards, tipping features and participating in lotteries.All these features pave the way for a future DAO."
            image={feature2}
            title="2. Governance Token"
          ></FeatureCards>
          <FeatureCards
            text="Earn rewards while playing games and comleting quests in the form of $SWRJ. $GTKN and NFTs."
            image={feature3}
            title="3. P2P&PvP"
          ></FeatureCards>
          <FeatureCards
            text="A collection of 100 Smart NFTs called the Sentinels with AI trained NFT upgrades, launched on our dedicated platfrom."
            image={feature4}
            title="4. Smart-NFTs With AI Capabilities"
          ></FeatureCards>
          <FeatureCards
            text="NFT Drops of 5000 Orion's Realm blocks, 10,000 Deviants, 100 Sentinel series characters and finally upgrades and power-ups, which would be part of the Metaverse with its dedcated marketplace."
            image={feature5}
            title="5. NFT Marketplace"
          ></FeatureCards>
          <FeatureCards
            text="A world with endless opertunites where you can create, monetize, earn, socialize, explore, play, and personalize."
            image={feature6}
            title="6. Swaraj Metaverse"
          ></FeatureCards>
          <FeatureCards
            text="The virtual Lands in the Orion Realm will be administered by a council comprised of sentinels, landowners, and the top holders of G-Tokens. Councilors might collaborate with landowners to organize regional events and competitions."
            image={feature7}
            title="7. Metaverse Council"
          ></FeatureCards>
          <FeatureCards
            text="A comprehensive ecosystem, containing a plethora of distinct staking pools for tokens and NFTs through which rewards are distributed in MATIC, SWARAJ and G-Token."
            image={feature8}
            title="8. Staking Pool"
          ></FeatureCards>
          <FeatureCards
            text="Multi-utility token based on the concept of self-governance."
            image={feature9}
            title="9. Anti-Dump"
          ></FeatureCards>
        </div>
      </section>

      {/* <section id="section6" className="instructionSection">
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
      </section> */}

      <section id="section6" className="roadmapSection">
        {/* RoadMap */}
        <h2 id="roadmap" className="roboto">
          The RoadMap
        </h2>
        <div className="RoadMapScroll">
          <div className="RoadMapContainer">
            <RoadMapCards phase={phase1}></RoadMapCards>
            <RoadMapCards phase={phase2}></RoadMapCards>
            <RoadMapCards phase={phase2continued}></RoadMapCards>
            <RoadMapCards phase={phase3}></RoadMapCards>
            <RoadMapCards phase={phase3continued}></RoadMapCards>
            <RoadMapCards phase={phase4}></RoadMapCards>
            <RoadMapCards phase={phase5}></RoadMapCards>
            <RoadMapCards phase={phase6}></RoadMapCards>
            <RoadMapCards phase={phase6continued}></RoadMapCards>
            <RoadMapCards phase={phase7}></RoadMapCards>
            <RoadMapCards phase={phase8}></RoadMapCards>
            <RoadMapCards phase={phase9}></RoadMapCards>
            <RoadMapCards phase={phase10}></RoadMapCards>
          </div>
        </div>
      </section>
      <section id="section7" className="partnerSection">
        {/* Partners  */}
        <h2 className="roboto">Our Partners</h2>
        <div className="partnerContainer">
          <div className="partnerLogos">
            <img src={polygon} alt="polygon" />
          </div>
          <div className="empty"></div>
          <div className="partnerLogos">
            <img src={infivr} alt="infiVR" />
          </div>
        </div>
      </section>
      <section id="section8" className="featuredSection">
        <h2 className="roboto">Featured On</h2>
        <div className="featuredOnLinks">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://finance.yahoo.com/news/swaraj-set-launch-metaverse-gaming-142500745.html"
          >
            <img src={yahoofin} alt="Yahoo Finance" />
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://news.yahoo.com/swaraj-set-launch-metaverse-gaming-142500745.html"
          >
            <img src={yahoonews} alt="Yahoo News" />
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://cryptonews.com/news/swaraj-set-launch-its-metaverse-gaming-ecosystem.htm"
          >
            <img src={cryptonews} alt="Crypto News" />
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.newsbtc.com/press-releases/swaraj-announces-the-launch-of-a-new-metaverse-gaming-project-and-its-token/"
          >
            <img src={newsbtc} alt="NewsBTC" />
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://cointelegraph.com/press-releases/swaraj-to-launch-their-metaverse-multi-utility-token-shortly"
          >
            <img src={cointelegrah} alt="Cointelegraph" />
          </a>
        </div>
      </section>
      <footer id="section9">
        {/* Footer */}
        <div className="footerGrid">
          <div className="footerLogo">
            <img src={logo} className="logo" alt="logo" />
            <h2>SWARAJ COIN</h2>
          </div>
          {/* <div className="footerLeft">
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
          </div> */}
          <div className="footerCopyright">
            SWARAJ COIN ©2022 All Rights Reserved
          </div>
          <div id="contactUs" className="footerSocial">
            <a rel="noreferrer" target="_blank" href="https://t.me/swarajcoin">
              <img
                rel="noreferrer"
                src={telegram}
                className="socialIcons"
                alt="telegram"
              />
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.facebook.com/swarajcoin"
            >
              <img src={facebook} className="socialIcons" alt="facebook" />
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/swarajcoinofficial/"
            >
              <img src={instagram} className="socialIcons" alt="instagram" />
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://twitter.com/swarajcoin"
            >
              <img src={twitter} className="socialIcons" alt="twitter" />
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://linktr.ee/swarajcoinofficial"
            >
              <img src={linktree} className="socialIcons" alt="linktree" />
            </a>
          </div>
          <div className="footerTerms">
            {/* <div className="leftCol">Terms&conditions</div>
            <div className="rightCol">Privacy Policy</div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
