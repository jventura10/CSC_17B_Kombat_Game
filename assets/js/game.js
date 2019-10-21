var canvas=document.getElementById("gameCanvas")
var bardock=new Image();
var broly=new Image();
bardock.src="assets/images/Bardock.png";
broly.src="assets/images/Broly.png"

function sprite(spr){
    var newSprite={};
    var frameIndex=0;
    var tickCount=0;
    var ticksPerFrame=7;
    var numberOfFrames=spr.numberOfFrames||1;

    newSprite.context=spr.context;
    newSprite.regularWidth=spr.width;
    newSprite.regularHeight=spr.height;
    newSprite.hitWidth=spr.hitWidth;
    newSprite.hitHeight=spr.hitHeight;
    newSprite.width=spr.width;
    newSprite.height=spr.height;
    newSprite.regularStartPos=spr.regularStartPos;
    newSprite.hitStartPos=spr.hitStartPos;
    newSprite.image=spr.image;
    newSprite.loop=spr.loop;
    newSprite.y=400;
    newSprite.runHit=false;
    newSprite.reverse=spr.reverse;
    if(newSprite.reverse==false){
        newSprite.x=500;
    }
    else{
        newSprite.x=200;
    }
    
    newSprite.render=function(){
        // if(newSprite.reverse==true){
        //     newSprite.context.translate(newSprite.width, 0);
        //     newSprite.context.scale(-1, 1);
        // }
        
        newSprite.context.clearRect(newSprite.x,newSprite.y,newSprite.width,newSprite.height);
        if(newSprite.runHit==false){
            newSprite.width=newSprite.regularWidth;
            newSprite.height=newSprite.regularHeight;
            newSprite.context.drawImage(newSprite.image,(frameIndex*newSprite.width)/numberOfFrames,newSprite.regularStartPos,newSprite.width/numberOfFrames,newSprite.height,newSprite.x,newSprite.y,150,150);    
        }
        else{
            newSprite.width=newSprite.hitWidth;
            newSprite.height=newSprite.hitHeight;
            newSprite.context.drawImage(newSprite.image,(frameIndex*newSprite.width)/numberOfFrames,newSprite.hitStartPos,newSprite.width/numberOfFrames,newSprite.height,newSprite.x,newSprite.y,150,150);
        }
    
    };

    newSprite.loop=spr.loop;
    newSprite.update=function(){
        tickCount+=1;
        if(tickCount>ticksPerFrame){
            tickCount=0;
            if(frameIndex<numberOfFrames-1){
                frameIndex+=1;
            }
            else if(newSprite.loop){
                newSprite.runHit=false;
                frameIndex=0;
            }
        }
    };  

    return newSprite;
};

var playerOne=sprite({context: canvas.getContext("2d"),width: 700, height: 125,image:bardock,numberOfFrames: 6,loop: true,reverse: false,hitWidth: 827,hitHeight: 120,regularStartPos: 623,hitStartPos: 2366});
var playerTwo=sprite({context: canvas.getContext("2d"),width: 995, height: 205,image:broly,numberOfFrames: 8,loop: true,reverse: true,hitWidth: 1385,hitHeight: 160,regularStartPos: 667,hitStartPos: 1520});

function gameLoop(){
    window.requestAnimationFrame(gameLoop);
    playerTwo.render();
    playerTwo.update();
    playerOne.render();
    playerOne.update();
}

function keyBoardPress(e){
    e.preventDefault();
    if(e.code=="KeyA"){
        console.log("Move Left");
        if(playerOne.x>=5){
            playerOne.x-=5;    
        }
        
    }
    else if(e.code=="KeyD"){
        console.log("Move Right");
//        if(playerOne.x<=700){
//            playerOne.x+=5;   
//        }
    }
    else if(e.code=="Space"){
        console.log("Hit");
        playerOne.runHit=true;
    }
}

//bardock.addEventListener("load",gameLoop);
broly.addEventListener("load",gameLoop);
window.addEventListener("keypress",keyBoardPress)