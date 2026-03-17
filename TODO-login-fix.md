# خطة إصلاح مشكلة تسجيل الدخول - TODO List

## ✅ الخطوات المكتملة
- [x] فهم الكود وتحليل المشكلة
- [x] الموافقة على الخطة
- [x] إنشاء TODO-login-fix.md

## ⏳ الخطوات المتبقية (سيتم التنفيذ بالترتيب)

### 1. **تحديث index.html** ✅ **مكتملة**
```
- إضافة console.log مفصل في login handler:
  * Login attempt: username
  * User exists: snapshot.exists()
  * Password match result
  * Firebase error details (e.code, e.message)

- تحسين toasts: "المستخدم غير موجود" | "كلمة مرور خاطئة" | "خطأ DB: [details]"

- دالة testFirebaseConnection() في DOMContentLoaded
```

### 2. **اختبار الـ Logs** ✅ **مكتشف: PERMISSION_DENIED**
```
✅ السبب: Firebase Database Rules تمنع القراءة/الكتابة
Console logs:
* Error loading admin config: Permission denied
* FIREBASE WARNING: set at /config/test failed: permission_denied 
* Firebase connection: ❌ FAILED PERMISSION_DENIED
```

### 3. **إصلاح Firebase Rules** ⭐ **القادمة**
```
1. اذهب https://console.firebase.google.com/project/levels-409ba
2. Realtime Database → Rules tab
3. غيّر من:
```
".read": "auth != null",
".write": "auth != null"
```
إلى:
```
".read": true,
".write": true
```
(مؤقتاً للاختبار - أعد أمانه لاحقاً)
4. Publish → Refresh index.html → جرب login
```

### 4. **الإنهاء** 
```
- [ ] attempt_completion مع open index.html
```

**الحالة**: خطة جاهزة | Logs أولاً | **الهدف: تشخيص دقيق**

