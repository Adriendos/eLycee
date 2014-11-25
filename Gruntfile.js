module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: ['public/src/assets/js/*.js'],
        dest: 'public/dist/assets/js/app.concat.js'
      },
      css: {
        src: 'public/src/assets/css/*.css',
        dest: 'public/src/assets/css/app.concat.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/dist/assets/js/app.min.js': ['<%= concat.js.dest %>'],
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
	          dest: 'public/src/assets/css/',
	          ext: '.css'
	        }
	      ]
	    }
	  },
    autoprefixer: {
      // prefix the specified file
      single_file: {
        options: {
          map: true
        },
        src:  'public/src/assets/css/app.concat.css',
        dest: 'public/src/assets/css/app.concat.autoprefixed.css'
      }
    },
    cssmin: {
      minification: {
        files: [{
          expand: true,
          cwd: 'public/src/assets/css/',
          src: ['*.concat.autoprefixed.css', '!*.min.css'],
          dest: 'public/dist/assets/css/',
          ext: '.min.css'
        }]
      },
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name || pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          'public/dist/assets/css/app.min.css': ['public/src/assets/css/*.css']
        }
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: {
          port: 9000
        }
      },
      gruntfile: {
        files: ['css/README.md','Gruntfile.js'],
        //tasks: ['recess','shell']
        tasks: ['default']
      },                  
      stylesheets: {
      	//add more files here
        files: ['public/src/assets/less/*.less'],
        //tasks: ['recess','shell']
        tasks: ['less', 'concat:css', 'autoprefixer','cssmin']
      },
      scripts: {
        files: ['public/src/assets/js/*.js'],
        tasks: ['concat:js', 'uglify']
      },          
    }   

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['watch']);

};