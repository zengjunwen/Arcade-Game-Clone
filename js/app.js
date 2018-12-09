var collisionPostion={
    row:3,
    col:2,
    collision:false
};
var boundary={
    up:0,
    down:4,
    left:0,
    right:4
}
// 这是我们的玩家要躲避的敌人 
var Enemy = function(row) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x=-100;
    this.row=row;
    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.speed=0.1+0.5*Math.random();
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x=this.x+this.speed*dt;
    if(this.x>510){
        this.x=-100;
        this.speed=0.05+0.2*Math.random();
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    this.update(10);
    if(collisionPostion.collision==false){
        collisionPostion.collision=checkCollision(this,collisionPostion);
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, Utils.getY(this.row));
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player=function(){
    this.sprite = 'images/char-boy.png';
    this.row = 3;
    this.col = 2;
}

Player.prototype.update=function(col,row){
    if(collisionPostion.collision==true)
    {
        collisionPostion.collision=false;
        this.col=2;
        this.row=3;
    }
    collisionPostion.col=this.col;
    collisionPostion.row=this.row;
}

Player.prototype.render=function(){
    ctx.drawImage(Resources.get(this.sprite), Utils.getX(this.col), Utils.getY(this.row));
}

Player.prototype.handleInput=function(i){
    switch(i){
    case "up":
        if(boundary.up==this.row){
            this.row=3;
            this.col=2;
            break;
        }
        this.row-=1;
        break;
    case "down":
        if(boundary.down==this.row){
            break;
        }
        this.row+=1;
        break;
    case "right":
        if(boundary.right==this.col){
            break;
        }
        this.col+=1;
        break;
    case "left":
        if(boundary.left==this.col){
            break;
        }
        this.col-=1;
        break;
    default:
        break;
    }
}

var Utils = {
    // get X coord by col
    getX: function (col) {
        return col * 101;
    },

    // get Y coord by row
    getY: function (row) {
        if(row < 0) {
            return 60-83;
        } else if (row === 0) {
            return 60;
        } else {
            return 60 + 83 * row;
        }
    }
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies=[];
for (var i = 1; i < 6; i++) {
    allEnemies.push(new Enemy(i%3));
}

var player=new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function checkCollision (object1, object2) {
    var delta = 60;
    if (Math.abs(object1.x - Utils.getX(object2.col)) < delta && object1.row == object2.row) {
        console.log("!!!!");
        return true;
    } else {
        return false;
    }
}