function Body(){
    this.name;
    this._x = 0;
    this._y = 0;
    this.w;
    this.h;

    this.img;
    this.body;

    this.draw = function(){
        this.body = $('<div>', {
            css: {
                color: 'green',
                backgroundImage: 'url('+this.img+')',
                backgroundSize: "100% 100%",
                backgroundRepeat: 'no-repeat',
                display: 'block',
                position: 'absolute'
            },
            width: this.w,
            height: this.h,
            offset: {
                top: this._y,
                left: this._x
            }

        }).appendTo('body');
    };

    this.move = function(dx,dy){
        this._x += dx;
        this._y += dy;
        console.log(this._x);
        $(this.body).offset({top: this._y, left: this._x});
    }

}