var fs = require('fs')
  , router = require('./generators/router')
  , controller = require('./generators/controllers')
  , view = require('./generators/views');

exports.name = "makomi-express-rendr" // FIXME: almost certainly possible to do introspection here, right?

// for creating the initial structure of the app
exports.initialize = require('./initializer.js').initialize

// generate the router, controller, models and views
exports.generate = function (sourceDir,outputDir,cb) {
  // GENERATE ALL THE THINGS
  // TODO: you should be able to substitute your own generators if you want
  // FIXME: error handling nonexistent

  // FIXME: this is really an idiom in node?
  var thingsToDo = 3;
  var didAThing = function() {
    thingsToDo--;
    if (thingsToDo == 0) cb();
  }

  var routingFile = sourceDir + "routes.json"
  router.generate(routingFile,outputDir,function(er) {
    didAThing()
  })

  var controllerDir = sourceDir + "controllers/"
  var controllerOutput = outputDir + "controllers/"
  fs.mkdir(controllerOutput,null,function() {
    controller.generate(controllerDir,controllerOutput,function(er) {
      didAThing()
    })
  })

  var viewDir = sourceDir + "views/"
  var viewOutput = outputDir + "views/"
  fs.mkdir(viewOutput,null,function() {
    view.generate(viewDir,viewOutput,function(er) {
      didAThing()
    })
  })

}

// render a specific route of the app, for previewing purposes
// (Requires that the app is correctly generated)
exports.render = require('./renderer.js').render