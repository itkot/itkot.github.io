Spark = function (startX, startY, speedX, speedY){
    this.x = startX
    this.y = startY
    this.speedX = speedX
    this.speedY = speedY
    this.toDelete = false

    const colors = [
        '#FF355E',
        '#FD5B78',
        '#FF6037',
        '#FF9966',
        '#FF9933',
        '#FFCC33',
        '#FFFF66',
        '#FFFF66',
        '#CCFF00',
        '#66FF66',
        '#AAF0D1',
        '#50BFE6',
        '#FF6EFF',
        '#EE34D2',
        '#FF00CC',
        '#FF00CC'
    ]

    this.currentColor = Math.floor((Math.random()*colors.length))

    this.render = function (ctx) {
        if (this.y > ctx.canvas.height)
            this.toDelete = true

        if (this.toDelete)
            return;

        ctx.strokeStyle = colors[this.currentColor]
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)

        this.x = this.x + this.speedX
        this.y = this.y + this.speedY
        ctx.lineTo(this.x, this.y)
        ctx.stroke()

        this.speedY = this.speedY + 2
    }
}