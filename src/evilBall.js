var evilBallController = function(sprite){
  // evilBall.prototype = function(sprite){
  //
  // };

  var update = function(){

    if (sprite.x > 800){
      sprite.x = 0;
    }
    if (sprite.x < 0){
      sprite.x = 800;
    }
    if(sprite.y > 480){
      sprite.y = 0;
    }
    if(sprite.y <0){
      sprite.y = 480;
    }
  };

  var changeDirection = function(){
    var xVelocity = Math.random() * 200;
    if(xVelocity > 100){xVelocity -= 101;}
    var yVelocity = Math.random() * 200;
    if(yVelocity > 100){yVelocity -= 101;}
    sprite.body.velocity.x = xVelocity;
    sprite.body.velocity.y = yVelocity;
  };
  return {
    update: update,
    changeDirection: changeDirection
  };
};
