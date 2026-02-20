CTIS 255 Frontend Web Technologies Fall 2025 Project Files

HTML, CSS, JavaScript, and DOM API are used.

Game features:

The game begins with a mandatory cover page that displays the project members. When the user clicks anywhere on the screen, a countdown from 3 to 1 is shown. After the countdown finishes, the game platform becomes visible.
At the top of the game screen, display the following: (High Score, Current Score, Timer)
The timer counts down from 10 to 0, decreasing every 1 second.
At the start of the game, three black tiles appear at random positions within a 4×4 grid. The user must click one of these tiles.
Scoring
    The score awarded depends on how quickly the user clicks a black tile. After a black tile appears, a point counter begins at 10 and decreases down to 0 in steps of 1, every 100 ms. This value is also shown visually with a shrinking point bar at the bottom of the screen.
  When the user clicks a black tile:
    • The awarded point (e.g. “+5”) is displayed directly on that tile.
    • The tile briefly turns green, then fades back to white.
    • The displayed point fades out as well.
High Score
  The high score must be stored using localStorage to persist across sessions.
  When the 10-second timer reaches 0:
    • If the user’s final score is higher than the stored high score, display:
      o A confetti effect (using the library at https://github.com/catdad/canvas-confetti)
      o A “New High Score” message
    • Otherwise, display “Time is up”.
  In both cases, show an animated message at the bottom saying: “Press F5 to play again.”
