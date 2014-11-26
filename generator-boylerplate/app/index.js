'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var destPath;

function getProjDir() {
    var split = destPath.split(/[ /]+/);
    return split[split.length - 1];
}

var BoylerplateGenerator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

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

    paths: function () {
        destPath = this.destinationRoot();
    },

    copyFiles: function() {
        var context = {
            buildPath:  getProjDir()
        };

        this.copy("gitignore", ".gitignore");

        this.template("_gruntfile.js", "Gruntfile.js", context);

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
