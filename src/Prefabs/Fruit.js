class Fruit extends Phaser.Physics.Arcade.Sprite {
    static SPEED = 5

    static F_NAMES = ['carrot', 'grapes', 'kiwi', 'orange', 'pear', 'tomato']

    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        scene.physics.add.existing(this)
        scene.add.existing(this)

        this.movingUp = true

        this.setBodySize(this.width, this.height)
        this.body.setImmovable(true)



    }

    static tick(delta){
        let deltaTime = delta /100
        //this is called every frame when not gameover

        //move fruits up
        for ( let i in Fruit.FRUITS){
            let fr = Fruit.FRUITS[i]
            fr.update(Fruit.FRUITS, i, deltaTime)
        }

    }

    update(_fruits, _i, delta){
        if(this.movingUp){
            this.y -= Fruit.SPEED*delta
        } else { 
            this.disableBody(false, false)
            this.body.destroy()
            this.setTint(0xaaaaaa)
            this.y += 3*delta
        }
        
        if(this.y <= height/2) { this.movingUp = false; this.depth = 1}
        
        if(this.y >= height + this.height * 1.5) {         
            _fruits.splice(_i, 1)
            this.destroy()
       }
    }

    static handleCollision(_runner, _fruit){//REMEMBER THIS IS  STATIC FUNC DO NOT USE KEYWORD 'this'
            //console.log('get fruit')
            //first, need to safely destroy fruit
            for(let i in Fruit.FRUITS){ //remove from array
                if (Fruit.FRUITS[i] == _fruit){
                    Fruit.FRUITS.splice(i, 1)
                    //console.log("successfully spliced")
                }
            }
            _fruit.destroy()
            _runner.fruitGet()
    }

    static speedUp(){
        //console.log("speeding up fruits!")
        SPEED += 1
    }

    static createFruitArray(scene, _runner){
        let num = Phaser.Math.Between(3, 6) //this is the number of fruits that we will create.
        let F_XPOS = [width/3, width/2, width*2/3]
        let xpos = F_XPOS[Phaser.Math.Between(0, F_XPOS.length-1)] // the x position of this 'group' of fruits.
        
        //create them.
        for( let i = 0; i <= num; i++){
            let fframe = this.F_NAMES[Phaser.Math.Between(0, this.F_NAMES.length-1)]
            let temp = new Fruit(scene, xpos, height + 64*i, fframe, 0)
            temp.setDepth(4)
            Fruit.FRUITS.push(temp)
            scene.physics.add.collider(_runner, temp, Fruit.handleCollision, null, scene)

            //console.log("creating new " + fframe)
        }
        //console.log("group over =-----")

    }
}