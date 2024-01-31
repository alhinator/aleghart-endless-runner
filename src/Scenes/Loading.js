class Loading extends Phaser.Scene {
    constructor(){
        super("LoadingScene")
    }

    preload(){
        //grab our logo
        this.load.image('logo', "./assets/ui/mainlogo.png")

        //first, load all assets that will be used in the menu scene
        this.load.image('facade', "./assets/env/facade.png")
        
        //load character sprites
        this.load.spritesheet('char', './assets/char/char_sp.png', { frameWidth: 247, frameHeight: 215 })
        console.log("break")
        
    }

    create(){
        this.logo = this.add.tileSprite(width/2, height/2, 256, 256, 'logo').setOrigin(0.5, 0.5)


        //create anims
        this.anims.create({
            key: 'running',
            frameRate: 6,
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('char', {
                start:0,
                end:1
            })
        })
        this.anims.create({
            key: 'slide',
            frameRate: 0,
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('char', {
                start:2,
                end:2
            })
        })
        this.anims.create({
            key: 'punch',
            frameRate: 7,
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('char', {
                start:3,
                end:5
            })
        })
        

        this.charTest = this.add.sprite(width/2, height/2, 247, 215, 'char').setOrigin(0.5, 0.5)
        this.charTest.play('punch')
    }

}