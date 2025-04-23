Scene = function (selector) {
    const canvas = document.querySelector(selector)
    const ctx = canvas.getContext("2d")
    var objects = []

    this.click = function (handler) {
        canvas.addEventListener('click', handler)
    }

    this.addObject = function (object) {
        objects.push(object)
    }


    function resize() {
        const canvas = document.getElementById("canvas")
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(window.innerWidth + ' - ' + window.innerHeight)
    }
    window.addEventListener('resize', resize, false);
    resize();


    function render() { // draw to screen here
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        objects.forEach((obj, index) => {
            if (obj.toDelete)
                return objects.splice(index, 1)

            obj.render(ctx)
        })
    }

    setInterval(render, 80)
}