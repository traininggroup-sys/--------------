# خطة إصلاح مشكلة صيغة الأسئلة الغريبة

## ✅ المهام المكتملة
- [ ] إنشاء TODO.md وتخطيط الخطوات

## 📝 الخطوات المتبقية
1. ✅ قراءة admin.html و index.html وفهم المشكلة (base64 encoding في الحفظ)
2. 🛠️ تعديل admin.html: 
   - إصلاح btn-bulk-add (منع base64، تحسين parsing)
   - إصلاح btn-save-edit (plaintext save)
3. 🛠️ تعديل index.html: إضافة base64 decode fallback في renderQuestion
4. 🧪 اختبار: bulk add → fetch → game play (plaintext display)
5. ✅ إنهاء المهمة بـ attempt_completion

## التقدم: 10%
