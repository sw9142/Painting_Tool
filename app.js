let canvas = document.querySelector("#jsCanvas");
const reset = document.querySelector("#reset_btn");
const colors = document.querySelectorAll(".controls__color");
const width = document.querySelector("#jsrange");
const fillicon = document.querySelector("#fill");
const brushicon = document.querySelector("#brush");
const savebtn = document.querySelector("#save_btn");
let ctx = canvas.getContext('2d');
let isFilling = false;
let isDrawing = false;
let x = 0;
let y = 0;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;


canvas.addEventListener('mousedown', function(event){
     x = event.offsetX; 
     y = event.offsetY;
    isDrawing = true;
});

canvas.addEventListener('mousemove', function(event){
    if(isDrawing){
        drawLine(ctx, x, y, event.offsetX, event.offsetY);
        x = event.offsetX;
        y = event.offsetY;
    }
});
window.addEventListener('mouseup', function(event){
    if(isDrawing){
        drawLine(ctx, x, y, event.offsetX, event.offsetY);
        x = 0;
        y = 0;
        isDrawing = false;
    }
})
function drawLine(ctx, x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

reset.addEventListener('click', function(event){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 560, 360);
    fillicon.style.color = '#2c2c2c';
    ctx.fillStyle = '#2c2c2c';
    ctx.strokeStyle = '#2c2c2c';
});


fillicon.addEventListener('click', function(e){
    isFilling = true;
    fillicon.style.color = ctx.strokeStyle;

})

brushicon.addEventListener('click', function(e){
    fillicon.style.color = '#2c2c2c';
    brushicon.style.color = ctx.strokeStyle;
    isFilling = false;
})

savebtn.addEventListener('click', function(e){
const image = canvas.toDataURL();
const link = document.createElement("a");
link.href = image;
link.download = "paintingJs";
link.click();

})

function canvasHandlerClick(){
if(isFilling === true){
    ctx.fillStyle = ctx.strokeStyle;
    fillicon.style.color = ctx.strokeStyle;
    ctx.fillRect(0, 0, 560, 360);
}
isFilling = false;
}

canvas.addEventListener('click', canvasHandlerClick);

function changeColor(event){
let color = event.target.style.backgroundColor;
ctx.strokeStyle = color;
 brushicon.style.color = ctx.strokeStyle;

}

colors.forEach(color => color.addEventListener('click', function(event){
    changeColor(event);
}));


function linewidthHandler(event){
    ctx.lineWidth = event.target.value;
}

width.addEventListener('input', linewidthHandler);