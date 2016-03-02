var gameState = function(game) {

  //variables
  var bg;
  var player;
  var cursors;
  var ballControllers = [];
  var timer = 0;
  var score = 0;
  var scoreTimer = 0;
  var scoreText;



  var preload = function() { //load in image assets
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('background', 'assets/background2.png');
    game.load.image('evil_ball', 'assets/evil_ball.png');
  }

  var create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE); //we will use arcade physics the simplest

    game.time.desiredFps = 30;//how many times per second update is called

    bg = game.add.tileSprite(0, 0, 800, 480, 'background'); //just adds the background, tilesprite will make it repeat

    player = game.add.sprite(400, 400, 'dude'); //add new player
    game.physics.enable(player, Phaser.Physics.ARCADE); //add the player to the arcade physics system

    player.body.collideWorldBounds = true; //player will collide with the sides of the screen
    player.body.setSize(20, 32, 5, 16); //set hitbox of player
    player.body.gravity.y = 1000; //give teh player gravity

    cursors = game.input.keyboard.createCursorKeys();

    evilBalls = game.add.group();// creates a phaser group for collision detection and other reasons
    evilBalls.enableBody = true; //allows balls to collide
    evilBalls.physicsBodyType = Phaser.Physics.ARCADE; //specify that balls use the arcade physics system

    //this creates enemies and assign controllers to them
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

  var update = function() { //this is called automatically by phaser many times a second, we place methods in here that need to be continuously called
    movePlayer();
    moveBalls();
    updateScore();

    game.physics.arcade.collide(player, evilBalls, hitBall);
  }

  var movePlayer = function() { //this handles the various player movements

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

  var hitBall = function() { //this is whats called when the player collides w/ a ball, it launches the game over state and sends that state the score
    for (controller in ballControllers) {
      delete ballControllers[controller];
    }
    console.log("boom i hit a ball");

    game.state.start("GameOverState", true, true, score);
  }

  var updateScore = function(){ //this icrements the score each second you stay alive
    if(game.time.now > scoreTimer){
      ++score;
      scoreTimer = game.time.now + 1000;
    }
    scoreText.setText("Score: " + score);
  };

  var resetGame = function(){  //resets game to starting state pretty much
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
