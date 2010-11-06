function Cube(x, y, z) {
    var xColor = "#ff0000";
    var mxColor = "#00ff00";
    var yColor = "#0000ff";
    var myColor = "#ffff00";
    var zColor = "#ff00ff";
    var mzColor = "#00ffff";

    this.x = x;
    this.y = y;
    this.z = z;
    this.visibleSides = [];
    this.invisibleSides = [];

    if (x == 1) {
        this.xColor = xColor;
        this.visibleSides[this.visibleSides.length] = new XSide();
    }
    else if (x == -1) {
        this.xColor = mxColor;
        this.invisibleSides[this.invisibleSides.length] = new XSide();
    }
    else {
        this.xColor = null;
    }
    if (y == 1) {
        this.yColor = yColor;
        this.visibleSides[this.visibleSides.length] = new YSide();
    }
    else if (y == -1) {
        this.yColor = myColor;
        this.invisibleSides[this.invisibleSides.length] = new YSide();
    }
    else {
        this.yColor = null;
    }
    if (z == 1) {
        this.zColor = zColor;
        this.visibleSides[this.visibleSides.length] = new ZSide();
    }
    else if (z == -1) {
        this.zColor = mzColor;
        this.invisibleSides[this.invisibleSides.length] = new ZSide();
    }
    else {
        this.zColor = null;
    }
}

Cube.prototype.rotateX = function() {
    var tmpColor = this.yColor;
    this.yColor = this.zColor;
    this.zColor = tmpColor;
}
Cube.prototype.rotateY = function() {
    var tmpColor = this.xColor;
    this.xColor = this.zColor;
    this.zColor = tmpColor;
}
Cube.prototype.rotateZ = function() {
    var tmpColor = this.xColor;
    this.xColor = this.yColor;
    this.yColor = tmpColor;
}
Cube.prototype.copyColor = function(cube) {
    this.xColor = cube.xColor;
    this.yColor = cube.yColor;
    this.zColor = cube.zColor;
}
Cube.prototype.copyColor2 = function(xColor, yColor, zColor) {
    this.xColor = xColor;
    this.yColor = yColor;
    this.zColor = zColor;
}
function XSide() {
}
function YSide() {
}
function ZSide() {
}
XSide.prototype.draw = function(cxt, startPoint, singleSide, cube) {
    var point = startPoint;
    if (cube.x < 0) {
        var bgLength = 3 * singleSide + 1.5 * singleSide;
        point = point.angleRelative(bgLength, Math.PI - Math.PI / 6);
    }

    for (var z = 1; z > cube.z; z--) {
        point = point.angleRelative(singleSide, Math.PI / 6);
    }
    for (var y = 1; y > cube.y; y--) {
        point = point.angleRelative(singleSide, Math.PI * 3 / 2);
    }
    var polygon = point.buildPolygon(singleSide, Math.PI / 6, Math.PI * 3 / 2);
    polygon.draw(cxt, cube.xColor);
}
YSide.prototype.draw = function(cxt, startPoint, singleSide, cube) {
    var point = startPoint;
    if (cube.y < 0) {
        var bgLength = 3 * singleSide + 1.5 * singleSide;
        point = point.angleRelative(bgLength, Math.PI * 3 / 2);
    }

    for (var x = 1; x > cube.x; x--) {
        point = point.angleRelative(singleSide, Math.PI - Math.PI / 6);
    }
    for (var z = 1; z > cube.z; z--) {
        point = point.angleRelative(singleSide, Math.PI / 6);
    }
    var polygon = point.buildPolygon(singleSide, Math.PI / 6, Math.PI - Math.PI / 6);
    polygon.draw(cxt, cube.yColor);
}
ZSide.prototype.draw = function(cxt, startPoint, singleSide, cube) {
    var point = startPoint;
    if (cube.z < 0) {
        var bgLength = 3 * singleSide + 1.5 * singleSide;
        point = point.angleRelative(bgLength, Math.PI / 6);
    }
    for (var x = 1; x > cube.x; x--) {
        point = point.angleRelative(singleSide, Math.PI - Math.PI / 6);
    }
    for (var y = 1; y > cube.y; y--) {
        point = point.angleRelative(singleSide, Math.PI * 3 / 2);
    }
    var polygon = point.buildPolygon(singleSide, Math.PI - Math.PI / 6, Math.PI * 3 / 2);
    polygon.draw(cxt, cube.zColor);
}
function MagicCube() {
    this.cubes = [
        new Cube(-1, 1, 1),
        new Cube(0, 1, 1),
        new Cube(1, 1, 1),
        new Cube(-1, 1, 0),
        new Cube(0, 1, 0),
        new Cube(1, 1, 0),
        new Cube(-1, 1, -1),
        new Cube(0, 1, -1),
        new Cube(1, 1, -1),
        new Cube(-1, 0, 1),
        new Cube(0, 0, 1),
        new Cube(1, 0, 1),
        new Cube(-1, 0, 0),
        new Cube(0, 0, 0),
        new Cube(1, 0, 0),
        new Cube(-1, 0, -1),
        new Cube(0, 0, -1),
        new Cube(1, 0, -1),
        new Cube(-1, -1, 1),
        new Cube(0, -1, 1),
        new Cube(1, -1, 1),
        new Cube(-1, -1, 0),
        new Cube(0, -1, 0),
        new Cube(1, -1, 0),
        new Cube(-1, -1, -1),
        new Cube(0, -1, -1),
        new Cube(1, -1, -1)
    ];
}

