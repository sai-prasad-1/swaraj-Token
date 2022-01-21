import logo from "./assets/icons/swaraj.png";
import telegram from "./assets/social-media-icons/telegram.svg";
import instagram from "./assets/social-media-icons/instagram.svg";
import facebook from "./assets/social-media-icons/facebook.svg";
import twitter from "./assets/social-media-icons/twitter.svg";
import whatsapp from "./assets/social-media-icons/whatsapp.svg";
import { Link } from 'react-router-dom';
import "./Prologue.css";
export function Prologue() {
  return (
    <div className="Prologue">
      <div>
      <Link to='/'>
        <img className="TopLogo" src={logo} alt="Logo"/>
      </Link>
      </div>
      <div className="PrologueContent">
        <h1>Prologue</h1>
        <p>
          I stood there on the battlefield, unable to process what I was seeing.
          So many Humans lay dead, enemies mingled with friends. I could see
          Elves and a few Trolls; but I had eyes only for the mangled corpses of
          my companions. I hunched my shoulders and looked at the ground. I
          didn’t want to fight anymore. My eyes burned as I looked out over the
          scarred battlefield. I glanced down at myself, startled to see I was
          covered in blood; I didn’t feel hurt. With that thought, I jolted
          awake. I'd had this dream before, many times. Each time the details
          changed, but the ending was always the same. Everyone was dead. The
          battlefield was strewn with corpses, fallen drones, broken tanks,
          residual magic. Death was the only constant. I got out of bed and had
          a drink before sitting at my desk. I glanced at my scarred hands,
          conjuring a flame before smothering it. Magic. All it had been was a
          curse, a way for everyone to kill each other more efficiently. Toying
          with a Writer2.1 I turned it over in my hands, peering at the buttons.
          I reflected on the situation and began to record my thoughts.
        </p>
        <p>
          {" "}
          For the last century or so, I had been delving into magic. I was far
          older than I looked, thanks to it. Magic is quite rare here on Earth
          and practitioners of the art kept to themselves mostly, or in small
          enclaves and covens. We knew about the Vampires, of course, and
          interacted with them more often than your average Human, but even
          their magic has limits as well. But the Elves now, that brought things
          to a whole new level. At the beginning of this cursed war, it seemed
          like we Humans had the most advanced technology by centuries, and by
          some definitions we do, but their magic makes up for it. We may have
          AI driven tanks, drones, and energy weapons, but they have tremendous
          destructive power, and I am just scratching the surface in
          understanding what they are capable of. Still, going back to those
          limits we seemed to have before the Elven people showed up; I pushed
          those limits more and more in my lust for power and knowledge. I was
          determined to become more powerful than anyone had ever been, to know
          all there was to know about magic and, largely, I have succeeded. But
          this has come with a cost. Nothing in this world, or any other is
          truly free. And that brings us back to those damned prideful Elves and
          this fucking war.
        </p>
        <p>
          {" "}
          I paused the recording for a moment, running a hand through my hair
          and sighing. Making this record wasn’t enough, though I was determined
          to record everything; someone had to know the truth. But I had to do
          more, didn’t I? I had to fix this-maybe I am the only one who can. I
          glanced at the device, a spark of hope burning in my heart. There had
          to be others who felt the same. I had already started putting out
          feelers, searching; there might even be someone who can get me an
          audience with the Elves. But that was tomorrow; I could do nothing
          more now but record. Playing back what I had just dictated, I toyed
          with the buttons, considering all that had happened. I’ve already
          recorded my long journey through magic, and all that I have learned
          and discovered; but I had never really explained this war.{" "}
        </p>
        <p>
          {" "}
          Some years ago, amid our own ongoing problems, a crisis of unforeseen
          magnitude arrived in our world. Driven away from their home by their
          own magical calamity, the Elves and their peoples invaded our world
          instead. They seized control of a huge landmass and refused all the
          feeble attempts at diplomacy, defending to the death their new home.
          They intend on controlling this “new world” the way they did theirs.
          We retaliated, of course, trying to regain the land that they stole
          from us. As powerful as I was, I felt I could not sit back and do
          nothing. I tried to reason with both sides. Even used threats. I
          warned them of my premonitions. Nothing worked. Politicians and
          leaders on both sides were determined to use this conflict for their
          own agendas. No one could prevent war. A vivid dream came to me many
          times now, and I am convinced the threat is real. There is something
          worse coming, much worse. If we do not stop this pointless fighting,
          if we do not unite and learn to live in peace, not a single one of us
          will survive this threat. Humans, Elves, Trolls, Fairies, we will all
          be wiped out.
        </p>
        <p>
          {" "}
          I put down the Writer2.1 with a frustrated sigh. This wasn't the
          entire story, not by far, but there was no time for that now; I needed
          to get a little rest-I had places to be early. I was supposed to meet
          with my contact and make my way to see the Elves. She had better show
          up after all that I’ve been through. I sowed the start of the growing
          resistance against this war and was determined to see it through, and
          to find any others who felt the same. They had to, or all was lost.
        </p>
      </div>
      <footer style={{minHeight:"50px", height:"70px"}}>
        {/* Footer */}
        <div className="footerGrid" style={{minHeight:"50px", height:"70px"}}>
          {/* <div className="footerLogo">
            <img src={logo} className="logo" alt="logo" />
            <h2>SWARAJ COIN</h2>
          </div> */}
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

export default Prologue;
