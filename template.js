'use strict';

exports.description = 'Quickly scaffold a back-end LNMX project';

exports.after = 'You should now install project dependencies with _npm ' +
'install_.  You can then hint and test your project with _grunt_. You will ' +
'probably also want to look into building a Vagrantfile for yourself.  Someday ' +
'I will be able to do that for you.';

exports.warnOn = '*';

exports.template = function(grunt, init, done) {
	init.process({}, [
		init.prompt('name'),
		init.prompt('title'),
		init.prompt('description'),
		init.prompt('version'),
		init.prompt('main'),
		init.prompt('repository'),
	    init.prompt('homepage'),
	    init.prompt('bugs')
	], function(err, props) {
		var files = init.filesToCopy(props);
		props.projectRoot = props.main.split('/').shift();
		grunt.file.mkdir(props.projectRoot);
		grunt.file.mkdir('test');
		grunt.file.mkdir('test/'+ props.projectRoot);
		init.copyAndProcess(files, props);
		init.writePackageJSON('package.json', {
			name: props.name,
			description: props.description,
			version: props.version,
			main: props.main,
			npm_test: 'grunt',
			repository: props.repository,
			bugs: props.bugs,
			devDependencies: {
				"blanket": "^1.1.6",
			    "grunt": "^0.4.5",
			    "grunt-contrib-jshint": "^0.10.0",
			    "grunt-env": "^0.4.1",
			    "grunt-mocha-test": "^0.11.0",
			    "mocha": "^1.21.4",
			    "should": "^4.0.4",
			    "travis-cov": "^0.2.5"
			},
		});
		done();
	});
};