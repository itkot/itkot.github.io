Unit = function (name) {
    this.userPick = './img/bgbattleship.png';
    this.name = name;
    this.vy = 0;
    this.vx = 0;
    this.vr = 0;


    this.v = 0;
    this.sv = 0;
    this.a = 0;

    this.fuel = 100;



    this.draw = function(){
        alert('<img class="unit '+this.name+'" src="'+this.userPick+'">');
        $('body').append('<img class="unit '+this.name+'" src="'+this.userPick+'">');

        this.body = $('.'+this.name);
        this.body.css('left', '550px').css('top', '400px');

        this.send();
    };

    this.send = function () {
        x = parseInt(this.body.css('left'));
        y = parseInt(this.body.css('top'));
        $.get('/update.php?name='+self.name+'&x='+x+'&y='+y);
    };


    this.animate = function () {
        this.body.css('left','+='+this.vx+'px');
        this.body.css('top','+='+this.vy+'px');

        x = this.vx;
        y = this.vy;
        d = Math.sqrt(x*x + y*y);

        sign = (y > 0)? 1 : -1;
        angle = sign*57*Math.acos((x/d)) + 90;

        this.body.css({transform: 'rotate('+angle+'deg)'});
    }

    this.animate = function () {
        if (this.fuel > 0){
            this.vx -= this.v*Math.sin(this.a/57) - this.sv*Math.cos(this.a/57);
            this.vy += this.v*Math.cos(this.a/57) + this.sv*Math.sin(this.a/57);
            this.a += this.vr;
            //console.log(Math.sin((this.a)/(180/Math.PI)));
            this.fuel -= Math.abs(this.v) + Math.abs(this.sv) + Math.abs(this.vr)/1000;
            this.v = this.sv = 0;
        }

        $(this.body).css({
            transform: 'rotate('+this.a+'deg)',
            left: '+='+this.vx+'px',
            top: '+='+this.vy+'px'
        });
    };
    this.draw();
};