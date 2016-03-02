var gameOverState = function(game){

  var hiScore = 0;
  var score = 0;
  var playTheGame = function(){
  		this.game.state.start("GameState", true, true);
  	}

  var init = function(newScore){
    console.log(newScore);
    score = newScore;
    if(score > hiScore){
      hiScore = score;
    }
  }
  var preload = function(newScore){
    game.load.image('play_button', 'assets/play_button.png');

  }
  var create = function(){

    var scoreText = game.add.text(
    this.world.centerX,
    this.world.height/5,
    "",
    {
        size: "32px",
        fill: "#FFF",
        align: "center"
    });
    scoreText.setText("Score: " + score);

    var hiScoreText = game.add.text(
    this.world.centerX,
    this.world.height/7,
    "",
    {
        size: "32px",
        fill: "#FFF",
        align: "center"
    });
    hiScoreText.setText("Hi-Score: " + hiScore);
    hiScoreText.anchor.setTo(0.5,0.5);
    scoreText.anchor.setTo(0.5,0.5);

    var playButton = this.game.add.button(400,240,"play_button",playTheGame,this);
      playButton.anchor.setTo(0.5,0.5);
  }

  var render = function () {

      // game.debug.text("Score: " + score, 360, 210);
      // game.debug.text("Hi-Score: " + hiScore, 360, 190);
  }

  return {
    init: init,
    preload: preload,
    create: create,
    render: render
  };
};
