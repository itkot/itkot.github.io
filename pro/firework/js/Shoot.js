Shoot = function (startX, startY, destinationX, destinationY) {

    const x = destinationX
    const y = destinationY

    const distance = Math.sqrt(x*x + y*y)

    const nSpeed = canvas.height*0.075
    const nY = nSpeed*(y/distance)
    const nX = nSpeed*(x/distance)

    this.shoot = new Spark(startX, startY, nX, nY)
    scene.addObject(this.shoot)

    this.toDelete = false



    var distans = Math.abs(startX+destinationX - this.shoot.x)

    this.render = function () {
        if (Math.abs(startX+destinationX - this.shoot.x) > distans){

            for (let i = 0; i < 200; i++) {
                const diffusionAngle = Math.random()*6.28
                const diffusionSpeed = Math.random()*12

                scene.addObject(
                    new Spark(
                        this.shoot.x,
                        this.shoot.y,
                        this.shoot.speedX * 0.4 + Math.cos(diffusionAngle) * diffusionSpeed,
                        this.shoot.speedY * 0.4 + Math.sin(diffusionAngle) * diffusionSpeed
                    ))
            }

            this.shoot.toDelete = true
            this.toDelete = true
        }

        distans = Math.abs(startX+destinationX - this.shoot.x)
    }
}