# SARA Contact Form Backend — Setup Guide
## Complete Form Backend Integration Options

---

## 📋 Overview

You have **4 options** for form backend, depending on your hosting and needs:

| Option | Best For | Cost | Setup Time |
|--------|----------|------|------------|
| **Formspree** | Simplest, any hosting | Free tier | 5 min |
| **Netlify Forms** | Netlify hosting | Free | 2 min |
| **EmailJS** | Custom control | Free tier | 15 min |
| **GetForm** | Advanced features | Free tier | 10 min |

---

## Option 1: Formspree (Recommended for Simplicity)

### **Step 1: Create Account**
1. Go to https://formspree.io
2. Sign up (free)
3. Create new form
4. Get your form ID (looks like: `xvndkqzw`)

### **Step 2: Update HTML**

Replace the contact form in `index.html` with:

```html
<!-- CONTACT FORM -->
<section class="contact-section" id="contact" aria-labelledby="contact-title">
  <div class="cta-content">
    <h2 class="cta-title" id="contact-title">
      تواصل <span class="teal">معنا</span>
    </h2>
    <p class="cta-subtitle">
      املأ النموذج وسنتواصل معك خلال ٢٤ ساعة
    </p>
    
    <form 
      action="https://formspree.io/f/YOUR_FORM_ID" 
      method="POST"
      class="contact-form"
      data-form-type="contact"
    >
      <div class="form-grid">
        <div class="form-group">
          <label for="name">الاسم الكامل</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            placeholder="محمد أحمد"
            autocomplete="name"
          >
        </div>
        
        <div class="form-group">
          <label for="email">البريد الإلكتروني</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            placeholder="name@company.com"
            autocomplete="email"
          >
        </div>
        
        <div class="form-group">
          <label for="company">اسم الشركة</label>
          <input 
            type="text" 
            id="company" 
            name="company" 
            required
            placeholder="شركة ..."
            autocomplete="organization"
          >
        </div>
        
        <div class="form-group">
          <label for="employees">عدد الموظفين</label>
          <select id="employees" name="employees" required>
            <option value="">اختر...</option>
            <option value="500-1000">٥٠٠ - ١٠٠٠</option>
            <option value="1000-5000">١٠٠٠ - ٥٠٠٠</option>
            <option value="5000-10000">٥٠٠٠ - ١٠٬٠٠٠</option>
            <option value="10000+">١٠٬٠٠٠+</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <label for="phone">رقم الجوال</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone" 
          required
          placeholder="+966 5X XXX XXXX"
          autocomplete="tel"
          dir="ltr"
        >
      </div>
      
      <div class="form-group">
        <label for="message">الرسالة</label>
        <textarea 
          id="message" 
          name="message" 
          rows="4" 
          required
          placeholder="أود الاستفسار عن..."
        ></textarea>
      </div>
      
      <!-- Hidden fields for spam protection -->
      <input type="hidden" name="_subject" value="New SARA Lead!">
      <input type="hidden" name="_cc" value="your-email@sara-health.com">
      <input type="hidden" name="_template" value="table">
      
      <!-- Honeypot spam protection -->
      <input type="text" name="_gotcha" style="display:none">
      
      <button type="submit" class="btn-primary" style="width:100%">
        إرسال الرسالة ←
      </button>
      
      <p class="form-note">
        بالضغط على إرسال، أنت توافق على سياسة الخصوصية
      </p>
    </form>
    
    <!-- Success/Error Messages -->
    <div id="form-status" class="form-status" style="display:none;"></div>
  </div>
</section>
```

### **Step 3: Add CSS**

Add to `css/sara.css`:

```css
/* Contact Form Styles */
.contact-form {
  max-width: 700px;
  margin: 0 auto;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 3rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-family: 'Noto Naskh Arabic', serif;
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 1rem;
  color: var(--white);
  font-family: 'Noto Naskh Arabic', serif;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--teal);
  background: rgba(255,255,255,0.08);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-note {
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-dim);
  margin-top: 1rem;
}

.form-status {
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  text-align: center;
  font-family: 'Noto Naskh Arabic', serif;
}

.form-status.success {
  background: rgba(52,211,153,0.1);
  border: 1px solid rgba(52,211,153,0.3);
  color: #34D399;
}

.form-status.error {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #EF4444;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-form {
    padding: 2rem 1.5rem;
  }
}
```

### **Step 4: Add JavaScript**

