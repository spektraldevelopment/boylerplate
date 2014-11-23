'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var BoylerplateGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        console.log('path: ' + path);

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            done();
        }.bind(this));
    },

    createFolders: function() {
        this.mkdir("app");
        this.mkdir("app/css");
        this.mkdir("app/js");
        this.mkdir("app/img");
        this.mkdir("build");
        this.mkdir("release");
    },

    copyFiles: function() {
        this.copy(".gitignore", ".gitignore")
        this.copy("_gruntfile.js", "Gruntfile.js");
        this.copy("_package.json", "package.json");
        this.copy("_main.js", "app/js/main.js");
        this.copy("_main.scss", "app/css/main.scss");
        this.copy("_index.html", "app/index.html");
    },

    runNpm: function(){
        this.npmInstall("", function(){
            console.log("\nSetup Complete\n");
        });
    }

});

module.exports = BoylerplateGenerator;
