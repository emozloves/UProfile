$(document).ready(function()
{
    // ضبط خواص حماية الموقع من هجمات CSRF 

    let csrfToken = $("meta[name='csrf-token']").attr("content");
    
    $.ajaxSetup(
    {
        headers:
        {
            "X-CSRFToken": csrfToken
        }
    });
        
    // نهاية ضبط خواص حماية الموقع من هجمات CSRF 

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص اظهار البروفايل بعد تحديث الصفحة في حال كان المستخدم مسجل للدخول

    $.get("/getData",function(data)
    {
        if( data.status === "success" )
        {          
            $(document).find(".parts-bottom").load( "/profile .profile",function()
            {
                $(document).find(".bubble p").text( "welcome!" ) // تعديل فاعة الترحيب بنص مناسب

                $(document).find("#profile-cover-image").attr("src", data.cover + "?t=" + Date.now())
                
                $(document).find("#profile-user-image").attr("src", data.photo + "?t=" + Date.now())
                
                $(document).find("#profile-user-id").text( `#${data.userId}` )
                
                $(document).find("#profile-username").text( data.username )
            });
        }
        
        else
        {
            $(document).find(".parts-bottom").load( "/login #login-form" )
        }
    });

    // نهاية ضبط خواص اظهار البروفايل بعد تحديث الصفحة في حال كان المستخدم مسجل للدخول

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص فورم تسجيل الدخول

    // ضبط خواص الانبوتات عند الكتابة

    $(document).on("keyup keypress","#login-input-email",function()
    {
        $(document).find(".bubble p").text( "hi!" ) // تعديل فاعة الترحيب بنص مناسب

        $(this).parent().find("i").fadeOut(1) // اخفاء ايقونة الخطأ
        
        $(this).parent().css("border-bottom","2px solid #212646") // اعادة الاطار السفلي الى الوضع الافتراضي
    });

    $(document).on("keyup keypress","#login-input-password",function()
    {
        $(this).parent().find("#login-if-password").fadeOut(1) // اخفاء ايقونة اشارة الخطأ

        $(this).parent().css("border-bottom","2px solid #212646") // اعادة الاطار السفلي الى الوضع الافتراضي
    });

    // نهاية ضبط خواص الانبوتات عند الكتابة

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص خيار اظهار و اخفاء الباسورد

    $(document).on("click","#login-show-or-hidden-pass",function()
    {
        let checkThisIcon = $(this)                             // اختصار هذه الايقونة

        if( checkThisIcon.hasClass("icon-hidden-pass") )        // في حال كان كلاس هذه الايقونة بهذا الشكل فـ هذا يعني ان الباسورد مخفي و عليه فـ طبق التالي
        {
            checkThisIcon.removeClass("icon-hidden-pass")       // حذف كلاس هذه الايقونة

            checkThisIcon.addClass("icon-show-pass")            // اضافة كلاس جديد لهذه الايقونة

            $("#login-input-password").attr("type","text")      // تعديل نوع الانبوت لكي تظهر كلمة السر
        }

        else
        {
            checkThisIcon.removeClass("icon-show-pass")         // حذف كلاس هذه الايقونة

            checkThisIcon.addClass("icon-hidden-pass")          // اضافة كلاس جديد لهذه الايقونة

            $("#login-input-password").attr("type","password")  // تعديل نوع الانبوت لكي يتم اخفاء كلمة السر
        }
    });

    // نهاية ضبط خواص خيار اظهار و اخفاء الباسورد

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص خيار اظهار فورم التسجيل بحساب جديد

    $(document).on("click","#dont-have-account",function(e)
    {
        e.preventDefault()
        
        $(document).find(".parts-bottom").load( "/register #reg-form",function()
        {
            $(document).find(".bubble p").text( "register!" ) // تعديل فاعة الترحيب بنص مناسب

            console.log( "register form is show ^_^" )
        });
    });

    // نهاية ضبط خواص خيار اظهار فورم التسجيل بحساب جديد

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص اظهار فورم التحقق من الايميل

    $(document).on("click","#forget-password",function(e)
    {
        e.preventDefault()
        
        $(document).find(".parts-bottom").load( "/checkEmails #check-email-form",function()
        {
            $(document).find(".bubble p").text( "check it!" ) // تعديل فاعة الترحيب بنص مناسب

            console.log( "check Email form is show ^_^" )
        });
    });

    // نهاية ضبط خواص اظهار فورم التحقق من الايميل

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر تسجيل الدخول

    $(document).on("click","#login-form",function(e)
    {
        e.preventDefault()

        let checkThisInfos      = $(this).serialize()           // اختصار معلومات هذا الفورم

        let checkInputEmail     = $("#login-input-email")       // اختصار انبوت اسم المستخدم

        let checkInputPassword  = $("#login-input-password")    // اختصار انبوت كلمة السر

        ////////////////////////////////////////////////////////////////////////////////

        // في حال كان انبوت الايميل او كلمة السر فارغين فـ لا تسجل و اظهر اطار اسفل الانبوت الفارغ

        if( checkInputEmail.val() === "" )
        {
            checkInputEmail.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        if( checkInputPassword.val() === "" )
        {
            checkInputPassword.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        ////////////////////////////////////////////////////////////////////////////////

        else
        {
            $.post("/logins",checkThisInfos,function(res)
            {
                if( res.status === "success" )
                {
                    $(document).find(".parts-bottom").load( "/profile .profile",function()
                    {
                        $(document).find(".bubble p").text( "welcome!" ) // تعديل فاعة الترحيب بنص مناسب
                        
                        $(document).find("#profile-cover-image").attr("src", res.photo + "?t=" + Date.now()) // تم عكس القيم للتخلص من غلتيش في الصفحة

                        $(document).find("#profile-user-image").attr("src", res.cover + "?t=" + Date.now()) // تم عكس القيم للتخلص من علتيش في الصفحة
                        
                        $(document).find("#profile-user-id").text( `#${res.userId}` )
                        
                        $(document).find("#profile-username").text( res.username )

                        console.log( "profile is show ^_^" )
                    });
                }

                else
                {
                    $(document).find(`#${res.message}`).fadeIn(1)
                }
            });
        }
    });

    // نهاية ضبط خواص زر تسجيل الدخول

    // نهاية ضبط خواص فورم تسجيل الدخول

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص فورم التحقق من الايميل قبل المضي قدما في تعديل الباسورد

    // ضبط خواص التحقق من الايميل اثناء الكتابة

    let typingTimer

    $(document).on("input","#check-input-email",function(e)
    {
        let checkThisInput = $(this) // اختصار هذا الزر - ملاحظة لن تعمل ثيس في البوست لذلك وضعتها في متغير

        let checkThisInfos = $(this).closest("form").serialize() // اختصار معلومات فورم هذا الزر

        typingTimer = setTimeout(function() // فانكشن مهمة في التخلص من اي مشاكل غير متوقعة عند الارسال و الاستلام من السيرفر
        {
            $.post("/checkEmail",checkThisInfos,function(res)
            {
                checkThisInput.parent().find("i").fadeIn(1) // اظهار ايقونة الايميل صحيح او خاطئ

                checkThisInput.parent().find("i").attr("class",res.message) // طباعة الرسالة استنادا على الاستعلام المرسل سواء الايميل صح او خطأ
            });

        }, 100);
    });

    // نهاية ضبط خواص التحقق من الايميل اثناء الكتابة

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص العودة الى فورم تسجيل الدخول

    $(document).on("click","#back-to-login-step-1",function(e)
    {
        e.preventDefault()
        
        $(document).find(".parts-bottom").load( "/login #login-form",function()
        {
            console.log( "login form is show ^_^" )
        });
    });
    
    // نهاية ضبط خواص العودة الى فورم تسجيل الدخول

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر التحقق و الانتقال الى فورم انشاء الباسورد

    $(document).on("submit","#check-email-form",function(e)
    {
        e.preventDefault()

        checkEmailInput     = $(this).find("input")                 // اختصار انبوت الايميل

        checkThisInfos      = $(this).serialize()                   // اختصار معلومات هذا الفورم

        $.post("/checkEmail",checkThisInfos,function(res)
        {
            if( res.status === "success" )
            {
                $(document).find(".parts-bottom").load( "/createNewPass #new-password-form",function()
                {
                    $(document).find(".bubble p").text( "create!" ) // تعديل فاعة الترحيب بنص مناسب

                    // انشاء انبوت و حقنه بـ الايميل المتحقق منه و ذلك لكي نستخدمه فيما بعد عند تعديل الباسورد في البايثون

                    $(document).find("#new-password-form").prepend(`
                        <input id="correct-email" type="text" name="email" value="${checkEmailInput.val()}" />`)

                    console.log( "login form is show ^_^" )
                });
            }

            else
            {
                $(document).find("#check-if-email").fadeIn(1)       // اظهار ايقونة هل الايميل صحيح او لا

                $(document).find("#check-if-email").attr("class",res.message)
            }
        });
    });

    // نهاية ضبط خواص زر التحقق و الانتقال الى فورم انشاء الباسورد

    // نهاية ضبط خواص فورم التحقق من الايميل قبل المضي قدما في تعديل الباسورد

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // ضبط خواص فورم انشاء الباسورد
    
    // ضبط خواص التحقق من جودة الباسورد اثناء الكتابة
    
    $(document).on("keyup keypress","#pass-input-password",function()
    {
        let checkThisInput      = $(this)                               // اختصار هذا الانبوت

        let checkIcon           = $("#pass-if-password")                // اختصار الايقونة الدالة على قوة او ضعف كلمة السر

        let checkMessPassword   = $(".pass-instructions")               // اختصار رسالة التوضحيات الخاصة بشروط كلمة السر المسموحة

        if( checkThisInput.val() === "" )                               // في حال كان الانبوت فارغ فـ قم بما يلي
        {
            checkIcon.fadeOut(1)                                        // اخفاء الايقونة التي تدل على قوة او ضعف كلمة السر

            checkMessPassword.slideUp(50)                               // اخفاء رسالة توضيحات شروط كلمة السر

            checkThisInput.parent().css("border-bottom","2px solid #212646") // اعادة اطار هذا الانبوت الى الوضع الافتراضي

            checkMessPassword.find("li").css({                          // ازالة الخط من على جميع الشروط - لعدم تحققهم

                "text-decoration":"unset"
            });

            return
        }

        //////////////////////////////////////////////////////////////////////
        
        if( checkThisInput.val().length < 8 )                           // في حال كان عدد الحروف في الانبوت اقل من 6 فـ طبق ما يلي
        {
            checkIcon.fadeIn(1)                                         // اظهار ايقونة التي تدل على ضعف كلمة السر

            checkMessPassword.slideDown(150)                            // اظهار رسالة التوضيحات

            checkIcon.removeClass("icon-check")                         // تحسبا - احذف كلاس ايقونة كلمة السر قوية

            checkIcon.addClass("icon-no")                               // تحسبا - اضف كلاس كلمة السر ضعيفة

            checkIcon.css("color","#ea4141")                            // تحسبا - عدل لون الايقونة ليصبح اللون الدال على ضعف كلمة السر

            checkThisInput.parent().css("border-bottom","2px solid #ea4141") // اضف اطار سفلي لهذا الانبوت

            checkMessPassword.find("li:eq(0)").css({                    // ازالة الخط من على الشرط الاول - لعدم تحققه

                "text-decoration":"unset"
            });

            return
        }

        //////////////////////////////////////////////////////////////////////
        
        if( checkThisInput.val().length >= 8 )                          // في حال كان عدد الحروف في الانبوت اكثر او يساوي 6 فـ طبق ما يلي
        {
            checkIcon.fadeIn(1)                                         // اظهار ايقونة التي تدل على ضعف كلمة السر

            checkMessPassword.find("li:eq(0)").css({                    // وضع خط على الشرط الاول في التوضيحات - ملاحظة : الخط يعني تحقق الشرط

                "text-decoration":"line-through"
            });
        }

        //////////////////////////////////////////////////////////////////////
        
        if( !checkThisInput.val().match(/[a-z]/g) )                     // في حال لم يتم كتابة احرف صغيرة فـ طبق ما يلي
        {
            checkIcon.fadeIn(1)                                         // اظهار ايقونة التي تدل على ضعف كلمة السر

            checkIcon.removeClass("icon-check")                         // تحسبا - احذف كلاس ايقونة كلمة السر قوية

            checkIcon.addClass("icon-no")                               // تحسبا - اضف كلاس كلمة السر ضعيفة

            checkIcon.css("color","#ea4141")                            // تحسبا - عدل لون الايقونة ليصبح اللون الدال على ضعف كلمة السر

            checkThisInput.parent().css("border-bottom","2px solid #ea4141") // اضف اطار سفلي لهذا الانبوت

            checkMessPassword.find("li:eq(1)").css({                    // ازالة الخط من على الشرط الثاني لعدم تحققه

                "text-decoration":"unset"
            }); 
            
            return
        }

        //////////////////////////////////////////////////////////////////////
        
        if( !checkThisInput.val().match(/[A-Z]/g) )                     // في حال لم يتم كتابة احرف كبيرة فـ طبق ما يلي
        {
            checkIcon.fadeIn(1)                                         // اظهار ايقونة التي تدل على ضعف كلمة السر

            checkIcon.removeClass("icon-check")                         // تحسبا - احذف كلاس ايقونة كلمة السر قوية

            checkIcon.addClass("icon-no")                               // تحسبا - اضف كلاس كلمة السر ضعيفة

            checkIcon.css("color","#ea4141")                            // تحسبا - عدل لون الايقونة ليصبح اللون الدال على ضعف كلمة السر

            checkThisInput.parent().css("border-bottom","2px solid #ea4141") // اضف اطار سفلي لهذا الانبوت

            checkMessPassword.find("li:eq(1)").css({                    // ازالة الخط من على الشرط الثاني لعدم تحققه

                "text-decoration":"unset"
            });             

            return
        }

        //////////////////////////////////////////////////////////////////////

        if( !checkThisInput.val().match(/[0-9]/g) )                     // في حال لم يتم كتابة ارقام فـ طبق ما يلي
        {
            checkIcon.fadeIn(1)                                         // اظهار ايقونة التي تدل على ضعف كلمة السر

            checkIcon.removeClass("icon-check")                         // تحسبا - احذف كلاس ايقونة كلمة السر قوية

            checkIcon.addClass("icon-no")                               // تحسبا - اضف كلاس كلمة السر ضعيفة

            checkIcon.css("color","#ea4141")                            // تحسبا - عدل لون الايقونة ليصبح اللون الدال على ضعف كلمة السر

            checkThisInput.parent().css("border-bottom","2px solid #ea4141") // اضف اطار سفلي لهذا الانبوت

            checkMessPassword.find("li:eq(1)").css({                    // ازالة الخط من على الشرط الثاني لعدم تحققه

                "text-decoration":"unset"
            }); 

            return
        }

        if( checkThisInput.val().match(/[a-zA-Z0-9]/g) && !checkThisInput.val().match(/\w+W+/g) ) // في حال تم كتابة كل ما سبق بدون حروف مميزة فـ ...
        {
            checkIcon.removeClass("icon-no")                            // حذف كلاس ايقونة الكلمة ضعيفة

            checkIcon.addClass("icon-check")                            // اضافة كلاس ايقونة الكلمة القوية

            checkIcon.css("color","#7397fb")                          // تعديل لون الايقونة ليتناسب مع مستوى هذه القوة

            checkThisInput.parent().css("border-bottom","2px solid #212646") // اعادة اطار هذا الانبوت الى الوضع الافتراضي

            checkMessPassword.find("li:eq(1)").css({                    // وضع خط على الشرط الثاني في التوضيحات - ملاحظة : الخط يعني تحقق الشرط

                "text-decoration":"line-through"
            });

            checkMessPassword.find("li:eq(2)").css({                    // ازالة الخط من على الشرط الثالث لعدم تحققه

                "text-decoration":"unset"
            });            
        }

        //////////////////////////////////////////////////////////////////////

        let shortRuls = checkThisInput.val().match(/\W+\w+\W+/g) || checkThisInput.val().match(/\w+\W+/g) || checkThisInput.val().match(/\W+\w+/g)

        if( shortRuls )                                                 // في حال تم كتابة كل ما سبق مع حروف مميزة فـ طبق ما يلي
        {
            checkIcon.css("color","#5bce93")                          // تعديل لون الايقونة ليتناسب مع مستوى هذه القوة

            checkMessPassword.find("li:eq(2)").css({                    // وضع خط على الشرط الثالث في التوضيحات - ملاحظة : الخط يعني تحقق الشرط

                "text-decoration":"line-through"
            });
        }        
    });

    $(document).on("keyup keypress","#pass-input-repassword",function()
    {
        let checkThisInput          = $(this)                           // اختصار هذا الانبوت

        let checkInputOrgPassword   = $("#pass-input-password")         // اختصار انبوت الاول لكلمة السر

        let checkIcon               = $("#pass-if-repassword")          // اختصار ايقونة تطابق او عدم تطابق كلمة السر

        if( checkThisInput.val() === "" )                               // في حال كان الانبوت فارغ فـ قم بما يلي
        {
            checkIcon.fadeOut(1)                                        // اخفاء الايقونة التي تدل على عدم توافق كلمة السر

            checkIcon.removeClass("icon-check")                         // حذف كلاس ايقونة ان هذه الكلمة متطابقة

            checkIcon.addClass("icon-no")                               // اضافة كلاس ايقونة ان هذه الكلمة غير متطابقة

            checkIcon.css("color","#ea4141")                          // اضافة لون احمر للايقونة

            checkThisInput.parent().css("border-bottom","2px solid #212646") // اعادة اطار هذا الانبوت الى الوضع الافتراضي

            return
        }

        //////////////////////////////////////////////////////////////////////

        if( checkThisInput.val() !== checkInputOrgPassword.val() )      // في حال كانت كلمة المرور غير متطابقة مع كلمة المرور في الانبوت الاول فـ قم ...
        {
            checkIcon.fadeIn(1)                                         // اظهار الايقونة    

            checkIcon.removeClass("icon-check")                         // حذف كلاس ايقونة ان هذه الكلمة متطابقة

            checkIcon.addClass("icon-no")                               // اضافة كلاس ايقونة ان هذه الكلمة غير متطابقة

            checkIcon.css("color","#ea4141")                            // اضافة لون احمر للايقونة

            checkThisInput.parent().css("border-bottom","2px solid #ea4141") // اضافة لون احمر الى الاطار السفلي لهذا الانبوت

            return
        }

        //////////////////////////////////////////////////////////////////////

        else
        {
            checkIcon.fadeIn(1)                                         // اظهار الايقونة    

            checkIcon.removeClass("icon-no")                            // حذف كلاس ايقونة ان هذه الكلمة غير متطابقة

            checkIcon.addClass("icon-check")                            // اضافة كلاس ايقونة ان هذه الكلمة متطابقة

            checkIcon.css("color","#5bce93")                          // اضافة لون الاخضر للتعبير عن التطابق

            checkThisInput.parent().css("border-bottom","2px solid #212646") // اعادة اطار هذا الانبوت الى الوضع الافتراضي
        }
    });

    // نهاية ضبط خواص التحقق من جودة الباسورد اثناء الكتابة
    
    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص العودة الى فورم تسجيل الدخول

    $(document).on("click","#back-to-login-step-2",function(e)
    {
        e.preventDefault()

        $(document).find(".parts-bottom").load( "/login #login-form",function()
        {
            console.log( "login form is show ^_^" )
        });
    });
    
    // نهاية ضبط خواص العودة الى فورم تسجيل الدخول

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر انشاء باسورد جديد

    $(document).on("submit","#new-password-form",function(e)
    {
        e.preventDefault()

        let checkThisInfos          = $(this).serialize()                       // اختصار بيانات هذا الفورم
        
        let checkPasswordInput      = $(this).find("#pass-input-password")      // اختصار كلمة المرور
        
        let checkRePasswordInput    = $(this).find("#pass-input-repassword")    // اختصار اعادة كلمة المرور

        if( checkPasswordInput.val() === "" )                                   // في حال كان انبوت كلمة المرور فارغ فـ اوقف العملية مباشرة
        {
            checkPasswordInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        if( checkRePasswordInput.val() === "" )                                 // في حال كان انبوت تكرار كلمة المرور فارغ فـ اوقف العملية مباشرة
        {
            checkRePasswordInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }
    
        if( checkRePasswordInput.val() !== checkPasswordInput.val() )           // في حال كان انبوت الباسورد و اعادة الباسورد غير متوافقين فـ اوقف العملية
        {
            checkRePasswordInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        // في حان كان هناك اطار سفلي باللون الاحمر لهذا الانبوت فـ اوقف مباشرة عملية التسجيل

        if( checkPasswordInput.parent().css("border-bottom-color") === "rgb(234, 65, 65)" )
        {
            checkPasswordInput.parent().effect('shake', { distance: 5 }, 250)

            checkPasswordInput.focus()

            return
        }

        else
        {
            $.post("/editPassword",checkThisInfos,function(res)
            {
                if( res.status === "success" )
                {
                    $(document).find(".parts-bottom").load( "/login #login-form",function()
                    {
                        $(document).find(".bubble p").text( "hi!" ) // تعديل فاعة الترحيب بنص مناسب

                        console.log( "login form is show ^_^" )
                    });
                }
            });
        }
    });

    // نهاية ضبط خواص زر انشاء باسورد جديد

    // نهاية ضبط خواص فورم انشاء الباسورد

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص فورم التسجيل بحساب جديد

    // ضبط خواص الانبوتات عند الكتابة

    $(document).on("keyup keypress","#reg-input-username",function()
    {
        $(this).parent().find("i").fadeOut(1)     // اخفاء ايقونة اشارة الخطأ  
        
        $(this).parent().css("border-bottom","2px solid #212646") // اعادة الاطار السفلي الى الوضع الافتراضي
    });
    
    $(document).on("keyup keypress","#reg-input-email",function()
    {
        $(this).parent().find("i").fadeOut(1)     // اخفاء ايقونة اشارة الخطأ  

        $(this).parent().css("border-bottom","2px solid #212646") // اعادة الاطار السفلي الى الوضع الافتراضي
    });

    $(document).on("keyup keypress","#reg-input-password",function()
    {
        let checkThisInput      = $(this)                               // اختصار هذا الانبوت

        let checkIcon           = $("#reg-if-password")                 // اختصار الايقونة الدالة على قوة او ضعف كلمة السر

        let checkMessPassword   = $(".instructions")                    // اختصار رسالة التوضحيات الخاصة بشروط كلمة السر المسموحة

        if( checkThisInput.val() === "" )                               // في حال كان الانبوت فارغ فـ قم بما يلي
        {
            checkIcon.fadeOut(1)                                        // اخفاء الايقونة التي تدل على قوة او ضعف كلمة السر

            checkMessPassword.slideUp(50)                               // اخفاء رسالة توضيحات شروط كلمة السر

            checkThisInput.parent().css("border-bottom","2px solid #212646") // اعادة اطار هذا الانبوت الى الوضع الافتراضي

            checkMessPassword.find("li").css({                          // ازالة الخط من على جميع الشروط - لعدم تحققهم

                "text-decoration":"unset"
            });

            return
        }

        //////////////////////////////////////////////////////////////////////
        
        if( checkThisInput.val().length < 8 )                           // في حال كان عدد الحروف في الانبوت اقل من 6 فـ طبق ما يلي
        {
            checkIcon.fadeIn(1)                                         // اظهار ايقونة التي تدل على ضعف كلمة السر

            checkMessPassword.slideDown(150)                            // اظهار رسالة التوضيحات

            checkIcon.removeClass("icon-check")                         // تحسبا - احذف كلاس ايقونة كلمة السر قوية

            checkIcon.addClass("icon-no")                               // تحسبا - اضف كلاس كلمة السر ضعيفة

            checkIcon.css("color","#ea4141")                            // تحسبا - عدل لون الايقونة ليصبح اللون الدال على ضعف كلمة السر

            checkThisInput.parent().css("border-bottom","2px solid #ea4141") // اضف اطار سفلي لهذا الانبوت

            checkMessPassword.find("li:eq(0)").css({                    // ازالة الخط من على الشرط الاول - لعدم تحققه

                "text-decoration":"unset"
            });

            return
        }

        //////////////////////////////////////////////////////////////////////
        
        if( checkThisInput.val().length >= 8 )                          // في حال كان عدد الحروف في الانبوت اكثر او يساوي 6 فـ طبق ما يلي
        {
            checkIcon.fadeIn(1)                                         // اظهار ايقونة التي تدل على ضعف كلمة السر

            checkMessPassword.find("li:eq(0)").css({                    // وضع خط على الشرط الاول في التوضيحات - ملاحظة : الخط يعني تحقق الشرط

                "text-decoration":"line-through"
            });
        }

        //////////////////////////////////////////////////////////////////////
        
        if( !checkThisInput.val().match(/[a-z]/g) )                     // في حال لم يتم كتابة احرف صغيرة فـ طبق ما يلي
        {
            checkIcon.fadeIn(1)                                         // اظهار ايقونة التي تدل على ضعف كلمة السر

            checkIcon.removeClass("icon-check")                         // تحسبا - احذف كلاس ايقونة كلمة السر قوية

            checkIcon.addClass("icon-no")                               // تحسبا - اضف كلاس كلمة السر ضعيفة

            checkIcon.css("color","#ea4141")                            // تحسبا - عدل لون الايقونة ليصبح اللون الدال على ضعف كلمة السر

            checkThisInput.parent().css("border-bottom","2px solid #ea4141") // اضف اطار سفلي لهذا الانبوت

            checkMessPassword.find("li:eq(1)").css({                    // ازالة الخط من على الشرط الثاني لعدم تحققه

                "text-decoration":"unset"
            }); 
            
            return
        }

        //////////////////////////////////////////////////////////////////////
        
        if( !checkThisInput.val().match(/[A-Z]/g) )                     // في حال لم يتم كتابة احرف كبيرة فـ طبق ما يلي
        {
            checkIcon.fadeIn(1)                                         // اظهار ايقونة التي تدل على ضعف كلمة السر

            checkIcon.removeClass("icon-check")                         // تحسبا - احذف كلاس ايقونة كلمة السر قوية

            checkIcon.addClass("icon-no")                               // تحسبا - اضف كلاس كلمة السر ضعيفة

            checkIcon.css("color","#ea4141")                            // تحسبا - عدل لون الايقونة ليصبح اللون الدال على ضعف كلمة السر

            checkThisInput.parent().css("border-bottom","2px solid #ea4141") // اضف اطار سفلي لهذا الانبوت

            checkMessPassword.find("li:eq(1)").css({                    // ازالة الخط من على الشرط الثاني لعدم تحققه

                "text-decoration":"unset"
            });             

            return
        }

        //////////////////////////////////////////////////////////////////////

        if( !checkThisInput.val().match(/[0-9]/g) )                     // في حال لم يتم كتابة ارقام فـ طبق ما يلي
        {
            checkIcon.fadeIn(1)                                         // اظهار ايقونة التي تدل على ضعف كلمة السر

            checkIcon.removeClass("icon-check")                         // تحسبا - احذف كلاس ايقونة كلمة السر قوية

            checkIcon.addClass("icon-no")                               // تحسبا - اضف كلاس كلمة السر ضعيفة

            checkIcon.css("color","#ea4141")                            // تحسبا - عدل لون الايقونة ليصبح اللون الدال على ضعف كلمة السر

            checkThisInput.parent().css("border-bottom","2px solid #ea4141") // اضف اطار سفلي لهذا الانبوت

            checkMessPassword.find("li:eq(1)").css({                    // ازالة الخط من على الشرط الثاني لعدم تحققه

                "text-decoration":"unset"
            }); 

            return
        }

        if( checkThisInput.val().match(/[a-zA-Z0-9]/g) && !checkThisInput.val().match(/\w+W+/g) ) // في حال تم كتابة كل ما سبق بدون حروف مميزة فـ ...
        {
            checkIcon.removeClass("icon-no")                            // حذف كلاس ايقونة الكلمة ضعيفة

            checkIcon.addClass("icon-check")                            // اضافة كلاس ايقونة الكلمة القوية

            checkIcon.css("color","#7397fb")                          // تعديل لون الايقونة ليتناسب مع مستوى هذه القوة

            checkThisInput.parent().css("border-bottom","2px solid #212646") // اعادة اطار هذا الانبوت الى الوضع الافتراضي

            checkMessPassword.find("li:eq(1)").css({                    // وضع خط على الشرط الثاني في التوضيحات - ملاحظة : الخط يعني تحقق الشرط

                "text-decoration":"line-through"
            });

            checkMessPassword.find("li:eq(2)").css({                    // ازالة الخط من على الشرط الثالث لعدم تحققه

                "text-decoration":"unset"
            });            
        }

        //////////////////////////////////////////////////////////////////////

        let shortRuls = checkThisInput.val().match(/\W+\w+\W+/g) || checkThisInput.val().match(/\w+\W+/g) || checkThisInput.val().match(/\W+\w+/g)

        if( shortRuls )                                                 // في حال تم كتابة كل ما سبق مع حروف مميزة فـ طبق ما يلي
        {
            checkIcon.css("color","#5bce93")                          // تعديل لون الايقونة ليتناسب مع مستوى هذه القوة

            checkMessPassword.find("li:eq(2)").css({                    // وضع خط على الشرط الثالث في التوضيحات - ملاحظة : الخط يعني تحقق الشرط

                "text-decoration":"line-through"
            });
        }        
    });

    $(document).on("keyup keypress","#reg-input-repassword",function()
    {
        let checkThisInput          = $(this)                           // اختصار هذا الانبوت

        let checkInputOrgPassword   = $("#reg-input-password")          // اختصار انبوت الاول لكلمة السر

        let checkIcon               = $("#reg-if-repassword")           // اختصار ايقونة تطابق او عدم تطابق كلمة السر

        if( checkThisInput.val() === "" )                               // في حال كان الانبوت فارغ فـ قم بما يلي
        {
            checkIcon.fadeOut(1)                                        // اخفاء الايقونة التي تدل على عدم توافق كلمة السر

            checkIcon.removeClass("icon-check")                         // حذف كلاس ايقونة ان هذه الكلمة متطابقة

            checkIcon.addClass("icon-no")                               // اضافة كلاس ايقونة ان هذه الكلمة غير متطابقة

            checkIcon.css("color","#ea4141")                          // اضافة لون احمر للايقونة

            checkThisInput.parent().css("border-bottom","2px solid #212646") // اعادة اطار هذا الانبوت الى الوضع الافتراضي

            return
        }

        //////////////////////////////////////////////////////////////////////

        if( checkThisInput.val() !== checkInputOrgPassword.val() )      // في حال كانت كلمة المرور غير متطابقة مع كلمة المرور في الانبوت الاول فـ قم ...
        {
            checkIcon.fadeIn(1)                                         // اظهار الايقونة    

            checkIcon.removeClass("icon-check")                         // حذف كلاس ايقونة ان هذه الكلمة متطابقة

            checkIcon.addClass("icon-no")                               // اضافة كلاس ايقونة ان هذه الكلمة غير متطابقة

            checkIcon.css("color","#ea4141")                            // اضافة لون احمر للايقونة

            checkThisInput.parent().css("border-bottom","2px solid #ea4141") // اضافة لون احمر الى الاطار السفلي لهذا الانبوت

            return
        }

        //////////////////////////////////////////////////////////////////////

        else
        {
            checkIcon.fadeIn(1)                                         // اظهار الايقونة    

            checkIcon.removeClass("icon-no")                            // حذف كلاس ايقونة ان هذه الكلمة غير متطابقة

            checkIcon.addClass("icon-check")                            // اضافة كلاس ايقونة ان هذه الكلمة متطابقة

            checkIcon.css("color","#5bce93")                          // اضافة لون الاخضر للتعبير عن التطابق

            checkThisInput.parent().css("border-bottom","2px solid #212646") // اعادة اطار هذا الانبوت الى الوضع الافتراضي
        }
    });

    // نهاية ضبط خواص الانبوتات عند الكتابة

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص خيار اظهار فورم تسجيل الدخول

    $(document).on("click","#have-account",function(e)
    {
        e.preventDefault()

        $(document).find(".parts-bottom").load( "/login #login-form",function()
        {
            $(document).find(".bubble p").text( "hi!" ) // تعديل فاعة الترحيب بنص مناسب

            console.log( "check Email form is show ^_^" )
        });
    });

    // نهاية ضبط خواص خيار اظهار فورم تسجيل الدخول

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر التسجيل بحساب جديد

    $(document).on("submit","#reg-form",function(e)
    {
        e.preventDefault()

        let checkThisInfos          = $(this).serialize()                   // اختصار بيانات هذا الفورم

        let checkUsernameInput      = $(this).find("#reg-input-username")   // اختصار انبوت اسم المستخدم
        
        let checkEmailInput         = $(this).find("#reg-input-email")      // اختصار انبوت الايميل
        
        let checkPasswordInput      = $(this).find("#reg-input-password")   // اختصار كلمة المرور
        
        let checkRePasswordInput    = $(this).find("#reg-input-repassword") // اختصار اعادة كلمة المرور

        if( checkUsernameInput.val() === "" )                               // في حال كان الانبوت فارغ فـ اوقف مباشرة عملية التسجيل
        {
            checkUsernameInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        if( checkEmailInput.val() === "" )                                  // في حال كان انبوت الايميل فارغ فـ اوقف مباشرة عملية التسجيل
        {
            checkEmailInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        if( !checkEmailInput.val().match(/\w+@\w+.(com|net|org)/ig) )       // في حال كان انبوت الايميل لا يتوافق مع هذه الشروط فـ اوقف العملية مباشرة
        {
            $(document).find("#reg-if-email").fadeIn(1)

            checkEmailInput.parent().css("border-bottom","2px solid #ea4141")   
        }

        if( checkPasswordInput.val() === "" )                               // في حال كان انبوت كلمة المرور فارغ فـ اوقف العملية مباشرة
        {
            checkPasswordInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        if( checkRePasswordInput.val() === "" )                             // في حال كان انبوت تكرار كلمة المرور فارغ فـ اوقف العملية مباشرة
        {
            checkRePasswordInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }
    
        if( checkRePasswordInput.val() !== checkPasswordInput.val() )       // في حال كان انبوت الباسورد و اعادة الباسورد غير متوافقين فـ اوقف العملية
        {
            checkRePasswordInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        // في حان كان هناك اطار سفلي باللون الاحمر لهذا الانبوت فـ اوقف مباشرة عملية التسجيل

        if( checkPasswordInput.parent().css("border-bottom-color") === "rgb(234, 65, 65)" )
        {
            checkPasswordInput.parent().effect('shake', { distance: 5 }, 250)

            checkPasswordInput.focus()

            return
        }

        else 
        {
            $.post("/regster",checkThisInfos,function(res)
            {
                if( res.status === "success" )                      // في حال كان الاستعلام ايجابي فـ طبق ما يلي
                {
                    $(document).find(".parts-bottom").load( "/login #login-form",function()
                    {
                        $(document).find(".bubble p").text( "hi!" ) // تعديل فاعة الترحيب بنص مناسب

                        console.log( "check Email form is show ^_^" )
                    });
                }

                else
                {
                    $(document).find(`#${res.message}`).fadeIn(1)   // اظهار ايقونة الخطأ في الانبوت المحدد
                }
            });
        }
    });

    // نهاية ضبط خواص زر التسجيل بحساب جديد

    // نهاية ضبط خواص فورم التسجيل بحساب جديد

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص البروفايل

    // ضبط خواص رفع صور الكوفر و الصورة الشخصية للمستخدمين عند الضغط على الروابط

    $(document).on("change","#cover-input",function()
    {
        let file      = this.files[0]   // اختصار الصورة المراد رفعها

        if ( !file ) return             // ان لم تكن الصورة موجودة فـ اوقف العملية مباشرة

        let formData  = new FormData()  // اختصار الحاوية التي سوف تخزن بها الصورة استعدادا لارسالها الى القاعدة

        formData.append("cover", file)  // اضافة الصورة مع الاسم الخاص بها الى الحاوية استعدادا للارسال

        ////////////////////////////////////////////////////////////////////////////////

        let xh = new XMLHttpRequest()   // اوبجكت مسؤول عن ارسال الطلبات عوض استخدام الاجاكس

        xh.open("POST", "/updataCover", true); // يتم في هذا الكود تحديد نمط الارسال و الى اي مسار و قيمة الموجب تعني ان الارسال غير متزامن
        
        xh.send(formData);              // هذا الكود مسؤول عن ارسال البيانات المجمعة في الحاوية الى السيرفر

        $("#cover-progress").fadeIn(1)  // اظهار شريط التحميل

        ////////////////////////////////////////////////////////////////////////////////

        // هذا الكود مسؤول عن رفع الصورة و اظهار ذلك في شريط التحميل

        xh.upload.addEventListener("progress", function(e)
        {
            if (e.lengthComputable) // في حال تم حساب طول او حجم الملف قم بالتالي
            {
                console.log("progress event:", e);
                console.log("lengthComputable?", e.lengthComputable);

                let percent = (e.loaded / e.total) * 100 // اختصار لـ قيمة الرفع الحالية

                $("#cover-progress").css("width", percent + "%") // طباعة قيمة الرفع في عرض شريط التحميل لكي يتحرك و يمتلئ
            }
        });

        ////////////////////////////////////////////////////////////////////////////////

        // هذا الكود مسؤول عن استقبال الاستعلام من قاعدة البيانات و بناءا عليه يتم طباعة الصورة في مكانها داخل الصفحة

        xh.onload = function()
        {
            if (xh.status === 200) // في حال حصلت على رقم 200 فـ هذا يعني ان عملية الاستلام نجحت و بناءا عليه قم بالتالي
            {
                let res = JSON.parse(xh.responseText) // تحويل السترينغ المرسل من السيرفر الى اوبجكت لكي يتم التعامل معه

                if (res.status === "success") // التحقق من الاستعلام
                {
                    $("#profile-cover-image").attr("src", res.imageUrl + "?t=" + Date.now())
                }
            } 

            if( xh.status === 413 )
            {
                $("#profile-cover-image").effect('shake', { distance: 20 }, 250)

                $(".max-mess p").text( "Sorry, but the maximum image size is 50MP." )

                $(".max-mess").animate({

                    top: "12px"

                },250).delay(4500)

                $(".max-mess").animate({

                    top: "-50px"

                },50)

                return
            }

            if( xh.status === 403 )
            {
                $("#profile-cover-image").effect('shake', { distance: 20 }, 250)

                $(".max-mess p").text( "Sorry, but what you uploaded is not a picture!" )

                $(".max-mess").animate({

                    top: "12px"

                },250).delay(3500)

                $(".max-mess").animate({

                    top: "-50px"

                },50)

                return
            }

            $("#cover-progress").fadeOut(150,function()
            {
                $(this).css("width", "0%") // اعادة عرض شريط التحميل الى الوضع الافتراضي
            });
        }
    });

    $(document).on("change","#photo-input",function()
    {
        let file      = this.files[0]   // اختصار الصورة المراد رفعها

        if ( !file ) return             // ان لم تكن الصورة موجودة فـ اوقف العملية مباشرة

        let formData  = new FormData()  // اختصار الحاوية التي سوف تخزن بها الصورة استعدادا لارسالها الى القاعدة

        formData.append("photo", file)  // اضافة الصورة مع الاسم الخاص بها الى الحاوية استعدادا للارسال

        ////////////////////////////////////////////////////////////////////////////////

        let xh = new XMLHttpRequest()   // اوبجكت مسؤول عن ارسال الطلبات عوض استخدام الاجاكس

        xh.open("POST", "/updataPhoto", true); // يتم في هذا الكود تحديد نمط الارسال و الى اي مسار و قيمة الموجب تعني ان الارسال غير متزامن
        
        xh.send(formData);              // هذا الكود مسؤول عن ارسال البيانات المجمعة في الحاوية الى السيرفر

        $("#photo-progress").fadeIn(1)  // اظهار شريط التحميل

        ////////////////////////////////////////////////////////////////////////////////

        // هذا الكود مسؤول عن رفع الصورة و اظهار ذلك في شريط التحميل

        xh.upload.addEventListener("progress", function(e)
        {
            if (e.lengthComputable) // في حال تم حساب طول او حجم الملف قم بالتالي
            {
                let percent = (e.loaded / e.total) * 100 // اختصار لـ قيمة الرفع الحالية

                $("#photo-progress").css("height", percent + "%") // طباعة قيمة الرفع في عرض شريط التحميل لكي يتحرك و يمتلئ
            }
        });

        ////////////////////////////////////////////////////////////////////////////////

        // هذا الكود مسؤول عن استقبال الاستعلام من قاعدة البيانات و بناءا عليه يتم طباعة الصورة في مكانها داخل الصفحة

        xh.onload = function()
        {
            if (xh.status === 200) // في حال حصلت على رقم 200 فـ هذا يعني ان عملية الاستلام نجحت و بناءا عليه قم بالتالي
            {
                let res = JSON.parse(xh.responseText) // تحويل السترينغ المرسل من السيرفر الى اوبجكت لكي يتم التعامل معه

                if (res.status === "success") // التحقق من الاستعلام
                {
                    $("#profile-user-image").attr("src", res.imageUrl + "?t=" + Date.now())
                }
            } 

            if( xh.status === 413 )
            {
                $("#profile-user-image").effect('bounce', { times: 3, distance: 15 }, 300)
                
                $(".max-mess p").text( "Sorry, but the maximum image size is 50MP." )
                
                $(".max-mess").animate({
                    
                    top: "12px"
                    
                },250).delay(4500)
                
                $(".max-mess").animate({
                    
                    top: "-50px"
                    
                },50)
                
                return
            }
            
            if( xh.status === 403 )
            {
                $("#profile-user-image").effect('bounce', { times: 3, distance: 15 }, 300)
                    
                $(".max-mess p").text( "Sorry, but what you uploaded is not a picture!" )

                $(".max-mess").animate({

                    top: "12px"

                },250).delay(3500)

                $(".max-mess").animate({

                    top: "-50px"

                },50)

                return
            }

            $("#photo-progress").fadeOut(150,function()
            {
                $(this).css("height", "0%") // اعادة عرض شريط التحميل الى الوضع الافتراضي
            });
        }
    });
        
    // نهاية ضبط خواص رفع صور الكوفر و الصورة الشخصية للمستخدمين عند الضغط على الروابط

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص تعديل اسم المستخدم

    // ضبط خواص اظهار فورم التعديل

    $(document).on("click","#profile-username",function()
    {
        checkThisText = $(this)     // اختصار هذا النص

        checkThisText.fadeOut(1)    // اخفاء اسم المستخدم

        // انشاء فورم تعديل اسم المستخدم

        $(this).parent().append(`

        <form id="edit-username-form">
            <div class="inputs">
                <input type="text" name="username" value="${checkThisText.text()}" placeholder="Write your new username" />
            </div>
            <div class="buttons-icons">
                <button type="submit" id="change-username">
                    <i class="icon-check"></i>
                </button>
                <button id="close-edit-username">
                    <i class="icon-no"></i>
                </button>            
            </div>
        </form>`)
    });

    // نهاية ضبط خواص اظهار فورم التعديل

    ////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص انبوت اسم المستخدم عند الكتابة

    $(document).on("keyup keypress","#edit-username-form .inputs",function()
    {   
        $(this).css("border-bottom","2px solid #212646") // اعادة الاطار السفلي الى الوضع الافتراضي
    });

    // نهاية ضبط خواص انبوت اسم المستخدم عند الكتابة

    ////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر تعديل اسم المستخدم

    $(document).on("submit","#edit-username-form",function(e)
    {
        e.preventDefault()

        checkUsernameInput  = $(this).find("input")                 // اختصار انبوت اسم المستخدم

        checkThisInfos      = $(this).serialize()                   // اختصار معلومات هذا الفورم

        if( checkUsernameInput.val() === "" )                       // في حال كان انبوت اسم المستخدم فارغ فـ اوقف عملية التعديل مباشرة
        {
            checkUsernameInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        else
        {
            $.post("/editUsername",checkThisInfos,function(res)
            {
                if( res.status === "success" )
                {
                    $("#profile-username").fadeIn(1)                // اظهار اسم المستخدم

                    $("#profile-username").text( res.username )     // طباعة اسم المستخدم الجديد في الاسم داخل البروفايل

                    $("#edit-username-form").remove()               // حذف فورم تعديل اسم المستخدم
                }
            });
        }
    });

    // نهاية ضبط خواص زر تعديل اسم المستخدم

    ////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر اللغاء عملية التعديل

    $(document).on("click","#close-edit-username",function(e)
    {
        e.preventDefault()

        $("#profile-username").fadeIn(1)    // اظهار اسم المستخدم

        $("#edit-username-form").remove()   // حذف فورم تعديل اسم المستخدم
    });

    // نهاية ضبط خواص زر اللغاء عملية التعديل

    // نهاية ضبط خواص تعديل اسم المستخدم

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر تسجيل الخروج من البروفايل

    $(document).on("click","#profile-logout",function(e)
    {
        e.preventDefault()

        $.post("/logout",function(res)
        {
            $(document).find(".parts-bottom").load( "/login #login-form",function()
            {
                $(document).find(".bubble p").text( "hi!" ) // تعديل فاعة الترحيب بنص مناسب

                console.log( "login form is show ^_^" )
            });
        });
    });

    // نهاية ضبط خواص زر تسجيل الخروج من البروفايل

    // نهاية ضبط خواص البروفايل

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص تحميل المشروع

    // نهاية ضبط خواص تحميل المشروع
});