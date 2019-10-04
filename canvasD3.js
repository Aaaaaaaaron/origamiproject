var width = 600;
var height = 600;
var sGridLength = 20;

// initialize SVG.js
var SVG = d3.select("body").append('svg').attr('width',width).attr('height',height);
var gridGroup = SVG.append('g').attr('stroke','#939393');
var lineGroup = SVG.append('g').attr('stroke','#28a4a7');

var previewGroup = SVG.append('g').attr('stroke','#28a4a7');
var vertexGroup = SVG.append('g').attr('fill','#000000');


//initialize square grid
for (i = 0; i <= width; i+= sGridLength){
    gridGroup.append('line').attr("x1",i).attr("y1",0).attr("x2",i).attr("y2",height);
}

for (i = 0; i <= height; i+= sGridLength){
    gridGroup.append('line').attr("x1",0).attr("y1",i).attr("x2",width).attr("y2",i);

}

var vertexRadius = 3;
function roundToSquare(x, y, sLength) {
    var roundedX = Math.round(x/sLength)*sLength;
    var roundedY = Math.round(y/sLength)*sLength;
    return [roundedX,roundedY]
}
SVG.on("mousedown",getDownCoords).on("mouseup",drawLine).on("mousemove",drawPreview);
var x1 = 0;
var y1 = 0;
var mDown = false;
function getDownCoords() {
    var Coords = d3.mouse(this);
    var rCoords = roundToSquare(Coords[0],Coords[1],sGridLength);
    x1 = rCoords[0];
    y1 = rCoords[1];
    mDown = true;
    vertexGroup.append('circle').attr("cx",x1).attr("cy",y1).attr("r",vertexRadius);

    console.log(x1);
    console.log(y1);
}

function drawPreview() {
    if (mDown) {
        var Coords = d3.mouse(this);
        var rCoords = roundToSquare(Coords[0],Coords[1],sGridLength);
        var xp = rCoords[0];
        var yp = rCoords[1];
        previewGroup.selectAll('*').remove();
        previewGroup.append('line').attr("x1",x1).attr("x2", xp).attr("y1",y1).attr("y2",yp);
        previewGroup.append('circle').attr("cx",xp).attr("cy",yp).attr("r",vertexRadius).attr('fill','#000000').attr("stroke",'#000000');
    }

}


function drawLine() {
    mDown = false;
    var Coords = d3.mouse(this);
    var rCoords = roundToSquare(Coords[0],Coords[1],sGridLength);
    x2 = rCoords[0];
    y2 = rCoords[1];
    vertexGroup.append('circle').attr("cx",x2).attr("cy",y2).attr("r",vertexRadius);
    lineGroup.append('line').attr("x1",x1).attr("x2",x2).attr("y1",y1).attr("y2",y2);
    console.log(x2);
    console.log(y2);


}