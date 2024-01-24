class Loading extends Phaser.Scene {
    constructor(){
        super("LoadingScene")
    }

    preload(){
        //grab our logo
        this.load.image('logo', "./assets/ui/mainlogo.png")

        //first, load all assets that will be used in the menu scene
        this.load.image('facade', "./assets/env/facade.png")
        

    }

    create(){
        this.logo = this.add.tileSprite(0, 0, 256, 256, 'logo').setOrigin(0, 0)
    }

}