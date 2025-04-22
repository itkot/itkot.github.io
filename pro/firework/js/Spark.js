Spark = function (startX, startY, speedX, speedY){
    this.x = startX
    this.y = startY
    this.speedX = speedX
    this.speedY = speedY
    this.toDelete = false


    this.render = function (ctx) {
        if (this.y > ctx.canvas.height)
            this.toDelete = true

        if (this.toDelete)
            return;

        ctx.strokeStyle = 'red'
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)

        this.x = this.x + this.speedX
        this.y = this.y + this.speedY
        ctx.lineTo(this.x, this.y)
        ctx.stroke()

        this.speedY = this.speedY + 2
    }
}