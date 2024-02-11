class Obstacle extends Phaser.Physics.Arcade.Sprite{
    static SPEED = 3
    static cops = 0
    constructor(scene, x, y, texture, frame){
        //DO NOT USE CONSTRUCTOR TO CREATE NEW OBSTACLES. USE createNewObstacle INSTEAD TO GET PROPER GENERATION.
       
        super(scene, x, y, texture, frame)
        //add object to existing scene
        scene.physics.add.existing(this)
        scene.add.existing(this)

        this.movingUp = true
        this.collidable = false

        this.setBodySize(this.width, this.height/2)
        this.body.setImmovable(true)
        this.disableBody(false, false)

        this.copGong = scene.sound.add('gong')

        if (this.texture.key == 'copSheet'){ this.anims.play('cop-flashing')}

    }





    static createNewObstacle(scene){
        let _side = Phaser.Math.Between(0,1) == 0 ? 'left' : 'right'
        let _x = _side == 'left' ? width*2/7 : width * 5/7
        let _y = height + 257
        let _type = Phaser.Math.Between(0,1)
        let _texture
        let _frame = 0
        switch (_type){
            case 0: //light
                _texture = _side == 'left' ? 'lightBack' : 'lightFront'
                let _x = _side == 'left' ? width*2/7 - 256/5 : width * 6/7

                break
            case 1: //car
                _texture = 'copSheet'
                _frame = Phaser.Math.Between(0,1)
                break
        }
        //console.log(`new obstacle: ${_side}, x:${_x}, y:${_y}, ${_texture}, ${_frame}`)
        return new Obstacle(scene, _x, _y, _texture, _frame)
    }


    update(_obstacles, _i) {
        if(this.movingUp){
            this.y -= Obstacle.SPEED
        } else { 
            if (this.collidable) { this.collidable = false}
            else { this.disableBody(false, false) ; this.body.destroy() ; this.setTint(0xaaaaaa)}
            this.y += 3
        }
        //console.log(this.texture)
        switch(this.texture.key){
            case 'copSheet':
                if(this.y <= height/2) { this.movingUp = false; this.depth = 1; this.enableBody() ; this.collidable = true}
                break;
            default:
                if(this.y <= height/2 - this.height/5) { this.movingUp = false; this.depth = 1; this.enableBody() ; this.collidable = true}
        }
        if(this.y >= height + this.height * 1.5) {         
            _obstacles.splice(_i, 1)
            this.destroy()
       }
    }

    static getCops(){
        return Obstacle.cops
    }
    static resetCops(){
        Obstacle.cops = 0
    }

    static handleCollision(_runner, _obs){//REMEMBER THIS IS  STATIC FUNC DO NOT USE KEYWORD 'this'
        //console.log('in collision')
        let type = _obs.texture.key == 'copSheet' ? 'cop' : 'lamp'

        if (type == 'cop' && _runner.getAction() == 'punching'){
            //console.log("destroyed")
            _obs.anims.play('cop-bust')
            _obs.copGong.play()
            Obstacle.cops++
            _obs.body.destroy()
        } else if (type == 'cop' && _runner.getAction() != 'punching'){
            //console.log('splat car')
            _runner.splatify()
        }

        if (type == 'lamp' && _runner.getAction() == 'sliding'){
            //console.log('dodged')
        } else if (type == 'lamp' && _runner.getAction() != 'sliding'){
            //console.log('splat lamp')
            _runner.splatify()
        }
    }


    static speedUp(){
        //console.log("speeding up obbys!")
        Obstacle.SPEED += 1
    }
    
}
