class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        //add object to existing scene
        scene.physics.add.existing(this)
        scene.add.existing(this)

        this.actionState = 'running'

        this.runSound = scene.sound.add('running').setVolume(2)
        this.slideSound = scene.sound.add('slide')
        this.deathSound = scene.sound.add('splat')
        this.gruntSound = scene.sound.add('grunt')
        this.fruitSound = scene.sound.add('chomp').setVolume(0.5)

        this.score = 0

        this.POS_LEFT = width/3 //- this.width/6
        this.POS_RIGHT = width*2/3 //+ this.width/6
        this.POS_RUN = height/2 - this.height/8
        this.POS_SLIDE = height/2 + this.height/5
        this.target_pos = ['right', 'run']
        this.actionable = {slide: true, punch: true}


        this.body.setCircle(this.width/4,this.width/4,this.height/6)
        this.body.setImmovable(true)

    }


    incLeft(delta){ // to be called in Update if the target position is left.
        if(this.x > this.POS_LEFT){
            this.x -= (this.x - this.POS_LEFT)/10*delta
        }
    }
    incRight(delta){ // to be called in Update if the target position is right.
        if(this.x < this.POS_RIGHT){
            this.x += (this.POS_RIGHT - this.x)/10*delta
        }
    }
    returnRun(delta){
        if(this.y > this.POS_RUN){
            this.y -= (this.y - this.POS_RUN)/10*delta
        }
    }
    slideSlide(delta){
        if(this.y < this.POS_SLIDE){
            this.y += (this.POS_SLIDE - this.y)/3*delta
        }
    }




    update(delta){
        //keypress
        //rules: you can move lr if you are not currently sliding; you may do any action mid-movement.
        //you can't slide if you are sliding, but you can slide during movement or cancel a punch
        //you can't punch if you are punching, but you can punch during movement or cancel a slide
        //there is a delay between actions of the same type (eg slide -> slide), and the delay carries regardless of action cancels
        //you cannot slide for 250ms after your last slide ends.
        //you cannot punch for 300ms  after your last punch ends.
        if(this.actionState != 'sliding' && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //console.log(" L pressed")
            this.target_pos[0] = 'left'
        }
        if(this.actionState != 'sliding' && Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //console.log(" R pressed")
            this.target_pos[0] = 'right'

        }
        if(this.actionable.slide && Phaser.Input.Keyboard.JustDown(keySLIDE)){
            this.actionable.slide = false
            this.actionState = 'sliding'
            this.target_pos[1] = 'slide'

            this.play('slide')
            this.runSound.stop()
            this.slideSound.play()
            this.gruntSound.play()
            this.on('animationcomplete', () => {
                //console.log('done sliding')
                this.play('running')
                this.target_pos[1] = 'run'
                this.actionState = 'running'
                this.scene.time.delayedCall(250, () => {this.actionable.slide = true}, null, this)
            })
        }
        if(this.actionable.punch && Phaser.Input.Keyboard.JustDown(keyPUNCH)){
            this.actionable.punch = false
            this.actionState = 'punching'
            this.target_pos[1] = 'run'
            this.gruntSound.play()

            this.play('punch')
            this.on('animationcomplete', () => {
                //console.log('done punching')
                this.play('running')
                this.target_pos[1] = 'run'
                this.actionState = 'running'
                this.scene.time.delayedCall(300, () => {this.actionable.punch = true}, null, this)
            })
        }
        //move
        switch(this.target_pos[0]){
            case 'left': this.incLeft(delta); break;
            case 'right': this.incRight(delta); break;
        }
        switch(this.target_pos[1]){
            case 'run': this.returnRun(delta); break;
            case 'slide': this.slideSlide(delta); break;
        }
        if(this.actionState == 'running' && !this.runSound.isPlaying) { this.runSound.play()}

        let rvar = {}
        if (this.actionState == 'splat') {
            this.disableBody(false, false)
            rvar.gameOver = true 
        }

        return rvar


    }

    getAction(){
        return this.actionState
    }

    getScore(){
        return this.score
    }

    fruitGet(){
        this.score++
        this.fruitSound.play()
    }

    splatify(){
        this.deathSound.play()
        this.anims.stop()
        this.setTexture('splat')
        this.actionState = ('splat')
    }
}