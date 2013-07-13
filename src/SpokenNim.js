var say = require('say');
var through = require('through');
var Q = require('Q');

var voice = 'Daniel';
var coins = 17;

var deferred = Q.defer();
deferred.promise.then(
    function (voice, text) {
    	say.speak(voice, text);
});

deferred.resolve(voice, "Welcome to the game of Nim. In this game, we will start with a pile of " + coins + 
          " coins on the table. On each turn, you and I will alternately take between 1 and 3 coins" +
          " from the table. The player who takes the last coin loses.\n");
//deferred.resolve(voice, "How many coins will you take from the table to start?");

/* Play the Game */
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.pipe(through(bid,end));

function bid(data) {
    if (data > 3) {
        var val = data % 3 + 1;
        data = val;
    }
    coins -= data;
    if (coins <=1) {
        say.speak(voice, "I lose.");
        say.speak(voice, "You took " + data + ". Leaving " + coins + "left. I have no move.");
        this.pause();
        end();
    } else {
        var num = nextMove(coins);
        coins -= num;
        say.speak(voice, "You took " + data + ". I take " + num);
        say.speak(voice, "There are now " + coins + " coins left.");
        if (coins >1) {
            ("How many will you take now?");
        } else {
            ("Apparently, you have no moves left. This means that I, a simple computer, has beaten you!");
            this.pause();
            end();
        }
    }
}

function nextMove(coins) {
    var next = findGoodMove(coins);
    if (next < 0) {
        /* There are no good moves available, chose most conservative strategy */
        return 1;
    }
    return next;
}
    
function findGoodMove(test) {
  for (var i = 1; i <=3; i++) {
  	if (IsBadPosition(test - i)) {
        return i;
    }
  }
    return -1;
}
    
function IsBadPosition(nCoins) {
	if (nCoins == 1) return true;
    return (findGoodMove(nCoins) < 0);
}

function end() {
    say.speak(voice, "Our game is now over. Thank you for playing.");
    process.stdout.write("\n<<end>>\n\n");
}