Say = require('ribbons.out.say.mac');
assert = require('assert');

// make it easy to see available voices
assert.equal(Say.noveltyVoices.length,14);
assert.equal(Say.femaleVoices.length,5);
assert.equal(Say.maleVoices.length,4);
assert.equal(Say.voices.length,23);

// match the defaultVoice to the default say command voice 
assert.equal(Say.defaultVoice,'Victoria');

// allow setting of default voice
assert.equal((new Say('Bubbles')).defaultVoice,'Bubbles');

// do not allow setting of an invalid voice
assert.throws(
  function() {new Say('Beaubien')},
  Error
);

// ensure command is as it should be
var vicki = new Say('Vicki');
vicki.init();
vicki.start();

assert.equal(vicki.say('Hi, how are you? I am Vicki.'),"say -v \"Vicki\" \"Hi, how are you? I am Vicki.\"" );

// check that it works with callback
assert.equal(vicki.say('Hi, how are you? I am Vicki.', function(){}),"say -v \"Vicki\" \"Hi, how are you? I am Vicki.\"" );

// allow overriding of default voice with each request
assert.equal(vicki.say('Hi, how are you? I am Bubbles','Bubbles'),"say -v \"Bubbles\" \"Hi, how are you? I am Bubbles\"");

// but don't allow overriding with an invalid voice
assert.throws(
  function() {(new Say()).say('Hi','Beaubien')},
  Error
);

setTimeout(function() {
  vicki.politelySay('I am polite.');
  vicki.politelySay('I wait for the previous speaker to finish', 'Fred');
  vicki.politelySay('yes, we are both polite.');
},4000);

setTimeout(function() {
  vicki.politelySay('good bye.');
},20000);

