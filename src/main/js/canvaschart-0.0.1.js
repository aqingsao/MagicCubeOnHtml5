function pie2(canvas, title, data, height, width) {
    c = document.getElementById(canvas);
    c.style.border = "1px solid";
    c.height = height;
    c.width = width;

    var cxt = c.getContext("2d");
}

function CPoint(x, y) {
    this.x = x;
    this.y = y;
}
CPoint.prototype.pathRelative = function(deltaX, deltaY){
    return new CPoint(this.x + deltaX, this.y + deltaY);
}
CPoint.prototype.angleRelative = function(length, angle){
    return new CPoint(this.x + Math.cos(angle) * length, this.y - Math.sin(angle) * length);
}
CPoint.prototype.buildPolygon = function(sideLength, xAngle, yAngle){
    var p2 = this.angleRelative(sideLength, xAngle);
    var p3 = p2.angleRelative(sideLength, yAngle);
    var p4 = this.angleRelative(sideLength, yAngle);
    return new CPolygon(this, p2, p3, p4);
}

function CRect(start, width, height) {
    this.start = start;
    this.width = width;
    this.height = height;
}

function CCircle(central, radius) {
    this.central = central;
    this.radius = radius;
}

function CPolygon() {
    this.points = CPolygon.arguments;
}
CPolygon.prototype.draw = function(cxt, color){
    cxt.fillStyle = color;
    cxt.beginPath();
    cxt.moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    for(var i = 0; i < this.points.length; i++){
        cxt.lineTo(this.points[i].x, this.points[i].y);
    }
    cxt.fill();
    cxt.strokeStyle = "#000000";
    cxt.stroke();
    cxt.closePath();
}