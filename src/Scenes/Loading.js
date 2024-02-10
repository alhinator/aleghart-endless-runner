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


         //first, load all assets that will be used in the menu scene
         this.load.image('wally', "./assets/env/facade.png")
         this.load.image('wallBr1', "./assets/env/facade_smash_1.png")
         this.load.image('wallBr2', "./assets/env/facade_smash_2.png")
         this.load.image('wallBr3', "./assets/env/facade_smash_3.png")

        this.load.image('smoke', './assets/env/smoke.png')
       

        
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