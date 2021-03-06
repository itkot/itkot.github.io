Baloon = function(){
    this.body = new Body();
    this.body.img = 'img/baloon.png';
    this.body.w = 70;
    this.body.h = 70;
    this.body._x = 400;
    this.body.draw();

    this.height = 1;
    this.t = .5;
    this.f = 1;

    //console.log(Math.pow(100, 1/3));
    this.fire = function(){
        if (this.f < 0)
            return;
        this.t += .01;
        this.f -= .001;
    };

    setInterval(function(t){
        $("#tBar").val(t.t);
        $("#fBar").val(t.f);

        screen = $('html').height();

        t.height = t.t;
        ch = t.height*screen;
        fh = screen - t.body._y;

        dy = (ch - fh)/2;
        dy = (dy < 0 ? -1 : 1) * Math.pow(Math.abs(dy), 1/3);
        if (Math.abs(dy) > 0.5)
            t.body.move(wind.wind,-dy);

        t.t -= (t.height + 1)*0.0005;
    },100, this);

};
