##- استدعاء اطار عمل فلاسك مع التقنيات المحددة لهذا المشروع

import os

import time

from werkzeug.utils import secure_filename

from flask import Flask,render_template,request,redirect,jsonify,url_for,session

from mysql.connector import connect

from argon2 import PasswordHasher

from werkzeug.exceptions import RequestEntityTooLarge

from flask_wtf.csrf import generate_csrf

from flask_talisman import Talisman

from PIL import Image

########## - ########## - ########## - ########## - ########## - ##########

##- انشاء فلاسك و انشاء كود تشفير الباسورد و انشاء السوبر كي

project             = Flask(__name__)

passwordHash        = PasswordHasher()

project.secret_key  = "uijnkmloijonml,mkjn mlc;dkjvnkdsmclkmnsdc"

########## - ########## - ########## - ########## - ########## - ##########

##- تحصين المشروع بعدة طبقات من الحماية مثل عدم رفع ملفات اكثر من 50 ميجا و حماية الكوكيز

project.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

project.config['SESSION_COOKIE_SECURE'] = True      # مع https فقط

project.config['SESSION_COOKIE_HTTPONLY'] = True    # لا يمكن الوصول بالـ JS

project.config['SESSION_COOKIE_SAMESITE'] = 'Lax'   # تقليل CSRF

Talisman(project)

########## - ########## - ########## - ########## - ########## - ##########

##- انشاء المجلد المسؤول عن حفظ صور الكوفر التابعة للمستخدمين

project.config['UPLOAD_COVER'] = os.path.join('static', 'uploads', 'covers')

os.makedirs(project.config['UPLOAD_COVER'], exist_ok = True)

########## - ########## - ########## - ########## - ########## - ##########

##- انشاء المجلد المسؤول عن حفظ صور المستخدم الشخصية

project.config['UPLOAD_PHOTO'] = os.path.join('static', 'uploads', 'photos')

os.makedirs(project.config['UPLOAD_PHOTO'], exist_ok = True)

########## - ########## - ########## - ########## - ########## - ##########

##- ربط قاعدة البيانات مع المشروع و انشاء نفق كورسور و اعطائه ميزة القواميس

dataBase            = connect(

    host            = "localhost",
    
    user            = "root",
    
    password        = "",
    
    database        = "project_profile"
)

curData             = dataBase.cursor( dictionary = True )

########## - ########## - ########## - ########## - ########## - ##########

##- انشاء جدول بيانات المستخدمين مع القيم الخاصة به

curData.execute("CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY,username TEXT,email TEXT,password TEXT,photo TEXT,cover TEXT)")

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص فانكشن او مسار الحماية من هجمات CSRF

@project.context_processor
def inject_csrf_token():
    
    return dict(csrf_token=generate_csrf())

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص فانكشن او مسار السماح لبعض الملفات بالتحميل داخل الصفحة بعد التأكد من سلامتها

@project.after_request
def apply_csp(response):

    response.headers["Content-Security-Policy"] = (
        "default-src 'self';"
        
        "script-src 'self' https://code.jquery.com https://cdn.jsdelivr.net https://unpkg.com 'unsafe-inline';"
        
        "style-src 'self' https://fonts.googleapis.com;"
        
        "font-src 'self' https://fonts.gstatic.com data:;"
        
        "object-src 'none';"
    )

    return response

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص مسار الصفحة الرئيسية

@project.route("/", methods = ["GET","POST"])
def homePage():

    return render_template("index.html")

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص مسار صفحة تسجيل الدخول لاستدعاء باستخدام الاجاكس

@project.route("/login", methods = ["GET","POST"])
def loginPage():

    return render_template("partials/login.html")

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص مسار صفحة التحقق من الايميل لاستدعاء باستخدام الاجاكس

@project.route("/checkEmails", methods = ["GET","POST"])
def checkEmailPage():

    return render_template("partials/check-email.html")

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص مسار صفحة انشاء كلمة مرور لاستدعاء باستخدام الاجاكس

@project.route("/createNewPass", methods = ["GET","POST"])
def createNewPasswordPage():

    return render_template("partials/create-new-pass.html")

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص مسار صفحة انشاء حساب جديد لاستدعاء باستخدام الاجاكس

@project.route("/register", methods = ["GET","POST"])
def registerPage():

    return render_template("partials/register.html")

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص مسار صفحة البروفايل لاستدعاء باستخدام الاجاكس

@project.route("/profile", methods = ["GET","POST"])
def profilePage():

    return render_template("partials/profile.html")

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص فانكشن او مسار انشاء حساب جديد

