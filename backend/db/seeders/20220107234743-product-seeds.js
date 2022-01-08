'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      { userId: 1, title: "King of Tokyo", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641599988/products/King-Of-Tokyo_wnn916.jpg", description: "In King of Tokyo, you play mutant monsters, gigantic robots, and strange aliens—all of whom are destroying Tokyo and whacking each other in order to become the one and only King of Tokyo."},
      { userId: 1, title: "Coup", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641600078/products/81IMCDOlP0L._AC_SL1500__k3kuih.jpg", description: "You are head of a family in an Italian city-state, a city run by a weak and corrupt court. You need to manipulate, bluff and bribe your way to power. Your object is to destroy the influence of all the other families, forcing them into exile. Only one family will survive...  In Coup, you want to be the last player with influence in the game, with influence being represented by face-down character cards in your playing area." },
      { userId: 1, title: "Codenames", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641600115/products/pic2582929_iekxba.jpg", description: "Codenames is a fun and challenging social word game with a simple premise. Two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their CODENAMES. Teams compete to contact all of their agents first.  Spymasters give one-word clues that can point to multiple words on the board. Their teammates try to guess words of the right color while avoiding those that belong to the opposing team. Everyone wants to avoid the assassin."},
      { userId: 2, title: "Betrayal at House on the Hill", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641600448/products/81_pgZf_7PL._AC_SL1500__zqbr3d.jpg", description: "Betrayal at House on the Hill quickly builds suspense and excitement as players explore a haunted mansion of their own design, encountering spirits and frightening omens that foretell their fate. With an estimated one hour playing time, Betrayal at House on the Hill is ideal for parties, family gatherings or casual fun with friends.  Betrayal at House on the Hill is a tile game that allows players to build their own haunted house room by room, tile by tile, creating a new thrilling game board every time. The game is designed for three to six people, each of whom plays one of six possible characters. Secretly, one of the characters betrays the rest of the party, and the innocent members of the party must defeat the traitor in their midst before it’s too late! Betrayal at House on the Hill will appeal to any game player who enjoys a fun, suspenseful, and strategic game." },
      { userId: 2, title: "Gloomhaven", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641600522/products/pic2437871_ocj41g.jpg", description: "Gloomhaven is a game of Euro-inspired tactical combat in a persistent world of shifting motives. Players will take on the role of a wandering adventurer with their own special set of skills and their own reasons for traveling to this dark corner of the world. Players must work together out of necessity to clear out menacing dungeons and forgotten ruins. In the process, they will enhance their abilities with experience and loot, discover new locations to explore and plunder, and expand an ever-branching story fueled by the decisions they make.  This is a game with a persistent and changing world that is ideally played over many game sessions. After a scenario, players will make decisions on what to do, which will determine how the story continues, kind of like a “Choose Your Own Adventure” book. Playing through a scenario is a cooperative affair where players will fight against automated monsters using an innovative card system to determine the order of play and what a player does on their turn."},
      { userId: 2, title: "Sushi Go!", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641600619/products/pic5885690_mbkwsg.jpg", description: "In the super-fast sushi card game Sushi Go!, you are eating at a sushi restaurant and trying to grab the best combination of sushi dishes as they whiz by. Score points for collecting the most sushi rolls or making a full set of sashimi. Dip your favorite nigiri in wasabi to triple its value! And once you've eaten it all, finish your meal with all the pudding you've got! But be careful which sushi you allow your friends to take; it might be just what they need to beat you!"},
      { userId: 1, title: "Here to Slay", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641600255/products/pic5181432_yekm0b.jpg", description: "Here to Slay is a competitive role-playing fantasy strategy card game that's all about assembling a party of Heroes and slaying monsters (and sometimes sabotaging your friends too) from the creators of Unstable Unicorns.  In this game, you’ll assemble a full party of heroes to slay dangerous monsters while working to avoid the sabotage of your foes. The game also includes items you can equip to your heroes, 1V1 challenge cards, and roll modifiers to tip the odds in your favor.  The first person to successfully slay three monsters, or build a full party with six classes, wins the game!"},
      { userId: 3, title: "Unstable Unicorns", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641600703/products/productimg_qcuhrw.jpg", description: "Build a Unicorn Army. Betray your friends. Unicorns are your friends now.  Unstable Unicorns is a strategic card game about everyone’s two favorite things: Destruction and Unicorns!  Learn how unstable your friendships really are."},
      { userId: 3, title: "Exploding Kittens", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641600768/products/pic2691976_m1mng1.png", description: "Exploding Kittens is a kitty-powered version of Russian Roulette. Players take turns drawing cards until someone draws an exploding kitten and loses the game. The deck is made up of cards that let you avoid exploding by peeking at cards before you draw, forcing your opponent to draw multiple cards, or shuffling the deck.  The game gets more and more intense with each card you draw because fewer cards left in the deck means a greater chance of drawing the kitten and exploding in a fiery ball of feline hyperbole."},
      { userId: 3, title: "Terraforming Mars", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641600822/products/pic3536616_y3r64w.jpg", description: "In the 2400s, mankind begins to terraform the planet Mars. Giant corporations, sponsored by the World Government on Earth, initiate huge projects to raise the temperature, the oxygen level, and the ocean coverage until the environment is habitable. In Terraforming Mars, you play one of those corporations and work together in the terraforming process, but compete for getting victory points that are awarded not only for your contribution to the terraforming, but also for advancing human infrastructure throughout the solar system, and doing other commendable things."},
      { userId: 3, title: "Azul", imageSrc: "https://res.cloudinary.com/tabletopquest/image/upload/v1641600863/products/pic3718275_fgri5o.jpg", description: "Introduced by the Moors, azulejos (originally white and blue ceramic tiles) were fully embraced by the Portuguese when their king Manuel I, on a visit to the Alhambra palace in Southern Spain, was mesmerized by the stunning beauty of the Moorish decorative tiles. The king, awestruck by the interior beauty of the Alhambra, immediately ordered that his own palace in Portugal be decorated with similar wall tiles. As a tile-laying artist, you have been challenged to embellish the walls of the Royal Palace of Evora.  In the game Azul, players take turns drafting colored tiles from suppliers to their player board. Later in the round, players score points based on how they've placed their tiles to decorate the palace. Extra points are scored for specific patterns and completing sets; wasted supplies harm the player's score. The player with the most points at the end of the game wins."},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
