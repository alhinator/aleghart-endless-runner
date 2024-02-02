class MainMenu extends Phaser.Scene {
    constructor(){
        super("mainMenuScene")
    }

    init(){
        this.BORDER_W = width/32
        this.BORDER_H = height/16
        this.animatingStart = false
        this.runningDown = false

    }
    preload(){
        console.log('in mm preload')
         //first, load all assets that will be used in the menu scene
         this.load.image('wally', "./assets/env/facade.png")
         this.load.image('wallBr1', "./assets/env/facade_smash_1.png")
         this.load.image('wallBr2', "./assets/env/facade_smash_2.png")
         this.load.image('wallBr3', "./assets/env/facade_smash_3.png")

        this.load.image('smoke', './assets/env/smoke.png')


    }

    create(){
        //facade
        this.wall = this.add.tileSprite(0,0,640,480,'wally').setOrigin(0,0)


        //create window frame
        this.add.rectangle(0,0,this.BORDER_W, 2*height ,0x444444).setOrigin(0,0)
        this.add.rectangle(width - this.BORDER_W,0,this.BORDER_W, 2*height ,0x444444).setOrigin(0,0)

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



        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySLIDE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyPUNCH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //particle emitters
        //code adapted from https://labs.phaser.io/edit.html?src=src\game%20objects\particle%20emitter\explode%20emitter.js

        this.emitter = this.add.particles(-100,-100, 'smoke', {
            lifespan: 10000,
            speed: {min: 50, max: 75},
            scale: {start:0.8, end:1.5},
            gravityX: 1,
            gravityY: -0.5,
            alpha: 0.4,
            blendMode: 'NORMAL', 
            emitting: false
          })
  
          this.createExplosion = (_x, _y) => {
            this.emitter.setPosition(_x, _y)
            this.emitter.explode(Math.random()*10+10)
          }

    }

    update(){
        if (!this.animatingStart){
            this.alphaOscillate(this.pressPlay,2)
        }
        if (this.runningDown){
            this.charTest.alpha += 0.03
            this.charTest.y += 1
            
        }

        if (Phaser.Input.Keyboard.JustDown(keyPUNCH)) {
            this.animatingStart = true
            //console.log('gra')
            //animate break
            this.pressPlay.setAlpha(0)
            this.logo.setAlpha(0)
            this.wall.setTexture('wallBr1')
            this.time.delayedCall(500, () => {
                this.wall.setTexture('wallBr2')   
                this.time.delayedCall(500, () => {
                    this.wall.setTexture('wallBr3')   
                    this.runningDown = true
                    this.charTest.play('running')
                    this.createExplosion(width/2, height*3/4)

                }, null, this)
            }, null, this)
            //then 

            //start game scene
        }


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
