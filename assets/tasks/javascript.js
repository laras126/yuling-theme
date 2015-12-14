module.exports = function(grunt, config) {
    
    var jsFileList = [
        config.jsVendorDir + 'jquery-2.1.4.min.js',
        config.jsSrcDir + 'plugins.js',
        config.jsSrcDir + '_main.js',
    ];  

    console.log(jsFileList);

	grunt.config.merge({
		
		jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
        
            all: [
                'Gruntfile.js',
                config.jsSrcDir + '*.js'
            ],
        },
        
		concat: {
	        options: {
	        },
	        dist: {
	            src: jsFileList,
	            dest: config.jsConcatDir + 'scripts.js',
	        },
	    },
		
	    uglify: {
	    	options: {
	    	},
			dist: {
	            files: {
					// For some reason this doesn't accept the config variable for the key. Bleh.
					'js/build/scripts.min.js': ['<%= concat.dist.dest %>']
	            }
	        }
	    },

	    watch: {
	    	js: {
				files: jsFileList,
				tasks: [
					'concat'
				]
	    	}
	    }

	});

}

