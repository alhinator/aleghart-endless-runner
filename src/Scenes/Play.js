class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }



    preload(){
    }


    create(){
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
    }

    update(){

    }
}