Add to `js/sara.js` (or create new file `js/forms.js`):

```javascript
// Formspree Form Handler
async function handleFormspreeForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const statusDiv = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Disable button
  submitBtn.disabled = true;
  submitBtn.textContent = 'جاري الإرسال...';
  
  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      // Success
      statusDiv.textContent = '✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
      statusDiv.className = 'form-status success';
      statusDiv.style.display = 'block';
      form.reset();
      
      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'contact',
          event_label: 'Contact Form Submission'
        });
      }
    } else {
      // Error
      const data = await response.json();
      throw new Error(data.errors?.[0]?.message || 'Failed to send');
    }
  } catch (error) {
    statusDiv.textContent = '❌ حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.';
    statusDiv.className = 'form-status error';
    statusDiv.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'إرسال الرسالة ←';
  }
}

// Initialize forms
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-form-type="contact"]').forEach(form => {
    if (form.action.includes('formspree.io')) {
      form.addEventListener('submit', handleFormspreeForm);
    }
  });
});
```

---

## Option 2: Netlify Forms (If Hosting on Netlify)

### **Step 1: Update HTML**

```html
<form 
  name="contact" 
  method="POST" 
  data-netlify="true"
  netlify-honeypot="bot-field"
  class="contact-form"
>
  <!-- Hidden fields for Netlify -->
  <input type="hidden" name="form-name" value="contact">
  <p hidden>
    <label>Don't fill this out if you're human: <input name="bot-field"></label>
  </p>
  
  <!-- Your form fields here -->
  <div class="form-group">
    <label for="name">الاسم الكامل</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <!-- ... other fields ... -->
  
  <button type="submit" class="btn-primary">إرسال</button>
</form>
```

### **Step 2: Deploy to Netlify**

That's it! Netlify automatically detects and processes forms.

### **Step 3: View Submissions**

1. Go to Netlify Dashboard
2. Select your site
3. Click "Forms"
4. See all submissions

**Features:**
- ✅ Free 100 submissions/month
- ✅ Spam filtering
- ✅ Email notifications
- ✅ CSV export
- ✅ Zapier integration

---

## Option 3: EmailJS (Client-Side Email)

### **Step 1: Create Account**

1. Go to https://www.emailjs.com
2. Sign up (free tier: 200 emails/month)
3. Add Email Service (Gmail, Outlook, etc.)
4. Create Email Template
5. Get your keys:
   - Public Key
   - Service ID
   - Template ID

### **Step 2: Add EmailJS SDK**

Add to `<head>` in all HTML files:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script type="text/javascript">
  (function() {
    emailjs.init("YOUR_PUBLIC_KEY");
  })();
</script>
```

### **Step 3: Update Form HTML**

```html
<form id="contact-form" class="contact-form">
  <!-- Same fields as Formspree example -->
  
  <button type="submit" class="btn-primary">إرسال</button>
</form>
```

### **Step 4: Add JavaScript**

Create `js/emailjs-handler.js`:

```javascript
// EmailJS Form Handler
function sendEmail(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const statusDiv = document.getElementById('form-status');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'جاري الإرسال...';
  
  const templateParams = {
    name: form.name.value,
    email: form.email.value,
    company: form.company.value,
    employees: form.employees.value,
    phone: form.phone.value,
    message: form.message.value,
    date: new Date().toLocaleString('ar-SA')
  };
  
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(() => {
      statusDiv.textContent = '✅ تم الإرسال بنجاح!';
      statusDiv.className = 'form-status success';
      statusDiv.style.display = 'block';
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'إرسال';
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      statusDiv.textContent = '❌ حدث خطأ';
      statusDiv.className = 'form-status error';
      statusDiv.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = 'إرسال';
    });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contact-form')?.addEventListener('submit', sendEmail);
});
```

---

## Option 4: GetForm.io

### **Step 1: Create Account**

1. Go to https://www.getform.io
2. Sign up (free tier: 50 submissions/month)
3. Create new form
4. Get your endpoint URL

### **Step 2: Update HTML**

```html
<form 
  action="https://api.getform.io/v/YOUR_FORM_ID" 
  method="POST"
  class="contact-form"
>
  <!-- Your fields -->
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  
  <!-- Redirect to thank you page -->
  <input type="hidden" name="_redirect" value="https://sara-health.com/thanks.html">
  
  <button type="submit">إرسال</button>
