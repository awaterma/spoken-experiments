var say = require('say');
var translate = require('translate');

translate.text('Yo quero tacos por favor', function(result){
  say.speak('Alex', result);
});