class Quiz {
  constructor(){

    this.resultTitle = createElement('h1');

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();

    background("yellow");

    this.resultTitle.html("Result of the quiz");
    this.resultTitle.position(350, 0);

    Contestant.getPlayerInfo();

    if(allContestants !== undefined) {

      fill("blue");
      textSize(20);
      text("Note: Contestants who answered correct are highlighted in green color!", 130, 230);

    }

    for (var plr in allContestants) {

      var correctAns = "2";

      if (correctAns === allContestants[plr].answer){

        fill("Green");
        text(allContestants[plr].name + " : " + allContestants[plr].answer, 130, 300);

      }

      else {

        fill("red");
        text(allContestants[plr].name + " : " + allContestants[plr].answer, 130, 350);

      }

    }
    
  }

  

  

}
