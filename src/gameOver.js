var gameOverState = function(game) {

  var buttonClicked = function() {
    console.log("i clicked this button");
    game.state.start("GameState", true, true);
  }
  var preload = function() {
    game.load.image('play_button', 'assets/play_button.png');
  }

  var create = function() {
    var playButton = this.game.add.button(400, 240, 'play_button', buttonClicked, this);
    playButton.anchor.setTo(0.5, 0.5);
  }

  return {
    preload: preload,
    create: create
  };
}