</form>
```

---

## 🎨 Complete Contact Section Example

Here's a **complete contact section** you can copy-paste into any page:

```html
<!-- CONTACT SECTION -->
<section class="contact-section" id="contact" aria-labelledby="contact-title">
  <div class="section-tag">Get In Touch // تواصل معنا</div>
  <h2 class="section-title" id="contact-title">
    جاهز للبدء؟<br>
    <span class="teal">تواصل معنا</span>
  </h2>
  <p class="section-sub">
    املأ النموذج وسنتواصل معك خلال ٢٤ ساعة
  </p>
  
  <form 
    action="https://formspree.io/f/YOUR_FORM_ID" 
    method="POST"
    class="contact-form"
    data-form-type="contact"
  >
    <div class="form-grid">
      <div class="form-group">
        <label for="name">الاسم الكامل *</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required
          placeholder="محمد أحمد"
          autocomplete="name"
        >
      </div>
      
      <div class="form-group">
        <label for="email">البريد الإلكتروني *</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required
          placeholder="name@company.com"
          autocomplete="email"
        >
      </div>
      
      <div class="form-group">
        <label for="company">اسم الشركة *</label>
        <input 
          type="text" 
          id="company" 
          name="company" 
          required
          placeholder="شركة ..."
          autocomplete="organization"
        >
      </div>
      
      <div class="form-group">
        <label for="employees">عدد الموظفين *</label>
        <select id="employees" name="employees" required>
          <option value="">اختر...</option>
          <option value="500-1000">٥٠٠ - ١٠٠٠</option>
          <option value="1000-5000">١٠٠٠ - ٥٠٠٠</option>
          <option value="5000-10000">٥٠٠٠ - ١٠٬٠٠٠</option>
          <option value="10000+">١٠٬٠٠٠+</option>
        </select>
      </div>
    </div>
    
    <div class="form-group">
      <label for="phone">رقم الجوال *</label>
      <input 
        type="tel" 
        id="phone" 
        name="phone" 
        required
        placeholder="+966 5X XXX XXXX"
        autocomplete="tel"
        dir="ltr"
      >
    </div>
    
    <div class="form-group">
      <label for="interest">اهتمامك</label>
      <select id="interest" name="interest">
        <option value="">اختر...</option>
        <option value="employer">كصاحب عمل (Employer)</option>
        <option value="insurer">كشركة تأمين (Insurer)</option>
        <option value="investor">كمستثمر (Investor)</option>
        <option value="other">أخرى</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="message">الرسالة</label>
      <textarea 
        id="message" 
        name="message" 
        rows="4" 
        placeholder="أود الاستفسار عن..."
      ></textarea>
    </div>
    
    <!-- Hidden fields -->
    <input type="hidden" name="_subject" value="🎯 New SARA Lead!">
    <input type="hidden" name="_cc" value="your-email@sara-health.com">
    <input type="hidden" name="_template" value="table">
    <input type="text" name="_gotcha" style="display:none">
    
    <button type="submit" class="btn-primary" style="width:100%; margin-top:1rem">
      إرسال الرسالة ←
    </button>
    
    <p class="form-note">
      🔒 بياناتك محمية. لن نشارك معلوماتك مع أي طرف ثالث.
    </p>
  </form>
  
  <div id="form-status" class="form-status" style="display:none;"></div>
  
  <!-- Alternative Contact Methods -->
  <div class="contact-alternatives" style="margin-top:3rem; text-align:center;">
    <p style="color:var(--text-muted); margin-bottom:1.5rem;">أو تواصل عبر:</p>
    <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
      <a href="https://wa.me/966555056545" class="btn-wa">
        💬 واتساب
      </a>
      <a href="mailto:hello@sara-health.com" class="btn-outline">
        📧 البريد الإلكتروني
      </a>
      <a href="tel:+966555056545" class="btn-secondary">
        📞 اتصال هاتفي
      </a>
    </div>
  </div>
</section>
```

---

## 📧 Email Template Setup

### **For Formspree/GetForm:**

When someone submits the form, you'll receive an email like this:

```
Subject: 🎯 New SARA Lead!

Name: محمد أحمد
Email: mohammed@company.com
Company: شركة التقنية المتقدمة
Employees: 1000-5000
Phone: +966 55 123 4567
Interest: Employer (كصاحب عمل)
Message: أود الاستفسار عن باقة Pro لشركتي

