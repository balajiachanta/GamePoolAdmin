module.exports = {

     computewin:function (userpred,winner) {
        
        var userscore=new Object();
        var total = 0;
                  
        if(userpred.tosspred == winner.tosteamid){
            userscore.tossscore=20;
            total = 20;
        }
        if(userpred.winnerpred == winner.teamid){
            total = total+30;
            userscore.winner=30;
        }
        if((userpred.winningteamscore - winner.winnerscore) || 
            (winner.winnerscore - userpred.winningteamscore) == 1){
            userscore.winnerscore=50;
            total = total+50;
        }
        
        userscore.bonusscore =  (userpred.bonusbet)*5;
        userscore.totscore = total+userscore.bonusscore;
        
        return userscore;
     }
}