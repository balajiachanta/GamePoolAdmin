# GamePoolAdmin

Mongo Db tables


Users

userid, email, password, createdttm, updatedttm, latestlogintime, verfiedstatus, status, isactive, score, bonus


UserPredictions

predid, userid, matchid, tosspred, winnerpred, bonusbet, hspred, mompred

emdded for UserPredictions
UserScores

userid, matchid, tossscore, winnerscore, bonusscore, hsscore, momscore

GameWinners

matchid, teamid, userids, winnerid, islotdone, winnerscore, tossteamid, momplayerid, hsplayerid


MatchDetails (Configurations)

matchid, gamedetails, location, groundname, teamone, teamtwo, matchdttm

TeamDetails (Configuration/ Updation)

teamid, name, logo, homecity, pts

PlayerDetails (Configurations)

playerid, name, teamid, zone

Configurations

confid, confname, value

Rules

ruleid, ruledetail

AuditLogs

auditid, info, createdttm, documentjson

Rules

1. Per match for every user 100 points will be allocated
2. 20 pts - toss prediction
    30 pts - winning team score req
   50 pts - winner prediction

    20 pts - man of the match prediction
   20 pts - highest scorer prediction
3. 25 bonus points will be given to every user for whole IPL season



