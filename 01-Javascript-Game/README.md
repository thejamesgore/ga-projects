# Project One - Space Shooter

Table of Contents:

- Project Overview
- The Brief
- Technologies Used
- Approach Taken & Timeline
- Featured Code
- Screenshots
- Bugs
- Wins and Challenges
- Future Content and Improvements
- Key Learnings

## Project Overview

---

Space shooter is a sidescrolling shooting game inspired by the classic R-Type and Gradius where the objective is to reach the end of the game without taking any damage while trying to achieve the highest score.

This was the my first project from General Assembly's Software Engineering Immersive course. It was an individual project built in 7 days, and my first real-world practice with JavaScript beyond solving small simple puzzles.

Live version
https://thejamesgore.github.io/ga-projects/01-Javascript-Game/index.html

![](https://user-images.githubusercontent.com/83005220/145941210-ea7bd714-356f-4f83-9721-1352a3e0309d.png)

## The Brief

---

- Build a game using Vanilla Javascript
- Render a game in the browser
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Use Javascript for DOM manipulation
- Deploy the game online
- Use semantic markup for HTML and CSS

## Technologies Used

---

- HTML5 with HTML5 audio
- CSS3 with animation
- JavaScript (ES6)
- Git
- GitHub

## Approach Taken & Timeline

---

Key Dates:

- Day 1 - Planning
- Day 5 - 6 - Hit MVP
- Day 6 - 7 - Add final features

### Day 1:

I spent the first day brainstorming any ideas for a game being drawn to what would take my interest the most which game down to two options. I settled on a space shooter canvas based game as although it seemed it would be extremely challenging with quite a few problems to solve it would likely be much more of a stretch goal it would allow me to learn the most and push my development.

I broke down the project into a reasonable timeline with a plan with manageable chunks. I created a list of features that the game must have in order to satisfy the brief but also be an enjoyable game to play at the bare mininum thus creating the MVP. I then listed additional features that would be nice to have and sorted them based on how much they would enhance the game.

### Day 2-4:

For the MVP I decided that the player must be able to control the ship in all directions, fire at enemies, have the projectiles destroy enemies on screen, have the score increase each time this happens, have a game over screen appear when the ship crashes into an enemy, and have enemies spawn from right to left.

To ensure dry code avoiding uneccessary reptition all objects in the game that could interact with each other such as player ship, enemy ships, and projectiles had their own class and were either added or removed from an array specifically for that object type based on game conditions like an enemy spawning or being destroyed.

By day 3 the player ship would spawn, move on screen and fire projectiles at enemies that would spawn from the right side of the screen and move to the left. The next challenge was hit detection when enemies hit the player ship or when projectiles hit enemies. This was performed by understanding the dimensions of objects on screen and having a game event trigger when these dimensions on the canvas crossed. As well as this creating different enemy movements on screen based on enemy type and wave was implemented some of which utilizing some simple math to enable paths similar to a Sine wave or ever expanding circle.

### Day 5-6:

By this point a basic game had been created with a score feature, game over screen, ability to restart, and multiple basic enemy waves with differing paths. I turned my attention to making the game more interesting and fun to play adding different sprites for enemy ships, layered sprites with planets and space debris in the foreground and background scrolling at varying speeds based on their position in the layer to convey the illusion of moving through space. As well as this I added a single image of stars repeated twice constantly scrolling from right to left to simulate stars further increasing the immersive experience. I also added an explosive animation when objects collided, game sound effects, and music.

The one consideration I had overlooked was scaling difficulty for the user based in a space shooter type game. So day 6 I modified the enemy paths and speed they appeared on screen and test played the game to find the right balance of difficulty so they player wouldn't reach the end game on the first try but would be able to progress further and further with each subsequent try.

### Day 7:

The last day was spent creating an end game for the player spawning a boss type enemy that wouldn't explode immediately when hit by a projectile and presenting the game. This required a life variable for the final enemy, increasing difficulty as the life variable decreased further and further, logic for the behaviour of the final enemy based on the movement of the player, and an end game screen.

The idea was to track the boss movement of the boss enemy to the movement of the player so if the player moves upward or downward the boss would also move upward or downward. The boss enemy also fires projectiles at the player ship with increasing frequency and randomness as life is reduced past certain thresholds increasing difficulty.

## Featured Code

---

Below you can see the logic that progressively makes the end game more difficult by increasing firing frequency as boss.health decreases past certain thresholds. You can also see that the boss.y position of the boss varies depending where the ship.y position is however with some modifications to ensure it stays on screen. Finally you can also see the function that tests for hit detection of the boss by player missles utilizing a forEach function which also has included an increase to the player score, reduction in boss.health, and a final animation where the boss will drift downwards offscreen when it is defeated.

```
// Boss firing frequency based on current frame & how much health the boss has left

    if (boss.x === 495 && frame % 100 === 0) {
      bossMissiles.push(new BossMissile(boss.x, boss.y + 35, -6));
    }
    if (boss.x === 495 && frame % 70 === 0 && boss.health < 1250) {
      bossMissiles.push(new BossMissile(boss.x, boss.y + 35, -6));
    }
    if (boss.x === 495 && frame % 30 === 0 && boss.health < 800) {
      bossMissiles.push(new BossMissile(boss.x, boss.y + 35, -6));
    }

// boss movement based on where player is in space

    if (boss.x === 495) {
      if (boss.y < 0) {
        boss.y = 0;
      }
      boss.y += (ship.y - (boss.y + boss.height / 5)) * 0.075;
    }

// hit detection when missile hits boss

    missiles.forEach((missile) => {
      if (
        missile.x > boss.x + bossShipWidth / 2 &&
        missile.y > boss.y &&
        missile.y < boss.y + bossShipHeight - 10
      ) {
        context.drawImage(explosionImg, boss.x + bossShipWidth / 2, missile.y);
        missile.sound2.play();
        missiles.shift();
        if (boss.x === 495) {
          score += 10;
          boss.health -= 25;
          console.log(boss.health);
        }
        if (boss.health < 0) {
          endGameOver = true;
          boss.vx -= 4;
          boss.vy += 4.5;
          context.drawImage(explosion2Img, missile.x, missile.y);
        }
      }
    });
```

## Bugs

---

- Currently hit detection is not ideal as the image sprites are not perfect quadrilaterals so occasionally depending on where the enemy and projectile is in space will mean the enemy will explode when infact on screen hasn't yet collided with anything just yet. To compensate for this hit detection was modified to be slightly more liberal.

- When rapidly firing projectiles subsequent projectiles would pass through enemies if one had drifted off screen. This was due to positioning in the missiles array being sequential but also being removed sequentially so if a missile drifted off screen and a new missile collided with an enemy the missile that drifted off screen would be removed rather the one that collided. A simple solution was to remove any missle from the missle array that drifted off screen.

- Firing projectiles immediately when the game starts launches them in front of the planet that the player ship spawns behind. This is a layering issue and was only discovered once presenting the game on day 7 and is relatively simple to solve.

## Wins & Challenges

---

- The biggest challenges were understanding how to solve hit detection and still is yet to be solved perfectly without creating extremely reptitious code with custom hit detection based on the demensions of each type of enemy sprite.

- A big win was not only successfully completing the project but overdelivering having a completely functional game with fun ending, pushing my understanding of JavaScript to the limit with many hours of not knowing how to solve multiple problems but find a successful approach, forcing me out of my comfort zone, and producing work I can be proud of.

## Future Content & Improvements:

- Fun styling for non in game elements
- Different weapon types for the player
- Different levels
- Two player mode
- Refactor code to by more DRY

## Key learnings

I've learned from this project that I need to allow time in the project to refactor code as the project progresses. At the time I aimed to write understandable, clean code that made semantic sense, however there are sections in this project where I didn't have time to refactor at all prioritising working code ready for presentation.
