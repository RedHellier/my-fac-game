const canvas = document.getElementById("game-space");
const ctx = canvas.getContext("2d");

const walls = [
    {x:0,y:0,drawType:"bottomToRight"},
    {x:1,y:0,drawType:"bottomToLeft"},
    {x:0,y:1,drawType:"vert"},
    {x:1,y:1,drawType:"vert"},
    {x:0,y:2,drawType:"topToRight"},
    {x:1,y:2,drawType:"topToLeft"}]

const wallTypes = {
    vert:{startX:0,startY:-10,endX:0,endY:10},
    horz:{startX:-10,startY:0,endX:10,endY:0},
    topToLeft:{startX:0,startY:-10,endX:-10,endY:0},
    topToRight:{startX:0,startY:-10,endX:10,endY:0},
    bottomToLeft:{startX:0,startY:10,endX:-10,endY:0},
    bottomToRight:{startX:0,startY:10,endX:10,endY:0}
}

var toGrid = coord => coord*20+10;

function drawWall(wall) {
    let gridX = toGrid(wall.x);
    let gridY = toGrid(wall.y);
    let adjustment = wallTypes[wall.drawType];
    console.log(gridX + "," + gridY)
    console.log(adjustment.startX + "," + adjustment.startY + "   " + adjustment.endX + "," + adjustment.endY)
    ctx.moveTo(gridX+adjustment.startX, gridY+adjustment.startY);
    ctx.quadraticCurveTo(gridX, gridY, gridX+adjustment.endX, gridY+adjustment.endY);
    ctx.stroke();
}

function drawWalls(level) {
    ctx.beginPath();
    ctx.strokeStyle = "#3E5BF5";
    ctx.lineWidth = 3;
    for (let wall of walls) {
        console.log(wall);
        drawWall(wall);
    }
}


drawWalls(walls);

