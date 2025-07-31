$(document).ready(function(){
    
    console.log("✅ JS file loaded!");

    alert("🚀 الفورم تم التقاطه!");

    // ضبط خواص فورم تسجيل الدخول

    // ضبط خواص الانبوتات عند الكتابة

    $(document).on("keyup keypress","#login-input-username",function()
    {
        $(this).parent().css("border-bottom","0") // اعادة الاطار السفلي الى الوضع الافتراضي
    });

    $(document).on("keyup keypress","#login-input-password",function()
    {
        $(this).parent().css("border-bottom","0") // اعادة الاطار السفلي الى الوضع الافتراضي
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

    // ضبط خواص تفعيل و اللغاء تفعيل خيار تذكرني

    $(document).on("click","#login-remember-me",function()
    {
        let checkIcon = $(this).find("i")           // اختصار ايقونة اشارة الصح

        if( checkIcon.css("display") === "none" )   // في حال كانت الايقونة مخفية فـ هذا يعني ان الخيار غير مفعل و عليه فـ قم بـ تفعيله
        {
            checkIcon.fadeIn(1)                     // اظهار الايقونة
        }
        
        else
        {
            checkIcon.fadeOut(1)                    // اخفاء الايقونة
        }
    });

    // نهاية ضبط خواص تفعيل و اللغاء تفعيل خيار تذكرني

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص خيار اظهار فورم التسجيل بحساب جديد

    $(document).on("click","#dont-have-account",function(e)
    {
        e.preventDefault()

        $("#reg-form").fadeIn(1)                                        // اظهار فورم التسجيل بحساب جديد

        $("#login-form").fadeOut(1)                                     // اخفاء فورم تسجيل الدخول

        $(".base").css("margin-bottom","60px")                          // تعديل الهامش الخارجي الخاص بـ هذا التصميم ليتناسب مع فورم التسجيل

        $(".bubble p").text( "new!" )                                   // تعديل النص الخاص برسسالة الترحيب ليتناسب مع فورم التسجيل

        ////////////////////////////////////////////////////////////////////////////////

        $("#login-remember-me i").fadeOut(1)                            // اخفاء ايقونة الصح الخاصة بـ خيار تذكرني

        $("#login-form input").val( "" )                                // اعادة محتوى الانبوتات الى الوضع الافتراضي

        $("#login-input-password").attr("type","password")              // اعادة نوع انبوت كلمة السر الى الوضع الافتراضي

        $("#login-form .inputs").css("border-bottom","0")               // اعادة الاطار السفلي للانبوتات الى الوضع الافتراضي

        $("#login-show-or-hidden-pass").removeClass("icon-show-pass")   // حذف كلاس ايقونة اظهار كلمة السر

        $("#login-show-or-hidden-pass").addClass("icon-hidden-pass")    // اضافة كلاس ايقونة اخفاء كلمة السر

        $("#login-input-password").attr("type","password")              // تعديل نوع الانبوت لكي يتم اخفاء كلمة السر        
    });

    // نهاية ضبط خواص خيار اظهار فورم التسجيل بحساب جديد

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر تسجيل الدخول

    $(document).on("click","#login-button",function(e)
    {
        e.preventDefault()

        let checkInputUsername  = $("#login-input-username")    // اختصار انبوت اسم المستخدم

        let checkInputPassword  = $("#login-input-password")    // اختصار انبوت كلمة السر

        let checkIconRememberMe = $("#login-remember-me i")     // اختصار ايقونة الصح الخاصة بـ خيار تذكرني

        ////////////////////////////////////////////////////////////////////////////////

        // في حال كان انبوت اسم المستخدم او كلمة السر فارغين فـ لا تسجل و اظهر اطار اسفل الانبوت الفارغ

        if( checkInputUsername.val() === "" )
        {
            checkInputUsername.parent().css("border-bottom","2px solid #ea4141")

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

        }
    });

    // نهاية ضبط خواص زر تسجيل الدخول

    // نهاية ضبط خواص فورم تسجيل الدخول

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص فورم التسجيل بحساب جديد

    // ضبط خواص التحقق من قاعدة البيانات عند الكتابة الاسم و الايميل

    // نهاية ضبط خواص التحقق من قاعدة البيانات عند الكتابة الاسم و الايميل

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص انبوتات كلمات السر

    // ضبط خواص الانبوت الاول - التحقق من جودة كلمة السر

    $(document).on("keyup keypress","#reg-input-password",function()
    {
        let checkThisInput      = $(this)                               // اختصار هذا الانبوت

        let checkIcon           = $("#reg-if-password")                 // اختصار الايقونة الدالة على قوة او ضعف كلمة السر

        let checkMessPassword   = $(".instructions")                    // اختصار رسالة التوضحيات الخاصة بشروط كلمة السر المسموحة

        if( checkThisInput.val() === "" )                               // في حال كان الانبوت فارغ فـ قم بما يلي
        {
            checkIcon.fadeOut(1)                                        // اخفاء الايقونة التي تدل على قوة او ضعف كلمة السر

            checkMessPassword.slideUp(50)                               // اخفاء رسالة توضيحات شروط كلمة السر

            checkThisInput.parent().css("border-bottom","0")            // اعادة اطار هذا الانبوت الى الوضع الافتراضي

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

            checkIcon.css("color","#7397fb")                            // تعديل لون الايقونة ليتناسب مع مستوى هذه القوة

            checkThisInput.parent().css("border-bottom","0")            // اعادة اطار هذا الانبوت الى الوضع الافتراضي

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
            checkIcon.css("color","#5bce93")                            // تعديل لون الايقونة ليتناسب مع مستوى هذه القوة

            checkMessPassword.find("li:eq(2)").css({                    // وضع خط على الشرط الثالث في التوضيحات - ملاحظة : الخط يعني تحقق الشرط

                "text-decoration":"line-through"
            });
        }        
    });

    // نهاية ضبط خواص الانبوت الاول - التحقق من جودة كلمة السر

    ////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص الانبوت الثاني - التحقق من تطابق كلمة السر

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

            checkIcon.css("color","#ea4141")                            // اضافة لون احمر للايقونة

            checkThisInput.parent().css("border-bottom","0")            // اعادة اطار هذا الانبوت الى الوضع الافتراضي

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

            checkIcon.css("color","#5bce93")                            // اضافة لون الاخضر للتعبير عن التطابق

            checkThisInput.parent().css("border-bottom","0")            // اعادة اطار هذا الانبوت الى الوضع الافتراضي
        }
    });

    // نهاية ضبط خواص الانبوت الثاني - التحقق من تطابق كلمة السر

    // نهاية ضبط خواص انبوتات كلمات السر

    // نهاية ضبط خواص التحقق من جودة كلمة السر و توافق كلمة السر مع انبوت الاعادة

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص خيار اظهار فورم تسجيل الدخول

    $(document).on("click","#have-account",function(e)
    {
        e.preventDefault()

        $("#login-form").fadeIn(1)          // اظهار فورم تسجيل الدخول

        $("#reg-form").fadeOut(1)           // اخفاء فورم التسجيل بحساب جديد

        $(".instructions").fadeOut(1)       // اخفاء رسالة توضيحات شروط كلمة السر

        $(".base").css("margin-bottom","0") // اعادة الهامش الخارجي الخاصة بـ قاعدة هذا التصميم الى الوضع الافتراصي

        $(".bubble p").text( "hi!" )        // تعديل النص الخاص برسسالة الترحيب ليتناسب مع فورم تسجيل الدخول

        ////////////////////////////////////////////////////////////////////////////////

        // اخفاء جميع الايقونات التابعة للانبوتات

        $("#reg-if-username").fadeOut(1)
        
        $("#reg-if-email").fadeOut(1)
        
        $("#reg-if-password").fadeOut(1)
        
        $("#reg-if-repassword").fadeOut(1)

        ////////////////////////////////////////////////////////////////////////////////

        // اعادة جميع الخانات و الكلاسات الخاصة بالايقونات الى الوضع الافتراضي

        $("#reg-form input").val( "" )

        $("#reg-if-username").removeClass("icon-check")

        $("#reg-if-username").addClass("icon-no")

        $("#reg-if-email").removeClass("icon-check")

        $("#reg-if-email").addClass("icon-no")

        $("#reg-if-password").removeClass("icon-check")

        $("#reg-if-password").addClass("icon-no")
        
        $("#reg-if-repassword").removeClass("icon-check")

        $("#reg-if-repassword").addClass("icon-no")

        ////////////////////////////////////////////////////////////////////////////////

        // اعادة تنسيقات الخانات و الايقونات الى الوضع الافتراضي

        $("#reg-form .inputs").css("border-bottom","0")

        $("#reg-if-username").css("color","#ea4141")

        $("#reg-if-email").css("color","#ea4141")

        $("#reg-if-password").css("color","#ea4141")
        
        $("#reg-if-repassword").css("color","#ea4141")

        $(".instructions li").css("text-decoration","unset");
    });

    // نهاية ضبط خواص خيار اظهار فورم تسجيل الدخول

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر التسجيل بحساب جديد

    $(document).on("submit","#reg-form",function(e)
    {
        e.preventDefault()

        let checkThisInfos          = $(this).serialize()

        let checkUsernameInput      = $(this).find("#reg-input-username")
        
        let checkEmailInput         = $(this).find("#reg-input-email")
        
        let checkPasswordInput      = $(this).find("#reg-input-password")
        
        let checkRePasswordInput    = $(this).find("#reg-input-repassword")

        if( checkUsernameInput.val() === "" )
        {
            checkUsernameInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        if( checkEmailInput.val() === "" )
        {
            checkEmailInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        if( checkPasswordInput.val() === "" )
        {
            checkPasswordInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        if( checkRePasswordInput.val() === "" )
        {
            checkRePasswordInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        if( checkRePasswordInput.val() !== checkPasswordInput.val() )
        {
            checkRePasswordInput.parent().css("border-bottom","2px solid #ea4141")

            return
        }

        else 
        {
            $.post("/regster",checkThisInfos,function(res)
            {
                if( res.status === "success" )
                {
                    location.href = "/login"
                }

                else
                {
                    $(".reg-mess").text( res.message ).slideDown(150)
                }
            });
        }
    });

    // نهاية ضبط خواص زر التسجيل بحساب جديد

    // نهاية ضبط خواص فورم التسجيل بحساب جديد

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص البروفايل

    // ضبط خواص فتح نافذة تعديل صورة الكوفر او الصورة الشخصية او اسم المستخدم

    // نهاية ضبط خواص فتح نافذة تعديل صورة الكوفر او الصورة الشخصية او اسم المستخدم

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر تسجيل الخروج من البروفايل

    // نهاية ضبط خواص زر تسجيل الخروج من البروفايل

    // نهاية ضبط خواص البروفايل

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص نافذة تعديل معلومات البروقايل

    // ضبط خواص انبوت تعديل المعلومات اثناء الكتابة

    $(document).on("keyup keypress","#edit-cover-or-photo-or-username-input",function()
    {
        let checkThisInput = $(this)                        // اختصار هذا الانبوت

        checkThisInput.parent().css("border-bottom","0")    // ازالة الاطار السفلي من هذا الانبوت

        checkThisInput.parent().find("i").fadeOut(1)        // اخفاء ايقونة الخطأ التابعة لهذا الانبوت

        if( checkThisInput.hasClass("edit-cover") ) // في حال كان كلاس هذا الانبوت بهذا الشكل فـ هذا يعني ان التعديل للكوفر و عليه فـ اطبق التالي
        {
            $(".edit-cover-or-photo-or-username .cover").css("background-image",`url("${checkThisInput.val()}")`) // طباعة رابط الصورة في داخل المعاينة

            return
        }

        if( checkThisInput.hasClass("edit-photo") ) // في حال كان كلاس هذا الانبوت بهذا الشكل فـ هذا يعني ان التعديل للصورة الشخصية و عليه فـ اطبق التالي
        {
            $(".edit-cover-or-photo-or-username .photo").css("background-image",`url("${checkThisInput.val()}")`) // طباعة رابط الصورة في داخل المعاينة
        
            return
        }

        if( checkThisInput.hasClass("edit-username") ) // في حال كان كلاس هذا الانبوت بهذا الشكل فـ هذا يعني ان التعديل للاسم و عليه فـ اطبق التالي
        {
            $(".edit-cover-or-photo-or-username .username").text( checkThisInput.val() ) // طباعة الاسم الجديد في داخل المعاينة

            return
        }
    });

    // نهاية ضبط خواص انبوت تعديل المعلومات اثناء الكتابة

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر الحفظ

    // نهاية ضبط خواص زر الحفظ

    //////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص زر الاغلاق

    $(document).on("click","#edit-profile-cancel",function()
    {
        $(".windows").fadeOut(1)                                                  // اخفاء النافذة

        $("#edit-cover-or-photo-or-username-input").val( "" )                     // اعادة انبوت  التعديل الى الوضع الافتراضي

        $("#edit-cover-or-photo-or-username-input").removeClass("edit-cover")     // ازالة هذا الكلاس من انبوت التعديل

        $("#edit-cover-or-photo-or-username-input").removeClass("edit-photo")     // ازالة هذا الكلاس من انبوت التعديل   

        $("#edit-cover-or-photo-or-username-input").removeClass("edit-username")  // ازالة هذا الكلاس من انبوت التعديل  

        $("#edit-cover-or-photo-or-username-input").parent().css("border-bottom","0") // ازالة الاطار السفلي من انبوت التعديل

        $("#edit-cover-or-photo-or-username-input").parent().find("i").fadeOut(1) // اخفاء ايقونة الخطأ التابعة لانبوت التعديل
    });

    // نهاية ضبط خواص زر الاغلاق

    // نهاية ضبط خواص نافذة تعديل معلومات البروقايل

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // ضبط خواص تحميل المشروع
    
    // نهاية ضبط خواص تحميل المشروع
});