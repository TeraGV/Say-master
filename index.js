const COMMAND = 'powershell'
var spawn = require("child_process").spawn,child;
var say = function(msg, speed) {
  let args = []
  let pipedData = ''
  let options = {}
  let psCommand = `Add-Type -AssemblyName System.speech;$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer;`
  let adjustedSpeed = convertSpeed(speed || 1)
      psCommand += `$speak.Rate = ${adjustedSpeed};`
      psCommand += `$speak.Speak('`+msg+`')`
      pipedData += msg
      args.push(psCommand)
      options.shell = true
  
//  console.log(msg);
//  console.log(adjustedSpeed);
  
child = spawn("powershell.exe",args);
child.stdout.on("data",function(data){
    console.log("Powershell Data: " + data);
});
child.stderr.on("data",function(data){
    console.log("Powershell Errors: " + data);
});
child.on("exit",function(){
//    console.log("Powershell Script finished");
});
child.stdin.end(); //end input
  return {command: COMMAND, args, pipedData, options}
};

var convertSpeed = function(speed){
  return Math.max(-10, Math.min(Math.round((9.0686 * Math.log(speed)) - 0.1806), 10))
  
}
module.exports.say = say;