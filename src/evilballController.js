var evilBallController = function(sprite) {

  var update = function() {
    //all of the below code in this function make the edges of the screen wrap, so that if it goes off the left it will come in the right
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
  var changeDirection = function() { //give the ball its random behaviour that makes the game challenging
    var xVelocity = Math.random() * 300;
    if (xVelocity > 150) {
      xVelocity -= 301;
    }
    var yVelocity = Math.random() * 300;
    if (yVelocity > 150) {
      yVelocity -= 301;
    }
    

    sprite.body.velocity.x = xVelocity;
    sprite.body.velocity.y = yVelocity;
  }

  return {
    update: update,
    changeDirection: changeDirection
  }

}
