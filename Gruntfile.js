//Wrapper function with one parameter
module.exports = function(grunt) {

	// local variables
	var project = {
		bannerContent: '/*! <%= pkg.name %> <%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> \n' + ' *  License: <%= pkg.license %> */\n',
		name: '<%= pkg.name %>-<%= pkg.version%>',
		jqueryVersion: 'jquery-1.10.2.min.js',
		modernizrVersion: 'modernizr.custom.72109.js',
		concatJs: '<%= pkg.name %>.js',
		assetDir: 'assets/'
	};

	// configuration
	grunt.initConfig({

		// read from package.json
		pkg: grunt.file.readJSON('package.json'),

		// compile sass code
		compass: {
			dev: {
				options: {
					cssDir: project.assetDir + 'css',
					debugInfo: true,
					environment: 'development',
					fontsPath: project.assetDir + 'fonts',
					force: true,
					httpPath: "/",
					imagesDir: project.assetDir + 'img/',
					imagesPath: project.assetDir + 'img/',
					httpImagesPath: '../img/',
					javascriptsPath: project.assetDir + 'js',
					outputStyle: 'expanded',
					sassDir: 'src/sass',
					raw: 'preferred_syntax=:sass\n'
				}
			}
		},

		//concat files
		concat: {
			options: {
				banner: project.bannerContent
			},
			target: {
				src: ['<%= jshint.target.src %>'],
				ignores: ['src/javascript/jquery-1.10.2.min.js', 'src/javascript/modernizr.custom.72109.js'],
				dest: project.assetDir + 'js/' + project.concatJs
			}
		},

		//copy scripts
		copy: {
			default: {
				files: [
					//copy non concatinated scripts
					{ 
						expand: true, 
						cwd: 'src/javascript', 
						src: [ 
							project.jqueryVersion,
							project.modernizrVersion
						], 
						dest: project.assetDir + 'js/' },
				]
			}
		},

		// project wide javascript hinting rules
		jshint: {
			options: {
				browser: true, // set browser enviroment
				curly: true, // require curly braces around control structure
				eqeqeq: true, // prohibits the use of == and != in favor of === and !==
				forin: true, // requires all for in loops to filter object's items
				indent: 4, // tabsize should be 4 spaces
				jquery: true, // set jquery globals
				latedef: true, // never use vars before they are defined
				loopfunc: true, // no warnings about functions in loops
				trailing: true, // makes it an error to leave a trailing whitespace
				undef: true, // just use defined var, If your variable is defined in another file, you can use /*global ... */ directive to tell JSHint about it
				ignores: [ 'src/javascript/jquery-1.10.2.min.js', 'src/javascript/modernizr.custom.72109.js']
			},
			target: {
				src : ['src/javascript/**/*.js']
			}
		},

		// watch here
		watch: {
			js: {
				files: ['<%= jshint.target.src %>'],
				tasks: ['jshint', 'concat', 'copy'],
			},
			css: {
				files: ['src/sass/*.sass', 'src/sass/**/*.sass', 'src/sass/**/**/*.sass'],
				tasks: ['compass:dev']
			}
		}
	});

	// load node modules
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// register tasks here
	grunt.registerTask('default', ['jshint', 'compass:dev', 'concat', 'copy']);
};