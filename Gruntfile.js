module.exports = function (grunt) {
    grunt.initConfig({
        clean: ['dist', 'build'],

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/images/', src: '**/*', dest: 'dist/images/'},
                    {expand: true, cwd: 'src/fonts/', src: '**/*', dest: 'dist/fonts/'},
                    {expand: true, flatten: true, src: ['src/seo/*'], dest: 'dist/', filter: 'isFile'}
                ],
            },
        },

        sass: {
            main: {
                files: [
                    {'build/main.css': 'src/sass/main.scss'}
                ]
            },
        },

        cssmin: {
            app: {
                src: ['build/main.css'],
                dest: 'dist/css/app.min.css'
            }
        },

        htmlbuild: {
          dist: {
            src: ['./src/html/*.html'],
            dest: './build/',
            options: {
              beautify: true,
              relative: true,
              basePath: false,
          sections: {
                layout: {
                  header: './src/templates/header.html',
                  footer: './src/templates/footer.html',
                  navigation: './src/templates/navigation.html',
                }
              },
            }
          }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'build',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('cleanup', ['clean', 'copy']);
    grunt.registerTask('css', ['sass:main', 'cssmin']);
    grunt.registerTask('html', ['htmlbuild', 'htmlmin']);
    grunt.registerTask('default', ['cleanup','css', 'html']);
};