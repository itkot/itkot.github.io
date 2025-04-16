Baloon = function(){
    this.body = new Body();
    this.body.img = 'img/baloon.png';
    this.body.w = 70;
    this.body.h = 70;
    this.body._x = 100;
    this.body.draw();

    this.height = 1;
    this.t = .5;
    this.f = 1;

    //console.log(Math.pow(100, 1/3));
    this.fire = function(){
        if (this.f < 0) {
            Interface.fuelIsOverAction()
            return;
        }

        this.t += .05;
        this.f -= .05;
    };

    var ticksPerSec = 0
    setInterval(function(){
        console.log(ticksPerSec)
        ticksPerSec = 0
    }, 1000)

    setInterval(function(t){//TODO count fps rate
        $("#tBar").val(t.t);
        $("#fBar").val(t.f);

        screen = $('html').height();

        t.height = t.t;
        ch = t.height*screen;
        fh = screen - t.body._y;

        dy = (ch - fh)/2;
        dy = (dy < 0 ? -1 : 1) * Math.pow(Math.abs(dy), 1/3);

        const dx = wind.get(t.body._y)

        t.body.move(dx, -dy);
        // t.body.style.transform = "rotate(30deg);"
        t.body.rotate(dx*5)

        t.t -= (t.height + 1)*0.001;

        ticksPerSec++
    },100, this);

};
