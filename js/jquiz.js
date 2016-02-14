$(document).ready(function () {
    $(".reset").click(function() {
    location.reload(true);
});
    $(".start").click(trivia);

    function trivia() {
        var scoreAry = [];
        var questions = [{
            q: "What was the name of the Dreadlord that lured Arthas to Northrend?",
            s: ["Varimathras", "Mal'Ganis", "Tichondrius", "Anetheron"],
            a: "Mal'Ganis",
            correct: 0
        }, {
            q: "Which Dragon Aspect was tasked with gaurding time, fate, and destiny?",
            s: ["Ysera", "Neltharion", "Malygos", "Nozdormu"],
            a: "Nozdormu",
            correct: 0
        }, {
            q: "As of Legion who is the current Warchief of the Horde?",
            s: ["Sylvanis", "Vol'jin", "Garrosh", " Thrall"],
            a: "Sylvanis",
            correct: 0
        }, {
            q: "Who was leader of the Frostwolf Clan?",
            s: ["Thrall", "Rend Blackhand", "Durotan", "Gul'dan"],
            a: "Durotan",
            correct: 0
        }, {
            q: "Who founded the Cult of the Damned?",
            s: ["Kael'Thas", "Kel'Thuzad", "Arthas", "Medivh"],
            a: "Kel'Thuzad",
            correct: 0
        }, {
            q: "Which Orc Warchief first drank the Blood of Mannoroth?",
            s: ["Garrosh", "Thrall", "Durotan", "Gromm Hellscream"],
            a: "Gromm Hellscream",
            correct: 0
        }, {
            q: "Which fallen human Kingdom resided in Arathi Highlands?",
            s: ["Stormwind", "Undercity", "Iron Forge", "Stromgarde"],
            a: "Stromgarde",
            correct: 0
        }, {
            q: "Who was the last boss in the raid Karazhan?",
            s: ["Prince Malchezaar", "Medivh", "Al'Akir", "Khadgar"],
            a: "Prince Malchezaar",
            correct: 0
        }, {
            q: "Where is Zul'Aman Located?",
            s: ["Quel'Thalas", "Zandalar", "Stranglethorn Vale", "Tanaris"],
            a: "Quel'Thalas",
            correct: 0
        }, {
            q: "Where was the Old God Yogg-Saron imprisoned?",
            s: ["Silithus", "Ulduar", "Uldaman", "Dire Maul"],
            a: "Ulduar",
            correct: 0
        }];

        var counter = questions.length;

        //This grabs the question and answer data from the questions array and appends it to the #questions div:
        function createQuestion(questions) {
            for (var i = 0; i < questions.length; i++) {
                $(".start").hide();
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + questions.length + '</p><h3 class="question">' + questions[i].q + '</h3>' + radioButtons(questions[i].s, i) + '<button type="submit" class="next">NEXT &#8594;</button></p></form>');
            }
            //This hides all except the first question:
            for (var k = questions.length - 1; k > 0; k--) {
                $('#' + k).hide();
            }
        }
        //This grabs the answer choices from the questions array and returns them to createQuestion():
        function radioButtons(ary, qNum) {
            var answers = [];
            for (i = 0; i < ary.length; i++) {
                answers.push('<label><input type="radio" name="' + qNum + '" value="' + ary[i] + '">' + ary[i] + '</label>');
            }
            return answers.join(" ");
        }
        
        //This sums the correct values in the questions array:
        function sumScore(questions) {
            return scoreAry.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        }
        
        //This checks the user's answer and updates the score:
        function checkAnswer(answer, qNum, questions) {
            if (answer == questions[qNum].a) {
                questions[qNum].correct = 1;
                scoreAry.push(questions[qNum].correct);
            } else {
                scoreAry.push(questions[qNum].correct);
            }
        }
        
        createQuestion(questions);
        
        $(".next").click(function (event) {
            event.preventDefault(); //This stops the form from submitting
            var qNum = $(this).closest("form").attr("id"); //This gives us the question number
            var userInput = $('input[name=' + qNum + ']:radio:checked').val(); //This grabs the user's selected answer
            if (counter > 1) {
                checkAnswer(userInput, qNum, questions);
                $("#" + qNum).hide();
                $("#" + qNum).next().show();
                counter--;
            } else if (counter == 1) {
                checkAnswer(userInput, qNum, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' questions correctly out of 10.');
                   for (j = 0; j < scoreAry.length; j++) {
                        if (scoreAry[j] === 0) {
                            console.log(questions[j].q, questions[j].a);
                            $("#questions").append('<p class="missed-' + j + '">You missed: ' + questions[j].q + ' ' + questions[j].a + '</p>');      
                        }
                    }
            } else {
                return false;
            }
        });
    }
});