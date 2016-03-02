var game = new Phaser.Game(800, 480, Phaser.AUTO);

//start the game
game.state.add("GameState", gameState);
//game over state
game.state.add("GameOverScreen", gameOverState);
//start the game
game.state.start("GameState");
