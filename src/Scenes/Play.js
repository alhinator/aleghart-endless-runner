class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }



    preload(){
    }

    init(){

    }


    create(){
        //depth chart:
        /*
        road: 2
        player before controllable: 1
        player after controllable: 3
        obstacles, fruit when collideable: 4
        obstacles, fruit after collideable: 1
        */

        //create road
        this.road = this.add.sprite(width/2, height,'roadSheet').setOrigin(0.5, 1).setScale(2.5,1.5)
        this.anims.create({
            key: 'roadScroll',
            frameRate: 12,
            repeat: -1, 
            frames: this.anims.generateFrameNumbers('roadSheet', {
                start:0,
                end:3
            })
        })
        this.road.play('roadScroll')
        this.road.setDepth(2)

        //create player
        this.runner = new Player(this, width*2/3,height*3/4, 'char',0).setDepth(1)
        this.runner.play('running')
        this.runner.introGlide = 'up'

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySLIDE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyPUNCH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //create delayed call to begin spawning obstacles
        this.spawning = false
        this.time.delayedCall(3000, () => {this.spawning = true})

        this.cameras.main.setBackgroundColor(0x094e67)
    }

    update(){
        //the initial 'summit of the hill
        //console.log(this.runner.introGlide)
        if(this.runner.introGlide == 'up'){
            this.runner.y -= 3
            if(this.runner.y <= height/2 - this.runner.height/4){
                //console.log(this.runner.y)
                this.runner.introGlide = 'down'
                this.runner.setDepth(3)
            }
        }
        else if(this.runner.introGlide == 'down'){
            this.runner.y += 3
            if(this.runner.y >= height/2 - this.runner.height/6){
                this.runner.introGlide = false
            }
        } else { //runner should have control over its own body now.
            this.runner.update()
        }

        



    }




    gameOver(){
        this.road.stop()
    }
}