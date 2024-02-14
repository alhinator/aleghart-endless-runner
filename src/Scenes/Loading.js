class Loading extends Phaser.Scene {
    constructor(){
        super("LoadingScene")
    }

    preload(){
        //console.log('in Loading preload')

         //load character sprites
         this.load.atlas('char', './assets/char/char_sp.png', './assets/char/char_sp.json')
         this.load.image('splat', './assets/char/ketchup.png', {width:256, height:256})

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

        //fruits
        this.load.image('carrot', './assets/fruits/carrot.png', {width:32, height:32})
        this.load.image('grapes', './assets/fruits/grapes.png', {width:32, height:32})
        this.load.image('kiwi', './assets/fruits/kiwi.png', {width:32, height:32})
        this.load.image('orange', './assets/fruits/orange.png', {width:32, height:32})
        this.load.image('pear', './assets/fruits/pear.png', {width:32, height:32})
        this.load.image('tomato', './assets/fruits/tomato.png', {width:32, height:32})

       
        //audio
        this.load.audio('bgm', './assets/audio/Chromatic Blitz - Instrumental.mp3')
        //background music is sourced from Akira Sora, "Chromatic Blitz (Instrumental) - Goby Brine" under an Attribution 4.0 International License
        //https://creativecommons.org/licenses/by/4.0/

        this.load.audio('chomp', './assets/audio/chomp.mp3')
        this.load.audio('grunt', './assets/audio/grunt.mp3')
        this.load.audio('running', './assets/audio/running.mp3')
        this.load.audio('slide', './assets/audio/slide.mp3')
        this.load.audio('splat', './assets/audio/splat.mp3')
        this.load.audio('gong', './assets/audio/gong.mp3')


        
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