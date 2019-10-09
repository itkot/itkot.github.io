Math.vMult = function(a, scalar){
    a.x *= scalar;
    a.y *= scalar;
    return a;
};

Math.vLength = function (v) {
    return Math.sqrt((v.x*v.x + v.y*v.y));
};

Math.vSetLength = function (v, length) {
    v0 = Math.vMult(v, 1/Math.vLength(v));
    return Math.vMult(v0,length);
};

Math.pDist = function (a , b) {
    return Math.vLength(Math.ppToV(a,b))
};

Math.ppToV = function (a, b) {
    return {
        x:(a.x - b.x),
        y:(a.y - b.y)
    }
}


