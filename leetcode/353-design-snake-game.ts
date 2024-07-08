// https://leetcode.com/problems/design-snake-game
// Design a Snake game that is played on a device with screen size height x width. Play the game online if you are not familiar with the game.

// The snake is initially positioned at the top left corner (0, 0) with a length of 1 unit.

// You are given an array food where food[i] = (ri, ci) is the row and column position of a piece of food that the snake can eat. When a snake eats a piece of food, its length and the game's score both increase by 1.

// Each piece of food appears one by one on the screen, meaning the second piece of food will not appear until the snake eats the first piece of food.

// When a piece of food appears on the screen, it is guaranteed that it will not appear on a block occupied by the snake.

// The game is over if the snake goes out of bounds (hits a wall) or if its head occupies a space that its body occupies after moving (i.e. a snake of length 4 cannot run into itself).

// Implement the SnakeGame class:

// SnakeGame(int width, int height, int[][] food) Initializes the object with a screen of size height x width and the positions of the food.
// int move(String direction) Returns the score of the game after applying one direction move by the snake. If the game is over, return -1.

class SnakeGame {
  snake = [[0, 0]];
  food: number[][];
  x: number;
  y: number;
  constructor(width: number, height: number, food: number[][]) {
    this.food = food;
    this.x = width;
    this.y = height;
  }

  updateSnake(y: number, x: number) {
    // check if out of bounds
    if (y > this.y - 1 || x > this.x - 1 || x < 0 || y < 0) return -1;

    // check if about to eat food, if not remove tail
    if (
      this.food.length > 0 &&
      this.food[0][0] === y &&
      this.food[0][1] === x
    ) {
      this.food.shift();
    } else {
      this.snake.shift();
    }

    // check if about to hit itself
    if (this.snake.find((s) => s[0] === y && s[1] === x)) {
      return -1;
    }

    // update head location
    this.snake.push([y, x]);

    return this.snake.length - 1;
  }

  move(direction: string): number {
    const [y, x] = this.snake[this.snake.length - 1];
    switch (direction) {
      case 'U':
        return this.updateSnake(y - 1, x);
      case 'D':
        return this.updateSnake(y + 1, x);
      case 'L':
        return this.updateSnake(y, x - 1);
      case 'R':
        return this.updateSnake(y, x + 1);
      default:
        throw new Error('Invalid direction');
    }
  }
}

/**
 * Your SnakeGame object will be instantiated and called as such:
 * var obj = new SnakeGame(width, height, food)
 * var param_1 = obj.move(direction)
 */
