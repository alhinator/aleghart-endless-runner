class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }



    preload(){

    }

    init(){
        this.spawn_timer_max = 3000
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
        //text
        this.restart = this.add.text(width/2,height/2, "GAME OVER!", fontconf).setOrigin(0.5,0.5).setDepth(6)
        this.restart2 = this.add.text(width/2,height*2/3, "Press Space to Return to Main Menu", fontconf).setOrigin(0.5,0.5).setDepth(6)
        this.restart.setVisible(false)
        this.restart2.setVisible(false)
        //console.log(this.restart.text)

    }

    update(){
        if(this.gameOver) { 
            if (Phaser.Input.Keyboard.JustDown(keyPUNCH)){
                //this.scene.restart()
                this.scene.start('mainMenuScene')
            } else {
                return
            }
        }
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
            let m = this.runner.update()
            if (m.gameOver){ 
                this.gameOverFunc()
            }
        }

        if(!this.gameOver){ //if game not over
            //move obstacles up
            for(let i in this.obstacles){
                let obj = this.obstacles[i]
                if(!obj) { continue}
                obj.update(this.obstacles, i)
            }

            //update fruits
            Fruit.tick()
        }



    }




    gameOverFunc(){
        console.log('game over!')
        this.gameOver = true
        this.road.stop()
        this.spawning = false 

        //stop obstacle anims
        for(let i in this.obstacles){
            let obj = this.obstacles[i]
            if(!obj) { continue}
            obj.anims.stop()
        }

        //restart texts
        this.restart.setVisible(true)
        this.restart2.setVisible(true)
        
    }


    createObby(){
        if (!this.spawning){
            return
        }
        let temp = Obstacle.createNewObstacle(this)
        temp.setDepth(4)
        this.obstacles.push(temp)
        //console.log(`recieved new obstacle: x:${temp.x}, y:${temp.y}, ${temp.texture}, ${temp.frame}`)
        //console.log(this.obstacles)
        //create a collider 
        this.physics.add.collider(this.runner, temp, Obstacle.handleCollision, null, this)


        
        this.time.delayedCall(this.spawn_timer, () => {this.createObby()})
        if (this.spawn_timer >= 1000) {
            this.spawn_timer -= 50
            if (this.spawn_timer <= 1000) {Obstacle.speedUp(); Fruit.speedUp()}
        } 
    }
}