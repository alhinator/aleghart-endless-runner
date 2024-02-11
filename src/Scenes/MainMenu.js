class MainMenu extends Phaser.Scene {
    constructor(){
        super("mainMenuScene")
    }

    init(){
        this.BORDER_W = width/32
        this.BORDER_H = height/16
        this.animatingStart = false
        this.runningDown = false

        this.creditsVisible = false

    }
    preload(){
        console.log('in mm preload')
        


        //preload cop car & streetlights
        this.load.spritesheet('copSheet', './assets/env/cop/cop_sheet.png', { frameWidth: 256, frameHeight: 256 })
        this.load.image('lightBack', './assets/env/light_backside.png', {frameWidth:256, frameHeight:256})
        this.load.image('lightFront', './assets/env/light_front.png', {frameWidth:256, frameHeight:256})
        
        //this.load.image('logo', "./assets/ui/mainlogo.png")


    }

    create(){
        //facade
        this.wall = this.add.tileSprite(0,0,640,480,'wally').setOrigin(0,0)

         this.charTest = this.add.sprite(width/2, height, 'char').setOrigin(0.5, 1).setAlpha(0).setFrame(0)

        // this.charTest.play('punch')

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
            frameRate: 10,
            repeat: 3, 
            frames: this.anims.generateFrameNumbers('char', {
                start:2,
                end:2
            })
        })
        this.anims.create({
            key: 'punch',
            frameRate: 7,
            repeat: 0, 
            frames: this.anims.generateFrameNumbers('char', {
                start:3,
                end:5
            })
        })


        //make cop car anims

        this.anims.create({
            key: 'cop-flashing',
            frameRate: 8, 
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('copSheet', {
                start:0,
                end:1
            })
        })

        this.anims.create({
            key: 'cop-bust',
            frameRate: 2, 
            repeat: 0, 
            frames: this.anims.generateFrameNumbers('copSheet', {
                start:2,
                end:3
            })
        })
        
        this.logo = this.add.sprite(width/2, height/3 + height*1/8, 'logo').setOrigin(0.5, 0.5).setScale(1.5)

        let fontconf = {
            fontFamily: 'GangOfThree', 
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
              top: 5,
              bottom: 5,
              left:3, 
              right:3
            },
        }
        this.pressPlay = this.add.text(width/2,height*3/4, "Press Space to Play", fontconf).setOrigin(0.5,0.5)
        this.pressPlay.alphaDirection = -1
        fontconf.fontSize = '16px'
        fontconf.padding = {
            top: 30,
            bottom: 30,
            left:30, 
            right:30}
        this.credits = this.add.text(width/2, height/6,
        "'Shitty fruit' assets from Nathan Altice" +
        "\nAll other visual assets by aleghart" +
        "\nSound effects by aleghart" +
        "\nBackground music is sourced from Akira Sora;" +
        "\n\"Chromatic Blitz (Instrumental) - Goby Brine\"" +
        "\nunder an Attribution 4.0 International License: \nhttps://creativecommons.org/licenses/by/4.0/" + 
        "\n'Gang of Three' font free for commercial use from" + 
        "\nhttps://fontmeme.com/fonts/gang-of-three-font/" + 
        "\n\nThis project is for academic purposes only.", fontconf).setOrigin(0.5,0)


        fontconf.fontFamily = 'Papyrus'
        fontconf.fontSize = '14px'
        fontconf.padding = {
            top: 5,
            bottom: 5,
            left:3, 
            right:3
          }
        this.directions = this.add.text(width/2,height*5/6 + 20, "use ← and → to change lanes.\n[space] to punch, ↓ to slide.", fontconf).setOrigin(0.5,0.5)
        this.creditKey = this.add.text(0,height, "Press [esc] to view credits", fontconf).setOrigin(0,1)

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySLIDE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyPUNCH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        //for intro cutscene
        this.runSound = this.sound.add('running').setVolume(2)
        this.gruntSound = this.sound.add('grunt')
        this.gongSound = this.sound.add('gong')


        //particle emitters
        //code adapted from https://labs.phaser.io/edit.html?src=src\game%20objects\particle%20emitter\explode%20emitter.js

        this.emitter = this.add.particles(-100,-100, 'smoke', {
            lifespan: 4000,
            speed: {min:60, max: 80},
            scale: {start:2, end:4.5},
            gravityX: 0,
            gravityY: -0.5,
            alpha: {start: 0.5, end: 0},
            blendMode: 'NORMAL', 
            emitting: false
          })
  
          this.createExplosion = (_x, _y) => {
            let edg = new Phaser.GameObjects.Particles.Zones.EdgeZone(new Phaser.Geom.Polygon([[196, 374], [224,323], [289,305], [339,346],[367,421], [274,472]]), 16, 0, false, false)
            this.emitter.setEmitZone(edg)
            this.emitter.setPosition(_x, _y)
            this.emitter.explode(16)
          }

    }

    update(){
        if (!this.animatingStart){
            this.alphaOscillate(this.pressPlay,2)
        }
        if (this.runningDown){
            this.charTest.alpha += 0.03
            this.charTest.y += 1.5
            
        }

        if(!this.animatingStart && Phaser.Input.Keyboard.JustDown(keyESC)){
            this.creditsVisible = !this.creditsVisible
            console.log('esc pressed')
        }
        this.credits.alpha = this.creditsVisible && !this.animatingStart ? 1 : 0


        if (!this.animatingStart && Phaser.Input.Keyboard.JustDown(keyPUNCH)) {
            this.gruntSound.play()
            this.gongSound.play()
            this.animatingStart = true
            //console.log('gra')
            //animate break
            this.pressPlay.setAlpha(0)
            this.logo.setAlpha(0)
            this.directions.setAlpha(0)
            this.creditKey.setAlpha(0)
            this.wall.setTexture('wallBr1')
            this.time.delayedCall(500, () => {
                this.gongSound.play()
                this.wall.setTexture('wallBr2')   
                this.time.delayedCall(500, () => {
                    this.wall.setTexture('wallBr3')   
                    this.runningDown = true
                    this.runSound.loop = true
                    this.runSound.play()
                    this.charTest.play('running')
                    this.createExplosion(width/2, height*3/4)
                    //last delayed call i promise
                   //start game scene
                    this.time.delayedCall(3800, () => {this.runSound.stop() ; this.scene.start('playScene')})
                }, null, this)
            }, null, this)
        }

        // //testing
        // this.input.on('pointerdown', (pointer)=>{
        //     console.log("x:" + pointer.x + " y:" + pointer.y)
        // })
    }
    

    alphaOscillate(thing, speed){
        //if not init, init
        if(!thing.alphaDirection){
            thing.alphaDirection = -1
        }
        //bounce
        if(thing.alpha <= 0.2) { thing.alphaDirection = 1}
        if(thing.alpha >= 1) { thing.alphaDirection = -1}

        thing.alpha += thing.alphaDirection/100*speed
    }



}
