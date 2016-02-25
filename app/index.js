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
            name: 'gitUrl',
            message: 'Enter the git url: '
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.desc = props.desc;
            this.gitUrl = props.gitUrl;
            done();
        }.bind(this));
    },

    createFolders: function() {
        this.mkdir("src/img");
    },

    paths: function () {
        destPath = this.destinationRoot();
    },

    copyFiles: function() {

        var packageContext = {
            app_name: this.appName,
            desc: this.desc,
            gitUrl: this.gitUrl
        };

        var htmlContext = {
            app_name: this.appName
        };

        //Root files
        this.copy("gitignore", ".gitignore");
        this.template("_package.json", "package.json", packageContext);
        this.template("_gulpfile.js", "gulpfile.js");
        this.template("_README.md", "README.md", htmlContext);

        //SRC files
        //JS
        this.copy("_main.js", "src/js/main.js");
        //SASS
        this.copy("_mixins.scss", "src/sass/mixins.scss");
        this.copy("_config.scss", "src/sass/config.scss");
        this.copy("_main.scss", "src/sass/main.scss");
        //HTML
        this.template("_index.html", "src/index.html", htmlContext);
    },

    runNpm: function(){
        this.npmInstall("", function(){
            console.log("\nSetup Complete\n");
        });
    }

});

module.exports = BoylerplateGenerator;
