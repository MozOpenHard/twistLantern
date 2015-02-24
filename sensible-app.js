// sensible server which advertises itself via Bonjour

// NODE INCLUDES

var	dgram = require ("dgram");
var	fs = require ("fs");
var	http = require ("http");
var	os = require ("os");
var	url = require ("url");

// REGULAR JS INCLUDES

// assume that sensible.js lives in the same directory as our mainline
var	code = fs.readFileSync (require ("path").dirname (process.argv [1]) + "/sensible.js");
eval (code.toString ());

// MAINLINE

sensible.ApplicationFactory.createApplication
(
	function (inError)
	{
		if (inError)
		{
			console.error ("error during sensible application startup");
			console.error (inError);
		}
		else
		{
			console.log ("sensible application startup");
		}
	}
);

// called just before sensible.Application.start()
sensible.node.Application.prototype.onBeforeStart = function (inCallback)
{
	console.log ("node.Application.onBeforeStart()");
	
	inCallback ();
}

// called just after sensible.Application.start()
sensible.node.Application.prototype.onAfterStart = function (inCallback)
{
	console.log ("node.Application.onAfterStart()");
	
	inCallback ();
}

//----------------------------------------------




