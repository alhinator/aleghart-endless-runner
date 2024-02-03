class Loading extends Phaser.Scene {
    constructor(){
        super("LoadingScene")
    }

    preload(){
        console.log('in Loading preload')

         //load character sprites
         this.load.spritesheet('char', './assets/char/char_sp.png', { frameWidth: 247, frameHeight: 215 })

        //grab our logo
        this.load.image('logo', "./assets/ui/mainlogo.png")

        //road
        this.load.spritesheet('roadSheet', './assets/env/road/road_sheet.png', { frameWidth: 256, frameHeight: 256 })


        
       
        //console.log("break")
       
    }

    create(){
        this.logo = this.add.sprite(width/2, height/2, 'logo').setOrigin(0.5, 0.5)


        
        

        //this.charTest = this.add.sprite(width/2, height/2, 247, 215, 'char').setOrigin(0.5, 0.5)
        //this.charTest.play('punch')
    }

    init(){
        this.scene.start('mainMenuScene')
    }

}