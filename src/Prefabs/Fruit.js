class Fruit extends Phaser.Physics.Arcade.Sprite {
    static SPEED = 3

    static FRUITS = []

    static F_NAMES = ['carrot', 'grapes', 'kiwi', 'orange', 'pear', 'tomato']

    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        scene.physics.add.existing(this)
        scene.add.existing(this)

        this.movingUp = true

        this.setBodySize(this.width, this.height)
        this.body.setImmovable(true)



    }
    tick(){
        //this is called every frame when not gameover


    }

    update(_fruits, _i){
        if(this.movingUp){
            this.y -= Fruit.SPEED
        } else { 
            this.disableBody(false, false)
            this.body.destroy()
            this.setTint(0xaaaaaa)
            this.y += 3
        }
        
        if(this.y <= height/2 - this.height/2) { this.movingUp = false; this.depth = 1}
        
        if(this.y >= height + this.height * 1.5) {         
            _fruits.splice(_i, 1)
            this.destroy()
       }
    }

    static handleCollision(_runner, _fruit){//REMEMBER THIS IS  STATIC FUNC DO NOT USE KEYWORD 'this'
            //console.log('in collision')
            _runner.addPoints(1)
    }

    static speedUp(){
        console.log("speeding up fruits!")
        SPEED += 1
    }

    static createFruitArray(scene){
        let num = Phaser.Math.Between(3, 6) //this is the number of fruits that we will create.
        let xpos = Phaser.Math.Between(width/3, width*2/3) // the x position of this 'group' of fruits.
        
        //create them.
        let tempArray = []
        for( let i = 0; i < num; i++){
    
            tempArray.push(new Fruit(scene, xpos, height + 64*i, ))
        }

    }
}