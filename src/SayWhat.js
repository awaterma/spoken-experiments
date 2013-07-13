var through = require('through');
var say = require('say');
var voice = 'Daniel';

// input indicator 
process.stdout.write("Type in speech below. ["+voice+"]\n\n");

// resume stream processing
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.pipe(through(speak,end));

function speak(data) {
  say.speak(voice,data);
};

function end() {
  process.stdout.write('end');
}
