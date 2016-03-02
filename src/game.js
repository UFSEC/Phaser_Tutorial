var gameState = function(game){

  var preload = function() {

      game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
      game.load.image('background', 'assets/background2.png');
      game.load.image('evil_ball', 'assets/evil_ball.png');

  }

  var player;
  var facing = 'left';
  var timer = 0;
  var cursors;
  var jumpButton;
  var bg;
  var evilBallArray = [];
  var score = 0;
  var scoreTimer = 0;
  var scoreText;

  var updateScore = function(){
    if(game.time.now > scoreTimer){
      ++score;
      scoreTimer = game.time.now + 1000;
    }
  };

  var movePlayer = function(){
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -200;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 200;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    if (cursors.up.isDown)
    {
        player.body.velocity.y = -400;
    }

  };

  var moveBalls = function(){
    var changeDirection = false;
    if(game.time.now > timer){
      changeDirection = true;
    }



    for (ball in evilBallArray){
        evilBallArray[ball].update();
        if(changeDirection){
          evilBallArray[ball].changeDirection();
          timer = game.time.now + 4000;
        }
    }
  };

var hitBall = function(){
    console.log("boom");
    for (ball in evilBallArray){
        delete evilBallArray[ball];
      }
    game.state.start("GameOverScreen",true,true, score);

  }


  var create = function() {

      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.time.desiredFps = 30;

      bg = game.add.tileSprite(0, 0, 800, 600, 'background');

      //game.physics.arcade.gravity.y = 1000;

      player = game.add.sprite(400, 400, 'dude');
      game.physics.enable(player, Phaser.Physics.ARCADE);

      player.body.bounce.y = 0.2;
      player.body.collideWorldBounds = true;
      player.body.setSize(20, 32, 5, 16);
      player.body.gravity.y = 1000;

      player.animations.add('left', [0, 1, 2, 3], 10, true);
      player.animations.add('turn', [4], 20, true);
      player.animations.add('right', [5, 6, 7, 8], 10, true);

      cursors = game.input.keyboard.createCursorKeys();
      jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      //make enemies
      evilBalls = game.add.group();
      evilBalls.enableBody = true;
      evilBalls.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0; i < 10; i++)
      {
        var c = evilBalls.create(game.world.randomX, Math.random() * 300 + 100, 'evil_ball');
        var tmp = new evilBallController(c);
        evilBallArray.push(tmp);
      }
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

      score = 0;
      scoreTimer = 0;
      timer = 0;
      moveBalls();

  }



  var update = function() {

    game.physics.arcade.collide(player, evilBalls, hitBall);
    movePlayer();
    moveBalls();
    updateScore();

  }

  var render = function () {

      game.debug.text(score, 32, 32);

      // game.debug.text(game.time.physicsElapsed, 32, 32);
      // game.debug.body(player);
      // game.debug.bodyInfo(player, 16, 24);

  }



  return {
    preload: preload,
    create: create,
    update: update,
    render: render
  };





};
