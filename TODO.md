# خطة إصلاح مشكلة "شاشة النتيجة عالطول" ✅ الموافق عليها

**الحالة الحالية**: 0/8 ✅  
**التشخيص**: Firebase فارغ/فاسد → 3 skips → endLevel() فوراً

## ✅ الخطوات المكتملة
- [x] 1. تحليل index.html + اكتشاف endLevel() trigger
- [x] 2. قراءة admin.html + فهم Firebase structure  
- [x] 3. إنشاء TODO.md مع الخطوات

## 🔄 الخطوات التالية (سينضيف أسئلة Firebase)

### 4. [ ] إضافة 5 أسئلة تجريبية للمستوى 1
```
admin.html → كلمة مرور: 11121999 
→ المستوى 1 → Clear → Paste JSON → Save → Test
```

### 5. [ ] اختبار المستوى 1 في index.html
```
index.html → تسجيل → مستوى 1 → Console F12 → "Loaded 5 questions"
→ الأسئلة تظهر بدل النتيجة
```

### 6. [ ] تكرار للمستويات 2-11 (أولوية 2,3,4)
```
نفس الخطوات لكل مستوى (5 أسئلة min كل واحد)
```

### 7. [ ] إصلاح خطأ admin.html "Cannot read properties of undefined"
```
→ اقري admin.html console error → fix JSON validation
```

### 8. [ ] ✅ المهمة مكتملة
```
كل المستويات شغالة → attempt_completion
```

## الـ JSON الجاهز للمستوى 1 (انسخي كامل):
```
[
  {"question":"عاصمة مصر؟","options":["القاهرة","الإسكندرية","أسوان"],"answer":0},
  {"question":"2+2؟","options":["3","4","5"],"answer":1},
  {"question":"العملة المصرية؟","options":["دولار","جنيه","يورو"],"answer":1},
  {"question":"اللون الأبيض hex؟","options":["#000","#FFF","#F00"],"answer":1},
  {"question":"النهارده؟","options":["ليل","نهار","مساء"],"answer":1}
]
```

**التالي**: User adds questions → نتابع الخطوة 4-5 🚀
