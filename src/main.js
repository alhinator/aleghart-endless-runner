//Alex Leghart
//Game Title: Fruit PUNCH
//Approx Hours: 25-30

/* Creative Tilt: 


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


