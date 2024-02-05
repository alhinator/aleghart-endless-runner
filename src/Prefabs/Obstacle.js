class Obstacle extends Phaser.Physics.Arcade.Sprite{

    SIDES = ['left', 'right']

    constructor(scene, x, y, texture, frame){
        //DO NOT USE CONSTRUCTOR TO CREATE NEW OBSTACLES. USE createNewObstacle INSTEAD TO GET PROPER GENERATION.
       
        super(scene, x, y, texture, frame)
        //add object to existing scene
        scene.physics.add.existing(this)
        scene.add.existing(this)


        

    }





    static createNewObstacle(scene){
        let _side = SIDES[Phaser.Math.Between(0,1)]
        let _x = _side == 'left' ? width/3 : width * 2/3
        let _y = height //+ heightttt

        let _type = Phaser.Math.Between(0,1)
        let _texture
        let _frame = 0
        switch (_type){
            case 0: //light
                _texture = _side == 'left' ? 'light_backside' : 'light_front'
                break
            case 1: //car
                _texture = 'cop-car'
                _frame = Phaser.Math.Between(0,1)
                break
        }

       
    }
    
}
