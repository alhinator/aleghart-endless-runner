class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }



    preload(){

    }

    init(){
        this.spawn_timer_max = 1000
        this.spawn_timer = this.spawn_timer_max

        this.gameOver = false
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
        this.time.delayedCall(3000, () => {this.spawning = true; this.createObby()})

        this.cameras.main.setBackgroundColor(0x094e67)

        this.obstacles = []
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

        if(!this.gameOver){ //if game not over
            //move obstacles up
            for(let i in this.obstacles){
                let obj = this.obstacles[i]
                if(!obj) { continue}
                if(obj.movingUp){
                    obj.y -= 3
               } else { 
                    obj.y += 3
               }

               if(obj.y <= height/2 - obj.height/5) { obj.movingUp = false; obj.depth = 1}
               if(obj.y >= height + obj.height * 1.5) {
                let temp = obj
                this.obstacles.splice(i, 1)
                obj.destroy()
               }

            }
        }



    }




    gameOver(){
        this.gameOver = true
        this.road.stop()
        this.spawning = false
    }


    createObby(){
        if (!this.spawning){
            return
        }
        let temp = Obstacle.createNewObstacle(this)
        temp.setDepth(4)
        this.obstacles.push(temp)
        console.log(`recieved new obstacle: x:${temp.x}, y:${temp.y}, ${temp.texture}, ${temp.frame}`)
        console.log(this.obstacles)



        this.time.delayedCall(this.spawn_timer, () => {this.createObby()})
    }
}