Submitted: 2026-03-06 14:30
Source: https://sara-health.com
```

---

## 📊 Lead Management Workflow

### **Step 1: Receive Notification**

- Email notification instantly
- Slack notification (via Zapier)
- SMS notification (for urgent leads)

### **Step 2: Auto-Response**

Set up automatic email response:

```html
<!-- Add to Formspree settings -->
<input type="hidden" name="_autoresponse" value="
شكراً لتواصلك مع SARA!

استلمنا رسالتك وسنتواصل معك خلال ٢٤ ساعة.

فريق SARA
hello@sara-health.com
+966 55 505 6545
">
```

### **Step 3: CRM Integration**

**Option A: Google Sheets (Free)**
1. Use Zapier
2. Trigger: New Formspree submission
3. Action: Add row to Google Sheets

**Option B: HubSpot (Free CRM)**
1. Use Zapier
2. Trigger: New form submission
3. Action: Create HubSpot contact

**Option C: Airtable**
1. Use Zapier
2. Trigger: New form submission
3. Action: Create Airtable record

---

## 🧪 Testing Your Form

### **Test Checklist:**

1. **Submit test form** with real email
2. **Check spam folder** for submission
3. **Verify all fields** appear in email
4. **Test error handling** (submit empty form)
5. **Test success message** displays
6. **Test on mobile** device
7. **Test with slow** internet

### **Test Data:**

```
Name: اختبار أحمد
Email: test@example.com
Company: شركة اختبار
Employees: 1000-5000
Phone: +966 50 000 0000
Message: هذا اختبار للنموذج
```

---

## 🔒 Security Best Practices

### **Spam Protection:**

1. **Honeypot Field** (already included):
```html
<input type="text" name="_gotcha" style="display:none">
```

2. **reCAPTCHA** (Formspree Pro):
```html
<input type="hidden" name="_recaptcha" value="true">
```

3. **Rate Limiting** (server-side):
- Formspree: Built-in
- Netlify: Built-in
- Custom: Add Cloudflare

### **Data Protection:**

1. **HTTPS Only** (automatic on modern hosting)
2. **Don't store sensitive data** (credit cards, passwords)
3. **Add privacy policy** link
4. **GDPR compliance** (if EU users)

---

## 📈 Analytics & Tracking

### **Track Form Conversions:**

Add to your form handler:

```javascript
// Google Analytics
if (typeof gtag !== 'undefined') {
  gtag('event', 'submit', {
    event_category: 'contact_form',
    event_label: 'Contact Form Submission',
    value: 1
  });
}

// Facebook Pixel
if (typeof fbq !== 'undefined') {
  fbq('track', 'Contact');
}

// LinkedIn Insight
if (typeof _linkedin_partner_id !== 'undefined') {
  _linkedin_data_partner_ids = _linkedin_data_partner_ids || [];
  _linkedin_data_partner_ids.push('YOUR_PARTNER_ID');
}
```

---

## 🎯 Recommended Setup

### **For Most Users:**

**Formspree Free Tier**
- ✅ 50 submissions/month
- ✅ No coding required
- ✅ Works on any hosting
- ✅ Email notifications
- ✅ CSV export

**Setup Time:** 5 minutes

### **For Netlify Users:**

**Netlify Forms**
- ✅ 100 submissions/month
- ✅ Automatic detection
- ✅ Built-in spam filtering
- ✅ Form triggers
- ✅ No JavaScript needed

**Setup Time:** 2 minutes

### **For Advanced Users:**

**EmailJS + Custom Backend**
- ✅ Full control
- ✅ Custom email templates
- ✅ 200 emails/month free
- ✅ Multiple email services

**Setup Time:** 15 minutes

---

## 📞 Need Help?

### **Formspree Support:**
- Docs: https://help.formspree.io
- Email: support@formspree.io

### **Netlify Support:**
- Docs: https://docs.netlify.com/forms
- Forum: https://answers.netlify.com

### **EmailJS Support:**
- Docs: https://www.emailjs.com/docs
- Email: support@emailjs.com

---

## ✅ Quick Start (5 Minutes)

1. **Go to Formspree.io** → Sign up
2. **Create new form** → Copy form ID
3. **Replace `YOUR_FORM_ID`** in HTML
4. **Upload files** to hosting
5. **Test form** with test data
6. **Check email** for submission

**Done! 🎉**

---

**Built with ❤️ for SARA Health 🇸🇦**
