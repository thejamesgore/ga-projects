# GA Project One - JavaScript Game: Space Shooter

Table of Contents:

- Project Overview
- The Brief
- Technologies Used
- Approach Taken & Timeline
- Featured Code
- Bugs
- Wins and Challenges
- Future Content and Improvements
- Key Learnings

## Project Overview

---

Space Shooter is a side scrolling shooting game inspired by the classic arcade games R-Type and Gradius. The objective is to reach the end of the game without taking any damage while trying to achieve the highest score by shooting enemy ships.

This was the first project from General Assembly's Software Engineering Immersive course. It was an individual project built in 7 days using vanilla JavaScript.

Live version:
https://thejamesgore.github.io/ga-projects/GA-Project-1/index.html

![](https://user-images.githubusercontent.com/83005220/145941210-ea7bd714-356f-4f83-9721-1352a3e0309d.png)

## The Brief

---

- Build a game using Vanilla JavaScript
- Render a game in the browser
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Use JavaScript for DOM manipulation
- Deploy the game online
- Use semantic markup for HTML and CSS

## Technologies Used

---

- HTML5 with HTML5 audio
- CSS3 with animation
- JavaScript (ES6)
- Google fonts
- Git
- GitHub

## Approach Taken & Timeline

---

Key Dates:

- Day 1 - Planning
- Day 5 - 6 - Hit MVP
- Day 6 - 7 - Add final features

### Day 1:

I spent the first day brainstorming ideas and looking for interesting elements to make it an enjoyable game. I settled on a space shooter canvas based game which was challenging and posed quite a few problems to solve. This approach made the project much more of a stretch goal to allow me to learn the most and push my development.

I segmented the project into an attainable timeline organised into manageable milestones ensuring I'd reach the MVP ahead of project deadline. I then listed additional features that would be nice to have and sorted them based on how much they would enhance the game.

### Day 2-4:

For the MVP I decided that the player must be able:

- to control the ship in all directions
- fire at enemies
- have projectiles destroy enemies on screen
- have the score increase each time this happens
- have a game over screen appear when the ship crashes into an enemy
- have enemies spawn from right to left

To ensure dry code all interactive onscreen elements (such as player ship, enemy ships, and projectiles) had their own class and were added or removed from an array for their class if they were spawned or destroyed.

By day 3 some initial aspects of the game were functional and a design concept to enhance realism was achieved by altering the ship sprite based on keystroke to give the illusion of travel.

The next challenge was hit detection. This was performed by understanding the x and y coordinates of objects on screen and having a game event trigger when these dimensions on the canvas intersected. As well as this, creating different enemy paths on the screen based on enemy type and wave was implemented by utilizing some simple math to enable paths similar to a Sine wave or an ever expanding circle.

### Day 5-6:

By this point a basic game had been created with a score feature, game over screen, ability to restart, and multiple basic enemy waves with differing paths. I turned my attention to making the game more interesting and fun to play adding different sprites for enemy ships, layered sprites with planets and space debris in the foreground and background, scrolling at varying speeds based on their position in the layer to convey the illusion of moving through space.

As well as this, I added a single image of stars repeated twice constantly scrolling from right to left to simulate space, further increasing the immersive experience. I also added an explosive animation when objects collided, game sound effects, and music.

The one consideration I had overlooked was scaling difficulty for the user based in a space shooter type game. So day 6 I modified the enemy paths and speed they appeared on screen and test played the game to find the right balance of difficulty so the player wouldn't reach the end game on the first try but would be able to progress further and further with each subsequent try.

### Day 7:

The last day was spent creating an end game for the player spawning a boss type enemy that wouldn't explode immediately when hit by a projectile. This required a life variable for the final enemy, increasing difficulty as the life variable decreased further, and further logic for the behaviour of the final enemy based on the movement of the player.

![](https://user-images.githubusercontent.com/83005220/147377477-a8f343af-6a4a-4bb9-81ca-5b1b56cd2654.gif)

The idea was to track the movement of the boss enemy to the movement of the player so if the player moves upward or downward the boss would also move upward or downward. The boss enemy also fires projectiles at the player ship with an increasing frequency and randomness as life is reduced past certain thresholds, thereby increasing difficulty.

## Featured Code

---

Below you can see the logic that progressively makes the end game more difficult by increasing firing frequency as `boss.health` decreases past certain thresholds. You can also see that the `boss.y` position varies depending where the `ship.y` position is, however with some modifications to ensure it stays on screen.

Finally, you can also see the function that tests for hit detection utilizing a forEach function which also increases the player score, reduction in `boss.health`, and a final animation where the boss will drift downwards off screen when it is defeated.

```JavaScript
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

- If a player rapidly fired and a projectile drifted off screen, subsequent projectiles would pass through enemies. This was due to positioning in the missiles array being sequential and being removed from the array in the order they were added. So if a missile drifted off screen and a new missile collided with an enemy, the missile that drifted off screen would be removed rather the one that collided. A simple solution was to remove any missile from the missile array that drifted off screen.

## Wins & Challenges

---

- Hit detection was challenging as the dimensions of the sprites used didn't match their visible pixels on screen. This meant it would seem objects were colliding earlier than they should be. The original method of hit detection used the coordinates of each object to determine surface area. When surface areas overlapped this would confirm a positive hit. This only works if objeects are squares and rectangles. As most objects were of an odd shape hit detection was changed to calculate the distance from the center to an approximate of the perimiter of the visible pixels on screen.

- A big win was overdelivering on my first project. Having a completely functional game, with a fun ending, expanding my understanding of JavaScript, finding successful approaches to unexpected challening problems, and forcing me out of my comfort zone meant I was able to produce work I can be proud of.

## Future Content & Improvements:

- Fun styling for non in game elements
- Different weapon types for the player
- Different levels
- Two player mode
- Refactor code to by more DRY

## Key learnings

Using Classes are extremely useful as they are perfect templates for JavaScript Objects that will need to be repeatedly created. This allows one to create non repetitve code as well as have an easy to modify template if changes need to be made. Both of which will save time during the development process.

I've learned from this project that it's important to allow for time to refactor code as its development progresses and the importance of writing clean code that makes semantic sense.

Working with canvas elements provide a great deal of flexibility and room for creativity too. Ultimately almost anything one could image can be created using the canvas including three dimensional elements. The only down side is as canvas elements become more complex the demands increase for the machine running them.
