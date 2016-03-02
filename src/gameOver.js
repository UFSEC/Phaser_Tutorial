var gameOverState = function(game) {

  var hiScore = 0;
  var score = 0;

  var init = function(newScore){ //this takes in the score if you noice in gmaeState.js we pass it in, and then sets the variables
    score = newScore;
    if(score > hiScore){
      hiScore = score;
    }
  }

  var preload = function() {
    game.load.image('play_button', 'assets/play_button.png'); //load button image
  }

  var create = function() {
    var scoreText = game.add.text( //create a phaser text object to display score
    this.world.centerX,
    170,
    "",
    {
        size: "32px",
        fill: "#FFF",
        align: "center"
    });
    scoreText.setText("Score: " + score);

    var hiScoreText = game.add.text(
    this.world.centerX,
    200,
    "",
    {
        size: "32px",
        fill: "#FFF",
        align: "center"
    });
    hiScoreText.setText("Hi-Score: " + hiScore);
    hiScoreText.anchor.setTo(0.5,0.5);
    scoreText.anchor.setTo(0.5,0.5);

    var playButton = this.game.add.button(400,240,"play_button",buttonClicked,this);
      playButton.anchor.setTo(0.5,0.5);
  }

  var buttonClicked = function() { //this is the button's callback, its called when the button is pressed
    console.log("i clicked this button");
    game.state.start("GameState", true, true);
  }

  return {
    init: init,
    preload: preload,
    create: create
  };
}
