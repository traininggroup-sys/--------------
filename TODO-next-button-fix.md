# TODO: إصلاح زرار "السؤال التالي" - مش بيشتغل بسلاسة

## خطة الإصلاح المعتمدة ✅

### [ ] 1. إنشاء TODO ✅ **مكتمل**
```bash
create_file TODO-next-button-fix.md
```

### ✅ 2. **تحديث index.html** ⭐ **مكتمل**

**4 edits مستهدفة ✅:**
| الملف | التغيير | السبب |
|-------|----------|-------|
| index.html | console.log traces في next handler | تتبع مكان الـ hang |
| index.html | تحسين disable/reset logic | ضمان reset حتى لو error |
| index.html | try/catch في decode + batch DOM | منع decode crash |
| index.html | pause timer أثناء render | منع timer/render conflict |

**4 edits مستهدفة:**
| الملف | التغيير | السبب |
|-------|----------|-------|
| index.html | console.log traces في next handler | تتبع مكان الـ hang |
| index.html | تحسين disable/reset logic | ضمان reset حتى لو error |
| index.html | try/catch في decode + batch DOM | منع decode crash |
| index.html | pause timer أثناء render | منع timer/render conflict |

### [ ] 3. **اختبار** 
```
1. open index.html → العب level → اضغط next بسرعة
2. Console: شوف logs وأخطاء
3. F12 → Network: تحقق Firebase requests
```

### [ ] 4. **تحليل وإصلاح نهائي**
- لو decode error → إصلاح base64 في admin
- لو timer conflict → تحسين timer logic

### [ ] 5. **إنهاء** ✅
```
attempt_completion + open index.html demo
```

**الحالة:** خطة معتمدة ✅ | **انتظار نتائج الاختبار** | تقدم: 40%


