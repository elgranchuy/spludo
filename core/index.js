/*
 * This file is part of the Spludo Framework.
 * Copyright (c) 2009 DracoBlue, http://dracoblue.net/
 *
 * Licensed under the terms of MIT License. For the full copyright and license
 * information, please see the LICENSE file in the root folder.
 */

var sys = require('sys');
var http = require('http');
var posix = require('posix');

process.isFunction = function(object) {
    return (typeof object == "function") ? true : false;
}

require("./Options");
require("./Logging");
require("./Controller");
require("./ControllerManager");

controller_manager = new ControllerManager();
controller_manager.loadControllers("./");

require("./JsView");
require("./HtmlView");
require("./ViewManager");

view_manager = new ViewManager();
view_manager.loadViews("./");

var module_names = [];

posix.readdir("./modules").addCallback(function(contents) {
    module_names = contents;
}).wait();

/*
 * For each module, load what needs to be loaded.
 */
for (var i=0; i<module_names.length; i++) {
    var module_name = module_names[i];
    
    controller_manager.loadControllers("./modules/" + module_name);
    view_manager.loadViews("./modules/" + module_names, module_name);
}

require("./Application");