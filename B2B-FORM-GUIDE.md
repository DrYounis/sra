# 🎯 B2B Lead Form Setup Guide
## Scale Your Business with Qualified Leads

---

## ✅ What Was Created

### **Files:**
- `b2b-lead-form.html` - Professional B2B lead form (Arabic)
- `setup-b2b-form.sh` - Automated setup script

### **Email:**
- Sends to: **op.younis@gmail.com**
- Service: Formspree (free 50 submissions/month)

---

## 🚀 Quick Setup (5 Minutes)

### **Run This Command:**

```bash
cd /Volumes/Elements/AG/SARA
./setup-b2b-form.sh
```

### **Follow the Prompts:**

1. **Go to https://formspree.io**
2. **Sign up** with `op.younis@gmail.com`
3. **Create form:** "SARA B2B Leads"
4. **Copy Form ID** (e.g., `xvndkqzw`)
5. **Enter Form ID** when prompted
6. **Script does the rest!**

---

## 📊 Data Collected (Minimum to Scale)

### **Section 1: Company Information**
| Field | Why It Matters |
|-------|----------------|
| **Company Name** | Qualify and research |
| **Employee Count** | Pricing tier (500-1000, 1000-3000, 3000-5000, 5000+) |
| **Industry** | Segment: Tech, Finance, Healthcare, Manufacturing, etc. |
| **City** | Target: Riyadh, Jeddah, Dammam, etc. |

### **Section 2: Contact Person**
| Field | Why It Matters |
|-------|----------------|
| **Full Name** | Decision maker |
| **Position** | CEO, CFO, HR Director (qualify authority) |
| **Email** | Send proposal here |
| **Phone** | Follow-up call |

### **Section 3: Requirements**
| Field | Why It Matters |
|-------|----------------|
| **Service Interest** | Assessment only, Full program, Enterprise |
| **Timeline** | Urgency: Immediate, 1 month, 3 months |
| **Message** | Additional context |

---

## 📧 Email You Receive

**Subject:** New submission from SARA B2B Lead

```
🎯 طلب عرض سعر جديد - SARA B2B

📋 معلومات الشركة:
• الاسم: شركة التقنية المتقدمة
• عدد الموظفين: 1000-3000
• القطاع: تقنية واتصالات
• المدينة: الرياض

👤 بيانات التواصل:
• الاسم: محمد أحمد
• المنصب: مدير موارد بشرية
• البريد: mohammed@company.com
• الجوال: 0551234567

💼 المتطلبات:
• الخدمة: البرنامج الكامل (ASSESS + COACH)
• الوقت: خلال شهر

📝 رسالة: نود معرفة المزيد عن باقة المؤسسات

📅 التاريخ: 2026-03-06
```

---

## 🎯 Why This Data Scales Your Business

### **1. Company Size → Pricing**
- 500-1000 employees → Essentials (SAR 50/employee)
- 1000-3000 employees → Pro (SAR 100/employee)
- 3000-5000 employees → Enterprise (SAR 150/employee)
- 5000+ employees → Custom negotiation

### **2. Position → Sales Strategy**
- **CEO/CFO** → Focus on ROI, cost savings
- **HR Director** → Focus on employee wellness
- **HR/Operations** → Focus on implementation ease

### **3. Timeline → Priority**
- **Immediate** → Hot lead, call within 2 hours
- **1 month** → Warm lead, call within 24 hours
- **3 months** → Nurture, monthly follow-up
- **Just looking** → Add to newsletter

### **4. Industry → Use Cases**
- **Tech** → Stress reduction, productivity
- **Finance** → Compliance, risk management
- **Healthcare** → Staff wellness, patient care
- **Manufacturing** → Safety, absenteeism

### **5. City → Targeting**
- **Riyadh** → HQ market, in-person meetings
- **Jeddah/Dammam** → Regional expansion
- **Other cities** → Remote implementation

---

## 📈 Lead Scoring System

### **Hot Leads (Call Immediately):**
```
✓ Company size: 1000+ employees
✓ Position: CEO, CFO, CHRO
✓ Timeline: Immediate
✓ Service: Full program or Enterprise
```

### **Warm Leads (Call Within 24 Hours):**
```
✓ Company size: 500-1000 employees
✓ Position: HR Director, Operations
✓ Timeline: Within 1 month
✓ Service: Any paid option
```

### **Cold Leads (Nurture):**
```
✓ Company size: <500 employees
✓ Position: Junior staff
✓ Timeline: 3+ months or "just looking"
```

---

## 🔄 Sales Process

### **Step 1: Lead Comes In**
```
Form submission → op.younis@gmail.com
        ↓
Check lead score (Hot/Warm/Cold)
        ↓
Add to CRM/spreadsheet
```

### **Step 2: Immediate Action**
```
Hot Lead → Call within 2 hours
Warm Lead → Call within 24 hours
Cold Lead → Add to nurture sequence
```

### **Step 3: Follow-Up Sequence**
```
Day 0: Receive lead, call immediately
Day 1: Send proposal email
Day 3: Follow-up call
Day 7: Send case study
Day 14: Final follow-up
Day 30: Check-in
```

---

## 📊 Track These Metrics

