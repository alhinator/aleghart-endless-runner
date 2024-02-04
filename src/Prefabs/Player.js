class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        //add object to existing scene
        scene.physics.add.existing(this)
        scene.add.existing(this)

        this.actionState = 'running'

        //this.runSound = scene.sound.add('')


        this.POS_LEFT = width/3 - this.width/5
        this.POS_RIGHT = width*2/3 + this.width/5
        this.target_pos = 'right'

        this.body.setCircle(this.width/4,this.width/4,this.height/6)
    }


    incLeft(){ // to be called in Update if the target position is left.
        if(this.x > this.POS_LEFT){
            this.x -= (this.x - this.POS_LEFT)/10
        }
    }
    incRight(){ // to be called in Update if the target position is right.
        if(this.x < this.POS_RIGHT){
            this.x += (this.POS_RIGHT - this.x)/10
        }
    }




    update(){
        //keypress
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            console.log(" L pressed")
            this.target_pos = 'left'
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            console.log(" R pressed")
            this.target_pos = 'right'
        }
        if(Phaser.Input.Keyboard.JustDown(keySLIDE)){
            this.play('slide')
            this.actionState = 'sliding'
            this.on('animationcomplete', () => {
                console.log('done sliding')
                this.play('running')
                this.actionState = 'running'
            })
        }
        //move
        switch(this.target_pos){
            case 'left': this.incLeft(); break;
            case 'right': this.incRight(); break;
        }


    }
}