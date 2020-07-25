class Game {
    //operates the game
    // 
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.gameState = true;
    }
    status(){    
      let s = {
        state : this.gameState,
        player1 : this.player1.getPlayerStatus(),
        player2 : this.player2.getPlayerStatus()
      }
      return s;
    }
}


class Player extends Game{
    //initialize the player class 
    // 
    constructor(playerName,bankIndex){
        super();
        this.playerName = playerName;
        this.numberOfHoles = 12;
        this.numberOfStones = this.numberOfHoles * 4;
        this.bankIndex  = bankIndex ;
        var holes = [];
        for (let i=0; i<this.numberOfHoles; i++){       
            if (i===this.bankIndex){
                let hole = new Bank(playerName,i,this.numberOfStones);
                holes.push(hole);
            }else{
                let hole = new Hole(playerName,i,this.numberOfStones);
                holes.push(hole);
            }     
        }
        this.holes = holes; 
        this.currentHole = 0;
        this.ongoing = true;
        this.hand = 0;
        this.direction  = true;


    }
    getDirection(dir){
        // let's make return a function of bool
        // 
        if (dir==="ancw"){
            this.direction = false;
        }else{
            this.direction = true;
        }
    } 
    setBank(index){
        this.bankIndex = index;
    }
    pick_a_hole(index){
        this.currentHole = index;
        this.hand+=this.holes[this.currentHole].getAllStones()
    }
    moveThroughBoard(){
        if (this.direction){   
            if (this.currentHole>=0){
                this.currentHole+=1;
            }
            else if (this.currentHole===this.numberOfHoles-1){
                this.currentHole=0;
            }

        }else{
            if (this.currentHole===0){
                this.currentHole=this.numberOfHoles-1;
            }
            else if (this.currentHole<=this.numberOfHoles-1){
                this.currentHole-=1;
            }           
        }
        this.changeHoleStatus();
    }

    changeHoleStatus(){
        let hole = this.holes[this.currentHole];
        let holeNumber = hole.getHoleNumber();
        // if (holeNumber===this.bankIndex){
        //     this.gameState = false;
        // }


        if (this.hand==0 && hole.checkPlayerStatus()){
            this.ongoing ==false;
        }
        else if (this.hand>0){
            hole.increaseStones();
            this.hand-=1;
        }
        else if (this.hand==0){    
            this.hand+=hole.getAllStones();
        }
    }

    getPlayerStatus(){
        let status = {
            playerName : this.playerName,
            playerHand : this.hand ,
            currentHole : this.currentHole,
            holes: this.holes.map((hole)=>{
            //    console.log(hole.getHoleStatus());
               let s = hole.getHoleStatus();
               return s;
            }),
            state : this.ongoing
        }
        return status;
    }
}


class Hole{
    // hole contains all 
    constructor(playerName,holeNumber,numberOfStones){
        this.playerName = playerName;
        this.holeNumber = holeNumber;
        this.stones = 4;
        this.totalNumberOfStones = numberOfStones;
    }
    getAllStones(){
        let hand = this.stones;
        this.stones = 0;
        return hand;
    }
    increaseStones(){
      if (this.stones>-1){
        this.stones+=1;
        
      }
    }
    checkPlayerStatus(){
        if (this.stones===0){
            return true;
        }
        else{
            return false;
        }
    }
    getHoleStatus(){
        let status = {
            holeNumber : this.holeNumber,
            holeStones:this.stones
        }
        // return status;
        return status
    }

    getHoleNumber(){
        return this.holeNumber;
    }
}


class Bank extends Hole{
    constructor(playerName,holeNumber,numberOfStones){
        super(playerName,holeNumber,numberOfStones);
    }
    checkGameStatus(){
        if (this.stones===this.totalNumberOfStones){
            this.gameStatus=false; 
        }
    }

}
let Provie = new Player("Provie",2);
let Hillary = new Player("Hillary", 1);

let game =  new Game(Hillary,Provie);
// console.log(game.status())
Provie.pick_a_hole(5);
// console.log(game.status())
Provie.getDirection("ancw");

for (let i = 0; i < 1000; i++){
    Provie.moveThroughBoard();
    console.log(Provie.getPlayerStatus());
}


// console.log(Provie.status())
// }
// console.log(Provie.status())


// Provie.
// console.log(game.status())