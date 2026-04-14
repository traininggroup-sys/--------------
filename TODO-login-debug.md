# Debug Login Issue - خطوات سريعة

## 1. افتح Console (F12)
```
- اضغط F12 → Console tab
- Reload الصفحة
- انسخ كل الأخطاء الحمرا (خاصة Firebase/permission)
```

## 2. Test Login
```
- اكتب اسم + 4 أرقام
- اضغط دخول
- شوف Console logs الجديدة
```

## 3. Copy Errors Here
```
انسخ الـ errors هنا بالكامل
```

**السبب المحتمل**: Firebase Rules اتغيرت (كان شغال → rules اتشددت)

**الحل السريع**: 
1. Firebase Console → levels-409ba → Realtime Database → Rules
2. `".read": true, ".write": true`
3. Publish → Test

**انسخ Console errors هنا للتشخيص الدقيق! 🔍**

