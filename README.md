#boylerplate
===========

My personal boilerplate files for new projects.

##Setting up boylerplate for a new project

1. cd into root directory of where you want to start your project. ex. a newly created git repo

2. In CLI run:
```shell
bower install boylerplate
```
> Files will be initially installed into 'bower_components/boylerplate'

3. cd into 'bower_components/boylerplate'

4. In CLI run:
```shell
npm install
```
> In order for grunt to work, we must first install required node packages

5. On node packages have been installed run the following:
```shell
grunt root
```
> This will copy everything in 'bower_components/boylerplate' into the root directory of your project

6. cd back into the root directory of your project:
```shell
cd ../../
```

7. Finally run:
```shell
grunt clean-bower
```
> This will remove bower_components/boylerplate and remove boylerplate's bower.json file
