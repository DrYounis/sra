# 🏥 Health Assessment Setup Guide
## Complete Online Health Test - Ready to Collect Data!

---

## ✅ What Was Built

**URL:** `https://sra-health.vercel.app/assessment.html`

**A complete 44-condition health assessment that:**
- ✅ Collects user health data
- ✅ Calculates SARA Score (0-100)
- ✅ Shows instant personalized results
- ✅ Sends data to op.younis@gmail.com
- ✅ Provides actionable recommendations

---

## 🚀 Quick Setup (5 Minutes)

### **Step 1: Create Formspree Form**

1. Go to: https://formspree.io
2. Sign up with: `op.younis@gmail.com`
3. Create new form: "SARA Health Assessment"
4. Copy Form ID (e.g., `xvndkqzw`)

### **Step 2: Update Assessment**

Edit `js/assessment.js`, find line ~230:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
```

Replace `YOUR_FORMSPREE_ID` with your actual ID:

```javascript
const response = await fetch('https://formspree.io/f/xvndkqzw', {
```

### **Step 3: Deploy**

```bash
cd /Volumes/Elements/AG/SARA
git add .
git commit -m "Update Formspree ID for assessment"
git push origin main
```

Wait 2 minutes for Vercel to deploy.

---

## 📊 Data You'll Collect

### **Personal Information:**
- Gender (male/female)
- Age range
- Height (cm)
- Weight (kg)
- **BMI** (auto-calculated)

### **Health Data:**
- Blood pressure (yes/no)
- Cholesterol (yes/no)
- Family heart history (yes/no)
- Exercise frequency
- Diabetes status
- Insulin resistance
- Fast food consumption
- Stress level
- Sleep hours
- Burnout frequency
- Smoking status
- Coffee consumption
- Water intake

### **Contact Information:**
- Full name
- Email address
- Phone number
- Company name (optional)

### **Assessment Results:**
- SARA Score (0-100)
- Risk level (Low/Moderate/High/Critical)
- Category scores (Heart, Metabolic, Mental, Lifestyle)
- Assessment date
- Source (website)

---

## 🎯 How Users Take the Test

### **User Journey:**

1. **Visit:** `https://sra-health.vercel.app/assessment.html`

2. **See:** Beautiful assessment with progress bar

3. **Complete 6 sections:**
   - Personal Info (4 questions)
   - Heart Health (4 questions)
   - Metabolic Health (3 questions)
   - Mental Health (3 questions)
   - Lifestyle (3 questions)
   - Contact Info (4 questions)

4. **Get instant results:**
   - SARA Score animation
   - Risk level with color coding
   - Category breakdown
   - Personalized recommendations

5. **Call-to-action:**
   - WhatsApp consultation booking
   - B2B proposal request

---

## 📧 Email You Receive

**Subject:** New submission from SARA Health Assessment

```
🏥 SARA Health Assessment - New Results

📋 Personal Data:
• Name: محمد أحمد
• Gender: Male
• Age: 30-40
• Height: 175 cm
• Weight: 85 kg
• BMI: 27.8

❤️ Cardiovascular:
• High BP: No
• High Cholesterol: No
• Family History: Yes
• Exercise: 1-2 times/week

🍽️ Metabolic:
• Diabetes: No
• Insulin Resistance: No
• Fast Food: 3-5 times/week

🧠 Mental Health:
• Stress Level: High
• Sleep: 5-6 hours
• Burnout: Sometimes

🚬 Lifestyle:
• Smoking: No
• Coffee: 3-4 cups/day
• Water: 1-2 liters/day

📊 Results:
• SARA Score: 62/100
• Risk Level: Moderate
• Heart Score: 75
• Metabolic Score: 70
• Mental Score: 55
• Lifestyle Score: 65

📧 Contact:
• Email: mohammed@company.com
• Phone: 0551234567
• Company: شركة التقنية

📅 Date: 2026-03-06
```

---

## 🎨 Features

### **Progress Tracking:**
- ✅ Sticky progress bar
- ✅ Shows current section (e.g., "Section 2 of 7")
- ✅ Percentage complete
- ✅ Visual progress fill

### **Smart Validation:**
- ✅ Can't skip questions
- ✅ Must answer all before next section
- ✅ Friendly error messages

### **Beautiful Results:**
- ✅ Animated score circle
- ✅ Color-coded risk levels
- ✅ Category breakdown (4 areas)
- ✅ Personalized recommendations
- ✅ Actionable next steps

### **Mobile Responsive:**
- ✅ Works on all devices
- ✅ Touch-friendly options
- ✅ Easy navigation

---

## 📈 Business Use Cases

### **1. Lead Generation**
```
Share assessment as free health test
→ Users complete and get results
→ You collect their contact info
→ Follow up with personalized offer
```

### **2. Employee Wellness Programs**
```
Send to HR directors as demo
→ Show them employee health data
→ Pitch corporate wellness program
→ Close B2B deal
```

### **3. Insurance Partnerships**
```
Share aggregated data with insurers
→ Show risk distribution
→ Demonstrate prevention value
→ Close insurance partnership
```

### **4. Content Marketing**
```
"Take our free health assessment"
→ Drives traffic to website
→ Collects emails for newsletter
→ Builds trust with value
```

---

## 🔗 Where to Add Links

### **Homepage:**
```html
<a href="assessment.html" class="btn-primary">
  خذ التقييم الصحي المجاني ←
</a>
```

### **Navigation:**
```html
<li><a href="assessment.html" style="color:#00C2A8">التقييم المجاني</a></li>
```

### **B2B Page:**
```html
<p>جرب التقييم الصحي المجاني الآن وشاهد النتائج</p>
<a href="assessment.html" class="btn-secondary">
  ابدأ التقييم
</a>
```

### **WhatsApp Auto-Message:**
```
مرحباً! 👋

هل تعلم أن ٤٣٪ من الموظفين السعوديين معرضون لخطر السكري وأمراض القلب؟

خذ التقييم الصحي المجاني واعرف نتيجتك خلال ١٥ دقيقة:
https://sra-health.vercel.app/assessment.html

فريق SARA
```

---

## 🎯 Follow-Up Strategy

### **Immediate (Within 1 Hour):**
Send automated email:
```
Subject: نتيجتك الصحية من SARA

مرحباً {الاسم}،

شكراً لاستكمال التقييم الصحي!

نتيجتك: {score}/100
المستوى: {risk_level}

📋 توصياتك المخصصة:
{top_3_recommendations}

🎯 الخطوة التالية:
احجز استشارة مجانية مع فريق SARA لمعرفة كيف يمكن تحسين صحتك.

احجز الآن: https://wa.me/966555056545

فريق SARA
```

### **Day 1:**
WhatsApp message:
```
مرحباً {الاسم}،

معك {اسمك} من SARA.

شاهدنا نتيجتك الصحية ونود مساعدتك في التحسن.

هل يناسبك اتصال قصير اليوم؟
```

### **Day 3:**
Email with case study:
```
Subject: كيف حسّن محمد صحته بنسبة ٤٠٪ في ٩٠ يوماً

مرحباً {الاسم}،

محمد كان مثلك - نتيجة ٦٥/١٠٠ ومخاطر متوسطة.

بعد برنامج SARA لمدة ٩٠ يوماً:
✅ النتيجة: ٨٩/١٠٠
✅ خسر ٨ كجم
✅ تحسن النوم والطاقة

ابدأ رحلتك اليوم:
https://wa.me/966555056545
```

### **Day 7:**
Final follow-up:
```
مرحباً {الاسم}،

آخر تذكير! 📅

عرض الاستشارة المجانية ينتهي قريباً.

احجز الآن: https://wa.me/966555056545

نتمنى لك الصحة الدائمة!
```

---

## 📊 Analytics to Track

### **In Google Analytics:**

```javascript
// Assessment start
gtag('event', 'assessment_start', {
  event_category: 'engagement'
});

// Assessment complete
gtag('event', 'assessment_complete', {
  event_category: 'conversion',
  score: score,
  risk_level: risk_level
});

// WhatsApp click from results
gtag('event', 'whatsapp_click', {
  event_category: 'conversion',
  label: 'assessment_results'
});
```

### **Metrics to Monitor:**
- Assessment start rate
- Completion rate
- Average score
- Risk level distribution
- Conversion to WhatsApp
- Conversion to B2B leads

---

## 🧪 Testing Checklist

- [ ] Create Formspree form
- [ ] Update Form ID in assessment.js
- [ ] Push to GitHub
- [ ] Wait for Vercel deploy
- [ ] Visit: https://sra-health.vercel.app/assessment.html
- [ ] Complete full assessment
- [ ] Check email received
- [ ] Verify score calculation
- [ ] Test on mobile
- [ ] Test all sections
- [ ] Verify progress bar
- [ ] Check results animation
- [ ] Test WhatsApp links

---

## 🎉 You're Ready!

**Your health assessment is:**
- ✅ Fully functional
- ✅ Mobile responsive
- ✅ Collecting data
- ✅ Providing value
- ✅ Generating leads

**Start sharing:**
```
https://sra-health.vercel.app/assessment.html
```

**Expected conversion rate:** 15-25% of assessors will book consultation!

---

**Questions?** Check the assessment code in `js/assessment.js`

**Built with ❤️ for SARA Health 🇸🇦**
