var friends = require("../data/friends.js");
// built the file where i can see all the friends

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        ///taking in results of the users post on the survey & parse it
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        ///this variable calculates the difference between the users score 
        ///and the score of each user in the database
        var totalDifference = 0;

        //looping through friend possibilities
        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i]);
            totalDifference = 0;

            ///looping trough the scores
            for (var j = 0; j <= friends[i].scores.length; j++) {

                ///calculating the difference between the score & sum them into the totalDifference
                //math.abs means if its negative it will be negative & positive = positive

                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // if the sum the difference is less then the difference of the current best match.

                if (totalDifference <= bestMatch.friendDifference) {

                    ///resets the bestmatch to a new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        //save user data to the database
        friends.push(userData);

        //returning the json with the user match
        res.json(bestMatch);
    });
}