@project.route("/regster", methods = ["GET","POST"])
def createAccounts():

    if request.method == "POST":

        ##- جلب معلومات التسجيل من الفورم

        username    = request.form["username"]
        
        email       = request.form["email"]
        
        password    = request.form["password"]

        photo       = ""

        cover       = ""

        ########## - ########## - ########## - ##########

        ##- انشاء تحقق للتأكد ان الايميل المكتوب غير موجود في القاعدة

        curData.execute("SELECT * FROM users WHERE email = %s",(email,))

        checkUser = curData.fetchone()
        
        ########## - ########## - ########## - ##########

        ##- اذا كان موجود ارسل خطأ الى الكلاينت سايد و ان كان صحيح فـ ارسل نجاح و انشئ جدول لهذا المستخدم

        if checkUser:

            return jsonify( status = "error", message = "reg-if-email" )
        
        else:

            hashPass = passwordHash.hash(password)

            curData.execute("INSERT INTO users(username,email,password,photo,cover) VALUES(%s,%s,%s,%s,%s)",(username,email,hashPass,photo,cover))

            dataBase.commit()

            return jsonify( status = "success" )

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص فانكشن او مسار تسجيل الدخول

@project.route("/logins", methods = ["GET","POST"])
def loginToProfile():

    if request.method == "POST":

        ##- جلب الايميل و الباسورد

        email       = request.form["email"]

        password    = request.form["password"]

        ########## - ########## - ########## - ##########

        ##- انشاء التحقق ان كان الايميل موجود في القاعدة او لا

        curData.execute("SELECT * FROM users WHERE email = %s",(email,)) 

        checkUser = curData.fetchone()

        ########## - ########## - ########## - ##########

        ##- اذا كان الايميل موجود فـ تأكد من الباسورد

        try:

            checkUser

            checkThisUserPass = checkUser["password"]

            ##- انشاء التحقق ان كان الباسورد التابع لهذا الايميل متطابق او لا

            try:

                passwordHash.verify(checkThisUserPass,password)

                session["id"]           = checkUser["id"]
                
                session["username"]     = checkUser["username"]
                
                session["photo"]        = checkUser["photo"]
                
                session["cover"]        = checkUser["cover"]

                cover_url = url_for('static', filename=f"uploads/covers/{checkUser["cover"]}")

                photo_url = url_for('static', filename=f"uploads/photos/{checkUser["photo"]}")

                return jsonify( status  = "success",
                
                userId                  = session["id"], 
                
                username                = session["username"], 
                
                photo                   = cover_url, 
                
                cover                   = photo_url )

            ##- اذا كان الباسورد غير متوافق مع الايميل في القاعدة , ارسل استعلام خاطئ

            except:

                return jsonify( status = "error", message = "login-if-password" )

        ########## - ########## - ########## - ##########

        ##- اذا كان الايميل غير موجود فـ ارسل استعلام خاطئ

        except:

            return jsonify( status = "error", message = "login-if-email" )       

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص فانكشن او مسار التحقق من الايميل قبل اعادة انشاء كلمة المرور

@project.route("/checkEmail", methods = ["GET","POST"])
def checkUserEmail():

    if request.method == "POST":

        email = request.form["email"]

        curData.execute("SELECT * FROM users WHERE email = %s",(email,))

        checkEmail = curData.fetchone()

        if checkEmail:

            return jsonify( status = "success", message = "icon-check" )

        else:

            return jsonify( status = "error", message = "icon-no" )

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص فانكشن او مسار تعديل كلمة المرور

@project.route("/editPassword", methods = ["GET","POST"])
def createNewPassword():

    if request.method == "POST":

        password    = request.form["password"]

        email       = request.form["email"]

        hashPass    = passwordHash.hash(password)

        curData.execute("UPDATE users SET password = %s WHERE email = %s",(hashPass,email,))

        dataBase.commit()

        return jsonify( status = "success" )

########## - ########## - ########## - ########## - ########## - ##########

##- حفظ معلومات تسجيل الدخول لاستخدامها عند تحديث الصفحة في الجافا سكربت

@project.route("/getData", methods = ["GET","POST"])
def getUserData():

    if "id" in session:

        cover_url = url_for( 'static', filename = f"uploads/covers/{session['cover']}")
       
        photo_url = url_for( 'static', filename = f"uploads/photos/{session['photo']}")

        return jsonify( status  = "success",
        
        userId                  = session["id"],
        
        username                = session["username"],
        
        photo                   = photo_url,
        
        cover                   = cover_url )
    
    else:

        return jsonify( status  = "error" )

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط فانكشن رفع وتحديث غلاف البروفايل

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'BMP'}
def checkImageRules(filename):

    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط فانكشن او مسار اظهار خطأ عند تجاوز الحد الاقصى لحجم الصور

