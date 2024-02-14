//Alex Leghart
//Game Title: Fruit PUNCH
//Approx Hours: 30+, less than 40

/* Creative Tilt: 
    I made all the sprites for the game other than the fruit that you pick up, as well as all the sound effects.
        I think they're pretty cool and you should give me points for the Striking Visuals and Coherent Artstyle.
        I got a few comments that if this game was on CoolMathGames in the mid 2010s, my friends would have played it.

    I loved working with the idea of a forwards-facing endless runner. It was a little funky to work with at first, but I think
        it ended up quite well. I think the only issue with the front-facing & 2D medium is the visual depth is a little difficult to comprehend
        on the first play, but after a few tries it starts to make a lot of sense, and feel natural.

    On a more technical level, I think the most impressive part, if anything at all, is the way the Obstacles and Fruits are spawned.
        At first, I was *going* to opt for an approach where Lamps, Cars, and Fruit all were their own classes that extended a parent Obstacle. 
        However, I decided that their differences offered a cool opportunity - although the approach is significantly less elegant, the
        obstacles and fruit are spawned via a similar routine, except one is done by a static class method, and the other is done by a routine in 
        Play.js . It was a nice way to re-acquaint myself with JS classes & static-ness, since I haven't worked with a true OOP language since
        I worked with Java and JS in high school. Everything since then has been python, C, or C++, and python was minimal at that - so it's
        refreshing to actually finish a whole project in a language I don't have to learn off the dome. Phaser.js is honestly pretty enjoyable;
        it feels like Unity's framework but in js, and a Lot less formidable.

    Sorry for the wall of text, O TA that has been assigned to grade my project.
    I'm currently working a 14 hour shift and have around 200mg of caffeine in my bonessss. C'est la vie.

*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height:480,
    render: {pixelArt: true},
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
            debug: false //dbug now false for live build
        }
    },
    scene: [ Loading, MainMenu, Play ]
}
let game = new Phaser.Game(config)


let { height, width } = game.config

let keyLEFT, keyRIGHT
let keyPUNCH, keySLIDE, keyESC


