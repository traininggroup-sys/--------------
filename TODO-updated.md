# خطة إضافة إدارة المستويات - TODO List

## ✅ الخطوات المكتملة
- [x] إنشاء ملف TODO.md لتتبع التقدم
- [x] قراءة admin.html للتحضير للتعديل

## ⏳ الخطوات المتبقية (سيتم تنفيذها بالترتيب)

### 1. **تحديث admin.html** ⭐ **القادمة**
   - إضافة قسم جديد "إدارة المستويات" **بعد** `<hr style="margin: 30px 0" />` وقبل label "اختر المستوى للإدارة"
   - HTML form مع 5 inputs/selects + 3 buttons + status
   - JS: 3 new functions (fetch/save/reset config)
   - Position: Inside first `.section` (background: #eef6ff)

### 2. **اختبار admin.html**
   - حفظ مستوى 12 في Firebase
   - التحقق من عدم كسر الأقسام الأخرى

### 3. **تحديث index.html**
   - Dynamic `loadLevelConfigs()`
   - Update `showLevels()`, modal, `startLevel()`

## التفاصيل الفنية للخطوة 1:
```
Target insertion point: After line ~85 (after prizes btn-group + before HR)
New select id="level-select-config" (1-100 options)
New inputs: id="config-questions", "config-passrate", "config-time", "config-password"
Status id="config-status"
Buttons: btn-fetch-config, btn-save-config, btn-reset-config
```

