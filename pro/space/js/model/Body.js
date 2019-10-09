Body = function (name) {
    //координаты и размер
   this.x = 0;
   this.y = 0;
   this.angle = 0;
   this.size = 30;
   this.m = 10;//масса

    //вектор движения
   this.vx = 0;
   this.vy = 0;

   //вращение вокруг своей оси
    this.vr = 0;



    this.name = name;
    this.userPick = '';//'./img/p.png';


    this.addImpuls = function(p){
        this.vx += p.x/this.m;
        this.vy += p.y/this.m;
    };

    this.draw = function(x, y){
        this.x = x;
        this.y = y;


        $('body').append('<img class="body '+this.name+'" src="'+this.userPick+'">');
        $('.'+this.name).css({
            margin: '-'+this.size/2+'px 0 0 -'+this.size/2+'px',

        });
        this.animate();
    }.bind(this);

    this.animate = function(){
        this.x += this.vx;
        this.y += this.vy;
        $('.'+this.name).css({
            left: this.x+'px',
            top: this.y+'px',
            width: this.size
        });
    }
};