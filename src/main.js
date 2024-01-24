//Alex Leghart


let config = {
    type: Phaser.AUTO,
    width: 640,
    height:480,
    pixelArt: true,
    scene: [ Loading, MainMenu ]
}
let game = new Phaser.Game(config)


let keyLEFT, keyRIGHT
let keyPUNCH, keySLIDE


