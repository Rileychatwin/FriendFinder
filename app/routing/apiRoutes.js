var friends = require("../data/friends");

var zeMatch = {
    name: "",
    photo: "",
    friendDifference: Infinity
};


module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {


        var userSurv = req.body;
        var survScore = userSurv.scores;

        theDifference(survScore);

        friends.push(userSurv);

        res.json(bestMatch);

    })

    function theDifference(scores) {

        for (var i = 0; i < friends.length; i++) {
            var thisFriend = friends[i];
            var totalDifference = 0

            for (var x = 0; x < thisFriend.scores.length; x++) {
                var thisFriendScore = thisFriend.scores[x];
                var thisUserScore = scores[x];

                totalDifference += Math.abs(parseInt(thisUserScore) - parseInt(thisFriendScore));
            }

            yourMatch(totalDifference,thisFriend);
        }
    }

    function yourMatch(totalDifference, thisFriend){
        if (totalDifference <= bestMatch.friendDifference) {
            bestMatch.name = thisFriend.name;
            bestMatch.photo = thisFriend.photo;
            bestMatch.friendDifference = totalDifference;
          }
    }
}