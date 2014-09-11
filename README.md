HTML/Bootstrap Starter Kit
=================

This is a simple HTML starter kit that includes [Twitter Bootstrap](http://getbootstrap.com)

## Gulp
[Gulp](http://gulpjs.com) has been set up to compile SCSS, LESS, JavaScript and create sprites.

To get started with [Gulp](http://gulpjs.com) you will firstly need to install [Node.js](http://nodejs.org/download/)
on to your system. Visit [Node.js](http://nodejs.org/download/) for installation instructions.

Once you have this installed open up your terminal and navigate into the folder where you installed this starter
kit and type ```npm install``` this will install all the necessary packages that gulp relies on. Once that has finished you will be ready to run gulp.
To run gulp type ```gulp``` into the your terminal window, this will tell gulp to watch for any changes and re-compile all SCSS and JavaScript.

The gulpfile is setup to compile SCSS by default, if you would prefer to use less you need to change the following lines,
replacing _scss_ with _less_, and replace _sprite_ with _sprite_less_ or just copy and replace the code below with the LESS version.

### original version
```js
gulp.task('watch', ['sprite', 'scss', 'scripts'], function(){
  gulp.watch(paths.scss.src, ['scss']).on('change', function(evt) {
    changeEvent(evt);
  });
  gulp.watch(paths.scripts.src, ['scripts']).on('change', function(evt) {
    changeEvent(evt);
  });
});
```

### LESS version
```js
gulp.task('watch', ['sprite_less', 'less', 'scripts'], function(){
  gulp.watch(paths.scss.src, ['less']).on('change', function(evt) {
    changeEvent(evt);
  });
  gulp.watch(paths.scripts.src, ['scripts']).on('change', function(evt) {
    changeEvent(evt);
  });
});


gulp.task('default', ['less', 'scripts', 'watch']);
```

## Sprites
To create sprites places images in to the _sprites_ folder located within assets/imgs, all images in this folder will be combined and
added to sprite.png.

A new SASS or LESS file will also be created called _sprite.scss or _sprite.less you need to make sure you @import this file into style.scss or style.less file if its not already added.

To use one of the sprites you need to call use one of the following code blocks depending on language, replacing
_insert image name variable_ with the variable name for you image which you can find in the _sprite file.

```css
.example {
  @include sprite(insert image name variable); // SASS version
}

.example {
  .sprite(insert image name varible); // LESS version
}

```

## Meta Tags
The index.html file has been created with all the meta tags that you are likely
to need as well as social tags for Twitter, Facebook and Google+. Have a look through index.html
and delete any that you do not need.

## Google Analytics
Asynchronous google analytics code has been added into app.js which is located in the assets/js folder
you will need to change UA-XXXXX-X to your own code.
