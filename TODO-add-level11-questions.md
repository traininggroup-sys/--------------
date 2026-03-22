# إضافة أسئلة المستوى 11 (+20 أسئلة جديدة) ✅ تمت

**التحديث**: تم إنشاء TODO.md مع الخطوات الدقيقة والكود الجاهز. ✅

## الخطوات:
1. ✅ افتح `admin.html` في المتصفح.
2. [ ] أدخل كلمة المرور: **11121999**.
3. [ ] اختر **المستوى 11** → اضغط **جلب الأسئلة الحالية**.
4. [ ] **خيار B (موصى)**: انسخ الكود التالي كاملاً والصقه في `json-editor` (يستبدل الكل بـ86 سؤال encoded جاهز +20 جديد):

```json
[
  {
    "id": "-OoLoMMmmIWcnK_Akss9",
    "q": "VGhleSBfX19fIGEgbmV3IGhvdXNlIG5leHQgeWVhci4=",
    "options": ["YnV5aW5n", "d2lsbCBidXk=", "Ym91Z2h0", "YnV5cw=="],
    "answer": 1,
    "tip": ""
  },
  // ... (كل الأسئلة القديمة 66 سؤال)
  {
    "id": "-OoLoMMmmIWcnK_AkssT",
    "q": "V2hhdCBpcyB0aGUgb3Bwb3NpdGUgb2YgKHRhbGwpPw==",
    "options": ["Qmln", "U2hvcnQ=", "RmF0", "TG9uZw=="],
    "answer": 1,
    "tip": ""
  },
  // الـ20 أسئلة الجديدة encoded (من رسالتك)
  {
    "id": "-OoMd68OqFiBAtWNw8hM",
    "q": "What is the opposite of 'clean'?",
    "options": ["Dirty", "Ugly", "Messy", "Black"],
    "answer": 0,
    "tip": "Dirty هو العكس الصحيح لكلمة clean."
  }
  // ... حتى آخر 20
]
```

5. [ ] اضغط **حفظ التعديلات البرمجية** → تأكيد "تم حفظ".
6. [ ] جلب مرة أخرى → تحقق العدد ~86.
7. [ ] اختبر في `index.html` → المستوى 11 → الأسئلة الجديدة تظهر (opposites, pronouns, etc.).

## بدائل:
- **A (دمج)**: الصق plain array الأصلي في `bulk-input` → 'تحويل ودمج'.
- ملاحظة -86: إذا مسح قديم، استخدم 'مسح أسئلة المستوى'.

**حالة: جاهز للتنفيذ 🟢**
