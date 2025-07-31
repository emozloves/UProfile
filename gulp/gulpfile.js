    let gulp    = require("gulp")                   // استيراد الجلاب

    reName      = require("gulp-concat")            // استيراد ميزة التسمية

    fuCss3      = require("gulp-autoprefixer" )    	// استيراد ميزة مكملات الـ سي اس اس 3

    stylePug   	= require("gulp-pug")             	// استيراد ميزة دعم تقنية الباغ و ضغط الملفات

    styleSass   = require("gulp-sass")              // استيراد ميزة دعم تقنية الساس و ضغط الملفات

    minFily		  = require("gulp-uglify")			      // استيراد ميزة ضغط ملفات الجافا سكربت
	
	  minImgs 	  = require("gulp-image")		          // استيراد ميزة ضغط الصور

    //////////////////////////////////////////////////////////////////////////////////////////////////

    // task pug to html5

    gulp.task("pug-to-html5-0",function()
    {

		return gulp.src( "../pug/index.pug" )

		.pipe( stylePug({ pretty: true }) )

		.pipe( reName( "index.html" ) )

		.pipe( gulp.dest( "../templates" ) )

    });

    gulp.task("pug-to-html5-1",function()
    {

		return gulp.src( "../pug/login.pug" )

		.pipe( stylePug({ pretty: true }) )

		.pipe( reName( "login.html" ) )

		.pipe( gulp.dest( "../templates/partials" ) )

    });

    gulp.task("pug-to-html5-2",function()
    {

		return gulp.src( "../pug/check-email.pug" )

		.pipe( stylePug({ pretty: true }) )

		.pipe( reName( "check-email.html" ) )

		.pipe( gulp.dest( "../templates/partials" ) )

    });

    gulp.task("pug-to-html5-3",function()
    {

		return gulp.src( "../pug/create-new-pass.pug" )

		.pipe( stylePug({ pretty: true }) )

		.pipe( reName( "create-new-pass.html" ) )

		.pipe( gulp.dest( "../templates/partials" ) )

    });

    gulp.task("pug-to-html5-4",function()
    {

		return gulp.src( "../pug/register.pug" )

		.pipe( stylePug({ pretty: true }) )

		.pipe( reName( "register.html" ) )

		.pipe( gulp.dest( "../templates/partials" ) )

    });

    gulp.task("pug-to-html5-5",function()
    {

		return gulp.src( "../pug/profile.pug" )

		.pipe( stylePug({ pretty: true }) )

		.pipe( reName( "profile.html" ) )

		.pipe( gulp.dest( "../templates/partials" ) )

    });    

    //////////////////////////////////////////////////////////////////////////////////////////////////

    // task js to minjs

    gulp.task("js-to-minjs",function()
    {

		return gulp.src( "../*.js" )

		.pipe( minFily() )

		.pipe( reName( "project.js" ) )

		.pipe( gulp.dest( "static/js" ) )

    });
	
    //////////////////////////////////////////////////////////////////////////////////////////////////

    // task bigimage to minimage
	
    gulp.task("bigimage-to-minimage-header",function()
    {

		return gulp.src( "../images/*.*" )

		.pipe( minImgs() )

		.pipe( gulp.dest( "../static/images" ) )

    });

	//////////////////////////////////////////////////////////////////////////////////////////////////

    // task watch all file

    gulp.task("watch-all",function()
    {

		gulp.watch( "../pug/index.pug", 		          gulp.series( "pug-to-html5-0" 		      ) )

		gulp.watch( "../pug/login.pug", 		          gulp.series( "pug-to-html5-1" 		      ) )
		
    gulp.watch( "../pug/check-email.pug", 		    gulp.series( "pug-to-html5-2" 		      ) )
		
    gulp.watch( "../pug/create-new-pass.pug", 		gulp.series( "pug-to-html5-3" 		      ) )
		
    gulp.watch( "../pug/register.pug", 		        gulp.series( "pug-to-html5-4" 		      ) )

    gulp.watch( "../pug/profile.pug", 		        gulp.series( "pug-to-html5-5" 		      ) )

		gulp.watch( "../*.js",                        gulp.series( "js-to-minjs" 				            ) )

    gulp.watch( "../images/*.*", 	                gulp.series( "bigimage-to-minimage-header" 		) )

    });