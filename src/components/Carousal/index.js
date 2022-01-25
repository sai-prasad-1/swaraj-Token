import FeatureCards2 from "../FeatureCard2";
import entertainment from "../../assets/icons/entertainment.svg";
import monetize from "../../assets/icons/monetize.svg";
import develop from "../../assets/icons/develop.svg";
import gameplay from "../../assets/icons/gameplay.svg";
import explore from "../../assets/icons/explore.svg";
import personalization from "../../assets/icons/personalization.svg";
import { useState } from "react";
function Carousal(props) {
  const [level, setLevel] = useState(1);
  const incrementLevel = () => {
    if (level < 6) setLevel(level + 1);
    else setLevel(1)
  };
  const decrementLevel = () => {
    if (level > 1) setLevel(level - 1);
    else setLevel(6)
  };
  return (
    <div className="FeatureCard2Container">
      <button className="left" onClick={() => decrementLevel()} >⮜</button>
      <button className="right" onClick={() => incrementLevel()}>⮞</button>
      <FeatureCards2
        level={level}
        icon={entertainment}
        title="Entertainment"
        text="Users can host events, social gatherings and network with fellow users bridging the real world and the virtual world."
      ></FeatureCards2>
      <FeatureCards2
        level={level + 1}
        icon={monetize}
        title="Monetize"
        text="Metaverse also provides an extensive array of mediums for advertising and provides opportunities to generate and trade NFTs in the marketplace or hold the NFTs as long-term assets."
      ></FeatureCards2>
      <FeatureCards2
        level={level + 2}
        icon={develop}
        title="Develop"
        text="Users can develop games, make artworks, build their own cities, and dream houses with easy-to-use built-in tools. Furthermore, professionals can used the pro-toolkit to enhance their development."
      ></FeatureCards2>
      <FeatureCards2
        level={level + 3}
        icon={gameplay}
        title="Game Play"
        text="Users can play PvP& P2E games & host game tournaments created by users as well as the games created by the community developers."
      ></FeatureCards2>
      <FeatureCards2
        level={level + 4}
        icon={explore}
        title="Explore"
        text="Discover the vast Metaverse by taking the journey of your lifetime.Get lost in a variety of settings, including jungles, seas, and more as you wander across the world."
      ></FeatureCards2>
      <FeatureCards2
        level={level + 5}
        icon={personalization}
        title="Personalization"
        text="Players can  be whoever they want to be and personalize their avatar and their lands by constructing whatever they envision."
      ></FeatureCards2>
    </div>
  );
}

export default Carousal;
