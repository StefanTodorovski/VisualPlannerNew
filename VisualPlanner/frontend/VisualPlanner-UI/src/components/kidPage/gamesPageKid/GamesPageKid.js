import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import './GamesPageKid.css';

// Import your GIFs here
import basketball from "../../../assets/basketball.gif";
import foot from "../../../assets/foot.gif";
import motocross from "../../../assets/motocross.gif";
import thief from "../../../assets/thief.gif";
import girl from "../../../assets/girl.gif";
import girlhair from "../../../assets/girlhair.gif";
import kitty from "../../../assets/kitty.gif";
import couple from "../../../assets/couple.gif";

const games = [
  { id: 1, name: 'Игра 1', imageUrl: basketball, link: 'https://www.friv.com/z/games/basketchamps/game.html' },
  { id: 2, name: 'Игра 2', imageUrl: foot, link: 'https://www.friv.com/z/games/penaltychallenge/game.html' },
  { id: 3, name: 'Игра 3', imageUrl: motocross, link: 'https://www.friv.com/z/games/motox3mwinter/game.html' },
  { id: 4, name: 'Игра 4', imageUrl: thief, link: 'https://www.friv.com/z/games/bobtherobber/game.html' },
  { id: 5, name: 'Игра 5', imageUrl: girl, link: 'https://www.friv.com/z/games/celebritytrendypromlook/game.html' },
  { id: 6, name: 'Игра 6', imageUrl: girlhair, link: 'https://www.friv.com/z/games/graduationhairstyles/game.html' },
  { id: 7, name: 'Игра 7', imageUrl: kitty, link: 'https://www.friv.com/z/games/dochoneyberrykittysurgery/game.html' },
  { id: 8, name: 'Игра 8', imageUrl: couple, link: 'https://www.friv.com/z/games/myromanticvalentinestories/game.html'} 
];

const GamesPageKid = () => {
  return (
    <div className="games-page">
      <div className="games-container">
        {games.map(game => (
          <div className="game-card" key={game.id}>
            <a href={game.link} target="_blank" rel="noopener noreferrer">
              <img src={game.imageUrl} alt={game.name} className="game-image" />
            </a>
          </div>
        ))}
      </div>
      <Link to="/home-page-kid" className="back-button">
        <MdArrowBack className="back-icon" />
      </Link>
    </div>
  );
};

export default GamesPageKid;
