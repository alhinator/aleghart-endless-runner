class Obstacle extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, texture, frame){
        //DO NOT USE CONSTRUCTOR TO CREATE NEW OBSTACLES. USE createNewObstacle INSTEAD TO GET PROPER GENERATION.
       
        super(scene, x, y, texture, frame)
        //add object to existing scene
        scene.physics.add.existing(this)
        scene.add.existing(this)

        this.movingUp = true

    }





    static createNewObstacle(scene){
        let _side = Phaser.Math.Between(0,1) == 0 ? 'left' : 'right'
        let _x = _side == 'left' ? width*2/7 : width * 6/7
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
    
}
