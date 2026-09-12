<div align="center">

# 🔍 Forensic Engine v2.0

### Discord Security & Anti-Alt Radar

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square&logo=node.js)
![Discord.js](https://img.shields.io/badge/Discord.js-14.x-blue?style=flat-square&logo=discord)
![Version](https://img.shields.io/badge/Version-2.0.26-red?style=flat-square)
![Status](https://img.shields.io/badge/Status-Online-brightgreen?style=flat-square)

---

**أداة احترافية لحماية مجتمعات ديسكورد**

كشف المحتالين وفضح الحسابات المزيفة عن طريق تتبع روابط الدعوة

---

[![جرب البوت الآن](https://img.shields.io/badge/جرب_البوت_الآن-اضغط_هنا-blue?style=for-the-badge&logo=discord)](https://discord.com/oauth2/authorize?client_id=1492697052449083502&permissions=8&integration_type=0&scope=bot)

</div>

---

## 📋 المحتويات

- [عن البوت](#-about)
- [الميزات](#-features)
- [كيف يعمل](#-how-it-works)
- [الأوامر](#-commands)
- [تجربة مباشرة](#-live-demo)
- [التثبيت](#-installation)
- [الإعداد](#-configuration)
- [المتطلبات](#-requirements)
- [حل المشاكل](#-troubleshooting)
- [الدعم](#-support)

---

## 📖 عن البوت

في مجتمعات ديسكورد الكبيرة، المحتالون يستخدمون **حسابات مزيفة** لإرسال إعلانات ورسائل مزعجة. لكنهم غالباً يستخدمون **روابط دعوة دائمة**missible من حساباتهم الرئيسية.

**Forensic Engine** يكشف هذه الروابط ويُظهر هوية صاحبها الحقيقي، مما يكشف المحتال وراء الحملة.

---

## ⚡ الميزات

- 🔗 **تتبع الروابط** - فك أي رابط دعوة لمعرفة صاحبه
- 👤 **تحليل المستخدمين** - تحليل الصلاحيات والسيرفرات المشتركة
- 🛡️ **كشف الحسابات المزيفة** - اكتشاف الحسابات المستخدمة لل_SPAM
- 📊 **استخراج البيانات** - استخراج معلومات السيرفر بدقة عالية

---

## 🔄 كيف يعمل

```
┌─────────────────────────────────────────────────────────────┐
│                    كيف يعمل البوت                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1️⃣  إدخال الرابط                                            │
│  ├─ المستخدم يضع رابط دعوة ديسكورد                           │
│  └─ البوت يتحقق من صحة الرابط                               │
│                                                              │
│  2️⃣  التتبع العميق                                           │
│  ├─ فك معلومات الرابط                                        │
│  ├─ استخراج هوية صاحب الرابط                                 │
│  └─ جلب معلومات السيرفر                                     │
│                                                              │
│  3️⃣  التحليل                                                 │
│  ├─ إنشاء تقرير forensics                                   │
│  ├─ عرض مصفوفة الصلاحيات                                    │
│  └─ ربط الاتصالات المشتركة                                  │
│                                                              │
│  4️⃣  الكشف                                                  │
│  ├─ كشف الحساب الرئيسي وراء الحساب المزيف                    │
│  ├─ إظهار تاريخ إنشاء الحساب                                │
│  └─ تقديم أدلة للمشرفين                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎮 الأوامر

### `/check <link>`

**تحليل forensics عالي الدقة واستخراج البيانات**

- المعامل: `link` (نص) - رابط الدعوة أو الكود

**النتائج:**
- 🛡️ معلومات السيرفر (المالك، تاريخ الإنشاء، معرف السيرفر)
- 👤 صاحب الرابط (الاسم، المعرف، تاريخ الإنشاء)
- 🔗 حالة الرابط (دائم/مؤقت، وقت الانتهاء)
- 🧪 بروستات السيرفر (العدد والمستوى)
- 📊 عدد الأعضاء (المجموع + المتصلين)

---

### `/checkuser <id>`

**تحليل forensics متقدم للصلاحيات**

- المعامل: `id` (نص) - معرف المستخدم

**النتائج:**
- 📋 الهوية الأساسية (الاسم، اسم المستخدم، المعرف)
- 🕰 سجل الأوقات (تاريخ إنشاء الحساب)
- 👑 كشف玩家朋友 (السيرفرات المملوكة)
- 📜 تتبع الصلاحيات (المصفوفة الكاملة)
- 🌐 دليل السيرفرات المشتركة

---

## 🧪 تجربة مباشرة

### جرب البوت الآن!

أضف البوت إلى سيرفرك وجرّبه:

[![أضف للسيرفر](https://img.shields.io/badge/أضف_للسيرفر-اضغط_هنا-green?style=for-the-badge&logo=discord)](https://discord.com/oauth2/authorize?client_id=1492697052449083502&permissions=8&integration_type=0&scope=bot)

### كيف تجربه:

1. أضف البوت لسيرفرك
2. اكتب `/check` الصق أي رابط دعوة
3. شوف النتائج!

---

## 🚀 التثبيت

### المتطلبات المسبقة

- [Node.js](https://nodejs.org/) الإصدار 18 أو أعلى
- حساب على [Discord Developer Portal](https://discord.com/developers/applications)
- مدير حزم npm أو yarn

### البدء السريع

```bash
# 1. نسخ المستودع
git clone https://github.com/ar5594/full-info-discord.git

# 2. الدخول للمجلد
cd full-info-discord

# 3. تثبيت الحزم
npm install

# 4. تشغيل البوت
npm start
```

---

## ⚙️ الإعداد

### الخطوة 1: إنشاء ملف `.env`

أنشئ ملف اسمه `.env` في المجلد الرئيسي وأضف:

```env
TOKEN=توكن_البوت_الخاص_بك
CLIENT_ID=معرف_التطبيق_الخاص_بك
USER_TOKEN=توكن_الحساب_الخاص_بك
```

### الخطوة 2: الحصول على التوكنات

- **TOKEN** - من [Discord Developer Portal](https://discord.com/developers/applications) → Bot → Token
- **CLIENT_ID** - من [Discord Developer Portal](https://discord.com/developers/applications) → General Information
- **USER_TOKEN** - فع Developer Mode في ديسكورد → كليك يمين على ملفك الشخصي → Copy User Token

### الخطوة 3: شغّل البوت

```bash
npm start
```

---

## 📌 المتطلبات

- ✅ Node.js 18+ (أحدث إصدار مستقر)
- ✅ discord.js v14 (للبوت الأساسي)
- ✅ discord.js-selfbot-v13 (لأمر /checkuser)
- ⚠️ سيرفر مشترك (لأمر /checkuser)
- ✅ صلاحيات البوت (صلاحيات Administrator مفضلة)

### ملاحظات مهمة

- **سيرفر مشترك مطلوب:** عشان أمر `/checkuser` يشتغل، الحساب المستخدم لل刮oux لازم يكون في نفس السيرفر مع المستخدم المستهدف
- **Self-Botting:** أمر `/checkuser` يستخدم `discord.js-selfbot-v13`. هذا مخالف لشروط استخدام ديسكورد

---

## 🔧 حل المشاكل

- **البوت ما يرد** - تحقق من التوكن في ملف `.env`
- **الأوامر ما تظهر** - شغّل `npm start` مرة ثانية
- **`/checkuser` ما يشتغل** - تأكد إن في سيرفر مشترك
- **صلاحيات مرفوضة** - أضف صلاحيات Administrator للبوت

### مساعدة إضافية

إذا واجهت مشاكل:
1. راجع [حل المشاكل](#-troubleshooting) أعلاه
2. ابحث في [GitHub Issues](https://github.com/ar5594/full-info-discord/issues)
3. انضم لـ [مجتمعنا على ديسكورد](https://discord.gg/wxkxHmR9GT)

---

## 📞 الدعم

### المجتمع

- **سيرفر ديسكورد:** [انضم للمجتمع](https://discord.gg/wxkxHmR9GT)
- **المطور:** `r.vu` (k9k)

### المشاكل والاقتراحات

لقيت مشكلة أو عندك اقتراح؟ افتح Issue على [GitHub Issues](https://github.com/ar5594/full-info-discord/issues)

---

<div align="center">

### ⭐ نجمة للمستودع إذا لقيته مفيد!

[![GitHub Stars](https://img.shields.io/github/stars/ar5594/full-info-discord?style=social)](https://github.com/ar5594/full-info-discord/stargazers)

---

**صنع بـ ❤️ بواسطة k9k (r.vu)**

*Forensic Engine v2.0.26 - الإصدار المُحكَم*

</div>
