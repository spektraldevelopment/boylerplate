module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        copy: {
            build: {
                cwd: "src",
                src: ["**"],
                dest: "app",
                expand: true
            }
        },
        clean: {
            build: {
                src: ["app"]
            },
            scripts: {
                src: ["app/js/*.js", "!app/js/main.min.js"]
                //You can add multiple ignore files
                //"build/*.js", "!build/NodeMaker-min.js", "!build/Files.js"
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: true
                },
                files: {
                    "app/js/main.min.js": ["app/js/main.js"]
                }
            }
        },
        watch: {
            build: {
                files: ["src/**"],
                tasks: ["build"],
                options: { livereload: true }
            },
            specs: {
                files: ["spec/**"],
                tasks: ["jasmine"],
                options: { livereload: true }
            }
        },
        connect: {
            server: {
                options: {
                    port: 4000,
                    base: "app",
                    hostname: "*"
                }
            }
        },
        jasmine: {
            pivotal: {
                src: "path-to-file",
                options: {
                    specs: "path-to-specs",
                    outfile: "SpecRunner.html",
                    keepRunner: true
                }
            }
        },
        ,
        notify: {
            reload: {
                options: {
                    title: 'Live Reload',
                    message: 'Changes made'
                }
            }
        },
        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: {
                    'app/css/main.css': 'src/css/main.scss'
                }
            }
        }
    });

    //EVENTS
     grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    //LOAD TASKS
    //Copies files from source folder to build folder - command: grunt copy
    grunt.loadNpmTasks("grunt-contrib-copy");
    //Wipes the build folder clean of files - command: grunt clean
    grunt.loadNpmTasks("grunt-contrib-clean");
    //Minifies files - command: grunt uglify
    grunt.loadNpmTasks("grunt-contrib-uglify");
    //Watch files for changes - command: grunt watch
    grunt.loadNpmTasks("grunt-contrib-watch");
    //Development server - command: grunt connect
    grunt.loadNpmTasks("grunt-contrib-connect");
    //Unit testing framework
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    //Sass compiler
    grunt.loadNpmTasks('grunt-contrib-sass');
    //Desktop notifier
    grunt.loadNpmTasks('grunt-notify');

    //REGISTER TASKS
    //Jasmine
    grunt.registerTask("test", ["jasmine"]);
    //Scripts
    grunt.registerTask("scripts", "Uglifies and copies the Javascript files.", ["uglify", "clean:scripts"]);
    //Build
    grunt.registerTask("build-and-test", "Compiles all of the assets and copies the files to the app directory.", ["clean:build", "copy", "scripts", "jasmine"]);
    //Build and Test
    grunt.registerTask("build", "Compiles all of the assets and copies the files to the app directory.", ["clean:build", "copy", "scripts"]);
    //Default - command: grunt default
    grunt.registerTask("default", "Watches the project for changes, automatically builds them and runs a server.", ["build", "connect", "watch"]);
};