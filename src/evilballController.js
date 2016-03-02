var evilBallController = function(sprite) {

  var update = function() {
    if (sprite.x > 800) {
      sprite.x = 0;
    }
    if (sprite.x < 0) {
      sprite.x = 800;
    }
    if (sprite.y > 480) {
      sprite.y = 0;
    }
    if (sprite.y < 0) {
      sprite.y = 480;
    }
  }
  var changeDirection = function() {
    var xVelocity = Math.random() * 300;
    if (xVelocity > 150) {
      xVelocity -= 301;
    }
    var yVelocity = Math.random() * 300;
    if (yVelocity > 150) {
      yVelocity -= 301;
    }
    ;

    sprite.body.velocity.x = xVelocity;
    sprite.body.velocity.y = yVelocity;
  }

  return {
    update: update,
    changeDirection: changeDirection
  }

}