@project.errorhandler(RequestEntityTooLarge)
def handleLargeFiles(e):

    return jsonify(status="error", message = "File too large. Max size is 50MB"), 413

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص فانكشن او مسار رفع صورة كوفر البروفايل

@project.route("/updataCover", methods = ["POST"])
def updataCoverImage():

    if "id" not in session:

        return jsonify(status="error", message = "unauthorized"), 403

    ########## - ########## - ########## - ########## - ##########

    file = request.files["cover"]
    
    ##- في حال كان الملف المرفوع موجود و متوافق مع الشروط فـ طبق ما يلي

    if file and checkImageRules(file.filename):

        ##- انشاء اسم مميز و فريد لهذه الصورة بحيث لا يتشابه مع اي اسم صورة اخرى

        filename = secure_filename(file.filename)
        
        filename = f"{int(time.time())}_{filename}"

        ########## - ########## - ########## - ##########
        
        ##- رفع او حفظ الصورة في المجلد المحدد الخاص بها في القاعدة

        save_path = os.path.join(project.config['UPLOAD_COVER'], filename)
        
        file.save(save_path)

        ########## - ########## - ########## - ##########
       
        ##- تحديث بيانات المستخدم بالصورة الجديدة استنادا على ايدي الجلسة

        curData.execute( "UPDATE users SET cover = %s WHERE id = %s",(filename, session["id"]))

        dataBase.commit()

        ########## - ########## - ########## - ##########
        
        ##- تحديث بيانات جلسة العضو الحالية و ايضا ارسال الاستعلام الجديد الى الواجهة

        session["cover"] = filename
        
        imageUrl = url_for('static', filename = f"uploads/covers/{filename}")
        
        return jsonify(status="success", imageUrl = imageUrl)

    return jsonify(status="error", message="File type not allowed"), 400

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص فانكشن او مسار رفع صورة المستخدم الشخصية

@project.route("/updataPhoto", methods = ["POST"])
def updataPhotoImage():

    if "id" not in session:

        return jsonify(status="error", message = "unauthorized"), 403

    ########## - ########## - ########## - ########## - ##########

    file = request.files["photo"]
    
    ##- في حال كان الملف المرفوع موجود و متوافق مع الشروط فـ طبق ما يلي

    if file and checkImageRules(file.filename):

        ##- انشاء اسم مميز و فريد لهذه الصورة بحيث لا يتشابه مع اي اسم صورة اخرى

        filename = secure_filename(file.filename)
        
        filename = f"{int(time.time())}_{filename}"

        ########## - ########## - ########## - ##########
        
        ##- رفع او حفظ الصورة في المجلد المحدد الخاص بها في القاعدة

        save_path = os.path.join(project.config['UPLOAD_PHOTO'], filename)
        
        file.save(save_path)

        ########## - ########## - ########## - ##########
       
        ##- تحديث بيانات المستخدم بالصورة الجديدة استنادا على ايدي الجلسة

        curData.execute( "UPDATE users SET photo = %s WHERE id = %s",(filename, session["id"]))

        dataBase.commit()

        ########## - ########## - ########## - ##########
        
        ##- تحديث بيانات جلسة العضو الحالية و ايضا ارسال الاستعلام الجديد الى الواجهة

        session["photo"] = filename
        
        imageUrl = url_for('static', filename = f"uploads/photos/{filename}")
        
        return jsonify(status="success", imageUrl = imageUrl)

    return jsonify(status="error", message="File type not allowed"), 400

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص فانكشن او مسار تعديل اسم المستخدم

@project.route("/editUsername", methods = ["GET","POST"])
def editUsername():

    if "id" not in session:

        return jsonify(status="error", message = "unauthorized"), 403

    if request.method == "POST":

        username = request.form["username"] ##- اختصار اسم المستخدم من الفورم

        curData.execute("UPDATE users SET username = %s WHERE id = %s",(username,session["id"])) ##- تحديث قاعدة بيانات المستخدم اعتمادا على الايدي

        dataBase.commit()

        session["username"] = username ##- تحديث بيانات الجلسة بالاسم الجديد

        return jsonify( status = "success", username = session["username"] )

########## - ########## - ########## - ########## - ########## - ##########

##- ضبط خواص فانكشن او مسار تسجيل الخروج من الحساب

@project.route("/logout", methods = ["GET","POST"])
def logoutFromAccount():

    session.clear()

    return redirect("/")

########## - ########## - ########## - ########## - ########## - ##########

##- تفعيل فلاسك

if __name__ == "__main__":

    print("Starting server...") 

    project.run( debug = True )
