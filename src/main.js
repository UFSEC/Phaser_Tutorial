var game = new Phaser.Game(800, 480, Phaser.AUTO);

//adding our main game state
game.state.add("GameState", gameState);
game.state.add("GameOverState", gameOverState);

//start main game state
game.state.start("GameState");
