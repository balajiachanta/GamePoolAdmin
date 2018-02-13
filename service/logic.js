module.exports = {

    findTeamLogo:function (teams,teamid) {

        for(i =0 ;i<teams.length;i++){
            if(teams[i].id == teamid){
                return teams[i].logo;
            }
        }
    }

}