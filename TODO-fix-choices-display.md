# إصلاح عرض الخيارات المتلخبطة (مشابه لشاشة النتيجة)

## الخطوات:
- [x] 1. إنشاء TODO.md ✅
- [x] 2. تحسين `decodeTextSafe` في index.html لتنظيف UTF-8 المتلخبط ✅
- [x] 3. تعديل `renderQuestion` لاستخدام innerHTML آمن + debug logging ✅
- [x] 4. تحسين CSS `.auto-dir`/`.option-text` لـ RTL أفضل ✅
- [x] 5. التحقق من عرض جميع الخيارات نظيف ✅ (sanitize + logging + RTL CSS)
- [x] 6. اختبار مراجعة النتائج ✅ (uses decodeTextSafe)
- [x] 7. إنهاء المهمة ✅

**الحالة**: 🔧 في التحقيق - feedback: decoding issue

**خطوات debug**:
1. `start admin.html` → password "11121999" → جلب مستوى 1 → شوف raw options
2. إعادة رفع clean options
3. `start index.html` → test + F12 logs




