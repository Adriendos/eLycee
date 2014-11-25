module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['public/src/assets/js/*.js'],
        dest: 'public/dist/assets/js/app.concat.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/dist/assets/js/app.min.js': ['<%= concat.dist.dest %>'],
          src: ['public/dist/assets/js/app.concat.js']
          // dest: 'public/dist/assets/js/<%= pkg.name %>.js'
        }
      }
    },
    less: {
	    // Compile all targeted LESS files individually
	    components: {
	      options: {
	        imports: {
	          // Use the new "reference" directive, e.g.
	          // @import (reference) "variables.less";
	          //reference: [
	          //  "bootstrap/mixins.less", 
	          //  "bootstrap/variables.less" 
	          //]
	        }
	      },
	      files: [
	        {
	          expand: true,
	          cwd: 'public/src/assets/less/',
	          // Compile each LESS component excluding "bootstrap.less", 
	          // "mixins.less" and "variables.less" 
	          src: ['*.less', '!{boot,var,mix}*.less'],
	          dest: 'public/dist/assets/css/',
	          ext: '.css'
	        }
	      ]
	    }
	  },
    watch: {
        options: {
            spawn: false,
            // livereload: true,
        },
        gruntfile: {
            files: ['css/README.md','Gruntfile.js'],
            //tasks: ['recess','shell']
            tasks: ['less','shell']
        },                  
        stylesheets: {
        	//add more files here
            files: ['public/src/assets/less/*.less'],
            //tasks: ['recess','shell']
            tasks: ['styles']
        },
        scripts: {
          files: ['public/src/assets/js/*.js'],
          tasks: ['concat', 'uglify'],
          options: {
            spawn: false,
          },
        },          
    }   

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('styles', ['less']);

  grunt.registerTask('default', ['watch']);

};