MagicCube.prototype.drawSides = function(cxt, central, singleSide) {
    for (var i = 0; i < this.cubes.length; i++) {
        for (var j = 0; j < this.cubes[i].invisibleSides.length; j++) {
            var side = this.cubes[i].invisibleSides[j];
            side.draw(cxt, central, singleSide, this.cubes[i]);
        }
    }
    for (var i = 0; i < this.cubes.length; i++) {
        for (var j = 0; j < this.cubes[i].visibleSides.length; j++) {
            var side = this.cubes[i].visibleSides[j];
            ;
            side.draw(cxt, central, singleSide, this.cubes[i]);
        }
    }
}

MagicCube.prototype.getCube = function(x, y, z) {
    for (var i = 0; i < this.cubes.length; i++) {
        var cube = this.cubes[i];
        if (cube.x == x && (cube.y == y) && (cube.z == z)) {
            return cube;
        }
    }
    return null;
}
MagicCube.prototype.rotate = function(cube1, cube2, cube3, cube4, direction) {
    var tmpX = cube1.xColor;
    var tmpY = cube1.yColor;
    var tmpZ = cube1.zColor;
    if(direction == 'anti'){
        cube1.copyColor(cube4);
        cube4.copyColor(cube3);
        cube3.copyColor(cube2);
        cube2.copyColor2(tmpX, tmpY, tmpZ);
    }
    else{
        cube1.copyColor(cube2);
        cube2.copyColor(cube3);
        cube3.copyColor(cube4);
        cube4.copyColor2(tmpX, tmpY, tmpZ);
    }

}
MagicCube.prototype.antiRotate = function(cube1, cube2, cube3, cube4) {
    var tmpX = cube1.xColor;
    var tmpY = cube1.yColor;
    var tmpZ = cube1.zColor;

}
MagicCube.prototype.rotateY = function(value, direction) {
    for (var i = 0; i < this.cubes.length; i++) {
        if (this.cubes[i].y == value) {
            this.cubes[i].rotateY();
        }
    }
    this.rotate(this.getCube(-1, value, 1), this.getCube(-1, value, -1), this.getCube(1, value, -1), this.getCube(1, value, 1), direction);
    this.rotate(this.getCube(0, value, 1), this.getCube(-1, value, 0), this.getCube(0, value, -1), this.getCube(1, value, 0), direction);
}
MagicCube.prototype.rotateX = function(value, direction) {
    for (var i = 0; i < this.cubes.length; i++) {
        if (this.cubes[i].x == value) {
            this.cubes[i].rotateX();
        }
    }
    this.rotate(this.getCube(value, 1, 1), this.getCube(value, -1, 1), this.getCube(value, -1, -1), this.getCube(value, 1, -1), direction);
    this.rotate(this.getCube(value, 0, 1), this.getCube(value, -1, 0), this.getCube(value, 0, -1), this.getCube(value, 1, 0), direction);
}
MagicCube.prototype.rotateZ = function(value, direction) {
    for (var i = 0; i < this.cubes.length; i++) {
        if (this.cubes[i].z == value) {
            this.cubes[i].rotateZ();
        }
    }
    this.rotate(this.getCube(1, 1, value), this.getCube(-1, 1, value), this.getCube(-1, -1, value), this.getCube(1, -1, value), direction);
    this.rotate(this.getCube(0, 1, value), this.getCube(-1, 0, value), this.getCube(0, -1, value), this.getCube(1, 0, value), direction);
}