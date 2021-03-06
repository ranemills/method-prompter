'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    concat: {
      js: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/tether/dist/js/tether.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/angular/angular.js',
          'bower_components/lodash/dist/lodash.js'
        ],
        dest: 'dist/third-party.js'
      },
      css: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css'
        ],
        dest: 'dist/third-party.css'
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'dist/app.js': 'src/scripts/app.js',
          'dist/sw.js': 'src/scripts/sw.js',
          'dist/serviceworker-cache-polyfill.js': 'src/scripts/serviceworker-cache-polyfill.js'
        }
      }
    },
    copy: {
      html: {
        expand: true,
        cwd: 'src/html',
        src: '**',
        dest: 'dist/'
      },
      resources: {
        expand: true,
        cwd: 'src/resources',
        src: '**',
        dest: 'dist/'
      }
    },
    watch: {
      scripts: {
        files: ['src/scripts/*.js'],
        tasks: ['babel'],
        options: {
          livereload: true
        }
      },
      resources: {
        files: ['src/resources/*'],
        tasks: ['copy:resources'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['src/html/**/*.html', 'src/html/index.html'],
        tasks: ['copy:html'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['babel', 'concat:js', 'concat:css', 'copy']);
  grunt.registerTask('serve', ['default', 'watch']);

};