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
        },
        {
            name: 'desc',
            message: 'Enter a description:'
        },
        {
            type: 'confirm',
            name: 'useGumby',
            message: 'Would you like to use Gumby responsive framework?',
            default: false
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.desc = props.desc;
            this.useGumby = props.useGumby;
            done();
        }.bind(this));
    },

    createFolders: function() {

        this.mkdir("app");
        if (this.useGumby === true) {
            this.mkdir("app/sass")
        } else {
            this.mkdir("app/css");
        }
        this.mkdir("app/js");
        this.mkdir("app/img");
        this.mkdir("build");
        this.mkdir("release");
    },

    paths: function () {
        destPath = this.destinationRoot();
    },

    copyFiles: function() {
        var gruntContext = {
            buildPath:  getProjDir()
        };

        var htmlContext = {
            app_name: this.appName
        };

        this.copy("gitignore", ".gitignore");
        this.copy("_package.json", "package.json");
        this.copy("_main.js", "app/js/main.js");

        if (this.useGumby === true) {
            this.template("gumby/_gruntfile.js", "Gruntfile.js", gruntContext);
            this.directory("gumby/files/", "app", true);
            this.copy("gumby/_config.rb", "config.rb");
            this.template("gumby/_index.html", "app/index.html", htmlContext);

        } else {
            this.template("_gruntfile.js", "Gruntfile.js", gruntContext);
            this.copy("_main.scss", "app/css/main.scss");
            this.template("_index.html", "app/index.html", htmlContext);
        }

        this.template("_README.md", "README.md", htmlContext);
    },

    runNpm: function(){
        this.npmInstall("", function(){
            console.log("\nSetup Complete\n");
        });
    }

});

module.exports = BoylerplateGenerator;
