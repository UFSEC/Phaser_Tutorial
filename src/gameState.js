var gameState = function(game) {

  var bg;
  var player;
  var cursors;
  var ballControllers = [];
  var timer = 0;
  var score = 0;
  var scoreTimer = 0;
  var scoreText;



  var preload = function() {
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('background', 'assets/background2.png');
    game.load.image('evil_ball', 'assets/evil_ball.png');
  }

  var create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.time.desiredFps = 30;

    bg = game.add.tileSprite(0, 0, 800, 480, 'background');

    player = game.add.sprite(400, 400, 'dude');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);
    player.body.gravity.y = 1000;

    cursors = game.input.keyboard.createCursorKeys();

    evilBalls = game.add.group();
    evilBalls.enableBody = true;
    evilBalls.physicsBodyType = Phaser.Physics.ARCADE;

    for (i = 0; i < 15; ++i) {
      var b = evilBalls.create(game.world.randomX, Math.random() * 280 + 100, 'evil_ball'); //the reason for the y being constrained is so the player doesnt immediately lose
      var controller = new evilBallController(b);
      ballControllers.push(controller);
    }

    /////////////////////added scoring (not in tutorial video)///////////////////////
    scoreText = game.add.text(
    70,
    40,
    "",
    {
        size: "32px",
        fill: "#FFF",
        align: "center"
    });
    scoreText.setText("Score: " + score);
    scoreText.anchor.setTo(0.5,0.5);
    /////////////////////////////////////////////

    resetGame(); //this resets the scores and makes the balls move as soon as this state is created

  }

  var update = function() {
    movePlayer();
    moveBalls();
    updateScore();

    game.physics.arcade.collide(player, evilBalls, hitBall);
  }

  var movePlayer = function() {

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
      player.body.velocity.x = -200;
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 200;
    }

    if (cursors.up.isDown) {
      player.body.velocity.y = -400;
    }
  };

  var moveBalls = function(){
    for (controller in ballControllers) {
      ballControllers[controller].update();
    }

    if (timer < game.time.now) {
      for (controller in ballControllers) {
        ballControllers[controller].changeDirection();
      }
      timer = game.time.now + 4000;
    }
  };

  var hitBall = function() {
    //what happens when the player colldies with a ball
    for (controller in ballControllers) {
      delete ballControllers[controller];
    }
    console.log("boom i hit a ball");

    game.state.start("GameOverState", true, true, score);
  }

  var updateScore = function(){
    if(game.time.now > scoreTimer){
      ++score;
      scoreTimer = game.time.now + 1000;
    }
    scoreText.setText("Score: " + score);
  };

  var resetGame = function(){
    score = 0;
    scoreTimer = 0;
    timer = 0;
    moveBalls();
  }

  return {
    preload: preload,
    create: create,
    update: update
  };
}
