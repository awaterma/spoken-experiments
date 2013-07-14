var Say = require('ribbons.out.say.mac');
var through = require('through');

var voice = 'Vicki';
var coins = 17;

var spkr = new Say(voice);
spkr.init();
spkr.start();

spkr.politelySay("Welcome to the game of Nim.");
spkr.politelySay("In this game, we will start with a pile of " + coins + 
	" coins on the table.");
spkr.politelySay("On each turn, you and I will alternately take between 1 and 3 coins" +
          " from the table.");
spkr.politelySay("The player who takes the last coin loses.\n");
spkr.politelySay("How many coins will you take from the table to start?");
      
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
        spkr.politelySay(voice, "I lose.");
        spkr.politelySay("You took " + data + ". Leaving " + coins + "left. I have no move.");
        this.pause();
        end();
    } else {
        var num = nextMove(coins);
        coins -= num;
        spkr.politelySay("You took " + data + ". I take " + num);
        spkr.politelySay("There are now " + coins + " coins left.");
        if (coins >1) {
            spkr.politelySay("How many will you take now?");
        } else {
            spkr.politelySay("Apparently, you have no moves left. This means that I, a simple computer, has beaten you!");
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
    spkr.politelySay("Our game is now over. Thank you for playing.");
    process.stdout.write("\n<<end>>\n\n");
}
