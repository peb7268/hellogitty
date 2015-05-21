'use strict';
//menu.js stuff
//https://gist.github.com/peb7268/203d84e3477ee301c32a

/*
 * Defining the Package
 */
var Module      = require('meanio').Module;
var Hellogitty  = new Module('hellogitty');
var Articles    = new Module('articles');
/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Hellogitty.register(function(app, auth, database, Articles) {
  app.set('views', __dirname + '/server/views');

  //We enable routing. By default the Package Object is passed to the routes
  Hellogitty.routes(app, auth, database);

  Hellogitty.aggregateAsset('css', 'hellogitty.css');

   Hellogitty.menus.add({
     title: 'theme example page',
     link: 'theme example page',
     menu: 'main'
   });

   Articles.menus.remove('Articles');


  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Hellogitty.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Hellogitty.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Hellogitty.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Hellogitty;
});
