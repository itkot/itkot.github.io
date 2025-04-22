Shoot = function (startX, startY, destinationX, destinationY) {

    const x = destinationX
    const y = destinationY

    const distance = Math.sqrt(x*x + y*y)
    console.log('general speed:' + distance)
    console.log('x speed:' + x + ' y speed:' + y)
    console.log('x ratio: ' + x/distance)
    console.log('y ratio: ' + y/distance)

    const nSpeed = canvas.height*0.075
    const nY = nSpeed*(y/distance)
    const nX = nSpeed*(x/distance)

    this.shoot = new Spark(startX, startY, nX, nY)
    scene.addObject(this.shoot)

    this.toDelete = false



    var distans = Math.abs(startX+destinationX - this.shoot.x)

    this.render = function (ctx) {
        if (Math.abs(startX+destinationX - this.shoot.x) > distans){
            console.log('Bam!!!')

            console.log(this.shoot.x, this.shoot.y, this.shoot.speedX, this.shoot.speedY)

            for (let i = 0; i < 100; i++)
                scene.addObject(
                    new Spark(
                        this.shoot.x,
                        this.shoot.y,
                        this.shoot.speedX * 0.4 + (Math.random() - 0.5) * 20,
                        this.shoot.speedY * 0.4 + (Math.random() - 0.5) * 20
                ))

            this.shoot.toDelete = true
            this.toDelete = true
        }

        distans = Math.abs(startX+destinationX - this.shoot.x)
    }
}