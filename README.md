# Scrabble!

A Scrabble game developed using Python and JQuery UI. The game is designed to be played by one player, who take turns with a CPU to place letter tiles on a game board in order to form words. Each letter tile has a certain point value, and the aim of the game is to score as many points as possible.

The game board is an 11 x 11 grid, with each square on the board representing a letter tile. At the beginning of the game, the player is given a set of seven letter tiles, which they can use to form words on the board. The game also includes a dictionary, which is used to check whether the words formed by the players are valid.

The game is played using a web-based interface, which has been developed using JQuery UI. The interface allows players to drag and drop letter tiles onto the game board, and also features a score board.

## Features

- Interactive wood tiles and an 11x11 grid with plenty of room to maneuever
- Fast-and-fair word validation so you can only play words in the game dictionary
- Sleek minimalist scoreboard to keep track of how you're doing
- CPU set to expert difficulty, because its way more fun that way

## Tech-Stack

- Realm Mobile Database and Swift NSUserDefaults for post archiving
- Facebook SDK, Twitter Kit, and Instagram API to fetch user information
- Swift/Objective-C front-end with CocoaPods Dependency Manager
- AlamoFire, SwiftyJSON, and Facebook Graph API to fetch profile content

## Task List

- [x] Fully Interactive letter tiles with drag-and-drop functionality, with one letter for each board slot
- [x] Word Validation checks, every word gets ran against a dictionary to make sure its legit
- [x] Python Endpoints to generate new game elements on demand and execute game actions
- [ ] Animations on every action (drag, drop, submit, reset, score change, cpu turn)
- [ ] CPU Turn, always give the CPU the best possible hand, based on the current pool of active letters
- [ ] Super Accurate Letter Generation, so you always have a decent chance of putting out at least one word
- [ ] Session Variables to store active words, active hand, and active score

## Next Version

- [ ] Main Menu screen and option to pull it up
- [ ] Login/Logout, Score History, and Board Customization options (color schemes)
- [ ] "Online" Two Player Mode
- [ ] World Leaderboard for all players
- [ ] Make the whole board responsive so it can be embedded into a bigger website

## Acknowledgements

- Master Dictionary File: https://github.com/dwyl/english-words
