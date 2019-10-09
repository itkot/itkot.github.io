ViewPort = function (playGround) {
    this.x = 0;
    this.y = 0;
    this.pg = playGround;
    this.viewObject = false;


    self = this;

    this.onResizeScreen = function () {
        self.x = $(window).width();
        self.y = $(window).height();
    };

    this.setViewObgect = function(object){
        this.viewObject = object;
    };

    this.animate = function(){
        $(window).scrollTop(this.viewObject.y - this.y/2);
        $(window).scrollLeft(this.viewObject.x - this.x/2);
        console.log(this.x);
    };



    $(window).on('load resize', this.onResizeScreen);
};