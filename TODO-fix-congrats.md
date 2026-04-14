# إصلاح رسالة المبروك عند العودة للمستويات

## الخطة المعتمدة
الرسالة تظهر بس عند تسجيل الدخول الأول، مش عند العودة من النتائج.

## الخطوات:
- [x] 1. إضافة متغير الحالة `let isNewLogin = false;`
- [x] 2. تعيين `isNewLogin = true;` في success تسجيل الدخول (قبل showLevels())
- [x] 3. شرط في showLevels(): `if(isNewLogin){ showToast...; isNewLogin=false; }`
- [x] 4. اختبار: login (toast مرة واحدة) → level → results → back to levels (لا toast)

## حالة التقدم: ✅ تمت المهمة بنجاح

## حالة التقدم: جاهز للتنفيذ
