module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
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
	          cwd: 'public/assets/less',
	          // Compile each LESS component excluding "bootstrap.less", 
	          // "mixins.less" and "variables.less" 
	          src: ['*.less', '!{boot,var,mix}*.less'],
	          dest: 'public/assets/css/',
	          ext: '.css'
	        }
	      ]
	    }
	  },
    watch: {
        options: {
            spawn: false,
            livereload: true,
        },
        gruntfile: {
            files: ['css/README.md','Gruntfile.js'],
            //tasks: ['recess','shell']
            tasks: ['less','shell']
        },                  
        stylesheets: {
        	//add more files here
            files: ['public/assets/less/*.less'],
            //tasks: ['recess','shell']
            tasks: ['styles']
        }           
    }   

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('styles', ['less']);

  grunt.registerTask('default', ['concat', 'uglify']);

};