### **Weekly:**
- Total leads received
- Hot/Warm/Cold breakdown
- Response time
- Conversion rate

### **Monthly:**
- Leads by company size
- Leads by industry
- Leads by city
- Average deal size
- Sales cycle length

### **Quarterly:**
- Best performing industries
- Best performing cities
- Most common company sizes
- Revenue by lead source

---

## 🎨 Form Features

### **Design:**
- ✅ Modern gradient background (Navy/Teal)
- ✅ Arabic RTL support
- ✅ Mobile responsive
- ✅ Professional typography
- ✅ Smooth animations

### **Functionality:**
- ✅ Real-time validation
- ✅ Required fields marked
- ✅ Dropdown selections
- ✅ Success/error messages
- ✅ Auto-date tracking
- ✅ WhatsApp integration (optional)

### **Analytics:**
- ✅ Google Analytics events
- ✅ Form submission tracking
- ✅ Company size tracking
- ✅ Industry tracking
- ✅ Timeline tracking

---

## 🔗 Add Form Link to Website

### **Update b2b.html:**

Find the hero CTA button and update:

```html
<!-- OLD -->
<a href="https://wa.me/966555056545" class="btn-primary">
  احجز عرضاً مجانياً ←
</a>

<!-- NEW -->
<a href="b2b-lead-form.html" class="btn-primary">
  اطلب عرض سعر ←
</a>
```

### **Add to Navigation:**

```html
<ul class="nav-links">
  <li><a href="index.html">الرئيسية</a></li>
  <li><a href="b2b.html">للشركات</a></li>
  <li><a href="b2b-lead-form.html" style="color:#E8B84B">اطلب عرضاً</a></li>
  <li><a href="insurance.html">لشركات التأمين</a></li>
</ul>
```

---

## 📱 WhatsApp Integration (Optional)

### **Enable WhatsApp Notification:**

Edit `b2b-lead-form.html`, find the form handler, uncomment:

```javascript
// Optional: Also send to WhatsApp
setTimeout(() => {
  window.open(
    `https://wa.me/966555056545?text=${encodeURIComponent(whatsappMessage)}`,
    '_blank'
  );
}, 1500);
```

This will:
1. Submit form to Formspree
2. Open WhatsApp with pre-filled message
3. Send to your WhatsApp: `+966 55 505 6545`

---

## 🎯 Best Practices

### **Response Time:**
- ⚡ Hot leads: Call within 2 hours
- 📞 Warm leads: Call within 24 hours
- 📧 Cold leads: Email within 24 hours

### **Proposal Template:**
```
Subject: عرض سعر MIRA - {Company Name}

Dear {Contact Name},

Thank you for your interest in SARA...

Based on your requirements:
- Company: {Company Name}
- Employees: {Company Size}
- Service: {Interest}

We recommend: {Package}
Investment: {Price}
ROI: {Savings}

Next steps: {Call/Meeting}

Best regards,
Your Name
```

### **Follow-Up Script:**
```
مرحباً {الاسم}،

معك {اسمك} من SARA.

تواصلتم معنا بخصوص برنامج الصحة المؤسسية.

هل يناسبك اتصال قصير اليوم أو غداً
لمناقشة احتياجات شركتكم؟

شكراً،
{اسمك}
```

---

## 🧪 Test Your Form

### **Step 1: Wait for Deploy**
```
Wait 2-3 minutes after setup
```

### **Step 2: Visit Form**
```
https://sra-health.vercel.app/b2b-lead-form.html
```

### **Step 3: Submit Test Lead**
```
Company: شركة اختبار
Employees: 1000-3000
Industry: تقنية
City: الرياض
Name: محمد أحمد
Position: مدير موارد بشرية
Email: test@example.com
Phone: 0551234567
Service: البرنامج الكامل
Timeline: خلال شهر
```

### **Step 4: Check Email**
```
Check: op.younis@gmail.com
Subject: New submission from SARA B2B Lead
```

---

## 📈 Scale Your Business

### **Phase 1: 0-10 Leads/Month**
- Manual follow-up
- Spreadsheet tracking
- Personal calls

### **Phase 2: 10-50 Leads/Month**
- CRM system (HubSpot free)
- Email templates
- Automated follow-up

### **Phase 3: 50+ Leads/Month**
- Sales team
- Lead scoring automation
- Marketing automation
- Multiple channels

---

## ✅ Checklist

- [ ] Run setup script: `./setup-b2b-form.sh`
- [ ] Get Formspree ID
- [ ] Test form submission
- [ ] Check email received
- [ ] Add form link to b2b.html
- [ ] Set up CRM/spreadsheet
- [ ] Create proposal template
- [ ] Create follow-up script
- [ ] Train sales team
- [ ] Start generating leads!

---

## 🎉 You're Ready to Scale!

**Your B2B lead form is:**
- ✅ Professional and modern
- ✅ Optimized for conversions
- ✅ Collects minimum viable data
- ✅ Sends to op.younis@gmail.com
- ✅ Ready to scale your business

**Run the setup and start getting leads!** 🚀

```bash
cd /Volumes/Elements/AG/SARA
./setup-b2b-form.sh
```

---

**Questions?** Check the form at:
```
https://sra-health.vercel.app/b2b-lead-form.html
```
