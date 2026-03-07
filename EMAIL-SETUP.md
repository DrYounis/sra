# 📧 SARA Email Setup Guide
## Free Email Service for hello@sara-health.com

---

## 🎯 Current Status

**Email:** `hello@sara-health.com`
**Status:** No SMTP configured
**Solution:** Use free form backend services

---

## ✅ Option 1: Formspree (RECOMMENDED - 5 Minutes)

### **Free Tier:**
- ✅ 50 submissions/month
- ✅ No coding required
- ✅ Instant email notifications
- ✅ Spam protection
- ✅ Auto-responder

### **Setup Steps:**

#### **Step 1: Create Account**
1. Go to: https://formspree.io
2. Click "Get Started" or "Sign Up"
3. Sign up with your email (hello@sara-health.com)
4. Verify your email

#### **Step 2: Create New Form**
1. Click "+ New Form"
2. Name: `SARA Contact Form`
3. Email to receive notifications: `hello@sara-health.com`
4. Click "Create Form"

#### **Step 3: Get Your Form ID**
You'll see a URL like:
```
https://formspree.io/f/xvndkqzw
```
Copy the ID part: `xvndkqzw`

#### **Step 4: Update All HTML Files**

Run this script to update all files at once:

```bash
cd /Volumes/Elements/AG/SARA

# Replace YOUR_FORM_ID with your actual Formspree ID
# Example: xvndkqzw

# In Terminal, run:
sed -i.bak 's|https://formspree.io/f/YOUR_FORM_ID|https://formspree.io/f/xvndkqzw|g' *.html contact.html

# Then commit and push:
git add .
git commit -m "Update Formspree ID to xvndkqzw"
git push origin main
```

**Replace `xvndkqzw` with YOUR actual Form ID!**

---

## ✅ Option 2: EmailJS (200 emails/month free)

### **Free Tier:**
- ✅ 200 emails/month
- ✅ Custom email templates
- ✅ Client-side only
- ✅ No server needed

### **Setup:**

#### **Step 1: Create Account**
1. Go to: https://www.emailjs.com
2. Sign up (free)
3. Verify email

#### **Step 2: Add Email Service**
1. Go to "Email Services"
2. Click "Add New Service"
3. Choose: Gmail (or your email provider)
4. Connect your account (hello@sara-health.com)
5. Get **Service ID** (e.g., `service_abc123`)

#### **Step 3: Create Email Template**
1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your email:
   ```
   Subject: New Lead from {{name}}
   
   Message:
   Name: {{name}}
   Email: {{email}}
   Company: {{company}}
   Employees: {{employees}}
   Phone: {{phone}}
   Interest: {{interest}}
   Message: {{message}}
   ```
4. Save and get **Template ID** (e.g., `template_xyz789`)

#### **Step 4: Get Public Key**
1. Go to "Account" (click your name)
2. Copy **Public Key** (e.g., `user_abc123`)

#### **Step 5: Add to HTML**

Add to `<head>` in all HTML files:
```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script type="text/javascript">
  (function() {
    emailjs.init("YOUR_PUBLIC_KEY");
  })();
</script>
```

#### **Step 6: Add Contact Form Handler**

Create file `js/email-handler.js`:
```javascript
function sendEmail(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'جاري الإرسال...';
  
  const templateParams = {
    name: form.name.value,
    email: form.email.value,
    company: form.company.value,
    employees: form.employees.value,
    phone: form.phone.value,
    interest: form.interest.value,
    message: form.message.value,
    date: new Date().toLocaleString('ar-SA')
  };
  
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(() => {
      alert('✅ تم الإرسال بنجاح!');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'إرسال';
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      alert('❌ حدث خطأ');
      submitBtn.disabled = false;
      submitBtn.textContent = 'إرسال';
    });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contact-form')?.addEventListener('submit', sendEmail);
});
```

---

## ✅ Option 3: GetForm (50 submissions/month)

### **Free Tier:**
- ✅ 50 submissions/month
- ✅ Unlimited forms
- ✅ Email notifications
- ✅ CSV export

### **Setup:**

1. Go to: https://www.getform.io
2. Sign up (free)
3. Create new form
4. Get your endpoint URL
5. Update form action in HTML

---

## ✅ Option 4: Google Forms (Unlimited free)

### **Completely Free:**
- ✅ Unlimited submissions
- ✅ Google Sheets integration
- ✅ Email notifications
- ✅ No coding

### **Setup:**

#### **Step 1: Create Google Form**
1. Go to: https://forms.google.com
2. Click "+ Blank"
3. Add fields:
   - Name (short answer)
   - Email (short answer)
   - Company (short answer)
   - Employees (dropdown)
   - Phone (short answer)
   - Interest (dropdown)
   - Message (paragraph)

#### **Step 2: Get Form URL**
1. Click "Send" (top right)
2. Click link icon 🔗
3. Copy URL

#### **Step 3: Redirect to Google Form**

Replace contact form button:
```html
<a href="YOUR_GOOGLE_FORM_URL" target="_blank" class="btn-primary">
  املأ نموذج التواصل ←
</a>
```

---

## 🎯 Recommended: Formspree Setup Script

I'll create an automated script for you:

```bash
#!/bin/bash
# setup-formspree-final.sh

echo "🚀 SARA Formspree Setup"
echo "======================="
echo ""

# Check if running from correct directory
if [ ! -f "contact.html" ]; then
    echo "❌ Please run this script from the SARA directory"
    echo "   cd /Volumes/Elements/AG/SARA"
    exit 1
fi

echo "📋 Step 1: Get Your Formspree ID"
echo "--------------------------------"
echo ""
echo "1. Go to: https://formspree.io"
echo "2. Sign up with: hello@sara-health.com"
echo "3. Create new form: 'SARA Contact'"
echo "4. Copy your Form ID (looks like: xvndkqzw)"
echo ""
read -p "Enter your Formspree ID: " FORM_ID

if [ -z "$FORM_ID" ]; then
    echo "❌ No Form ID entered. Exiting."
    exit 1
fi

echo ""
echo "✅ Form ID received: $FORM_ID"
echo ""

# Step 2: Update all HTML files
echo "📝 Step 2: Updating HTML files..."
echo ""

FILES_UPDATED=0
for file in *.html; do
    if [ -f "$file" ]; then
        if grep -q "formspree.io/f/YOUR_FORM_ID" "$file"; then
            sed -i.bak "s|https://formspree.io/f/YOUR_FORM_ID|https://formspree.io/f/$FORM_ID|g" "$file"
            echo "✅ Updated: $file"
            FILES_UPDATED=$((FILES_UPDATED + 1))
        fi
    fi
done

if [ $FILES_UPDATED -eq 0 ]; then
    echo "⚠️  No files with 'YOUR_FORM_ID' found."
    echo "   Manually check your HTML files."
    exit 1
fi

echo ""
echo "✅ Updated $FILES_UPDATED file(s)"
echo ""

# Step 3: Commit and push
echo "🔄 Step 3: Commit and Push to GitHub"
echo "-------------------------------------"
echo ""
read -p "Do you want to commit and push changes? (y/n): " PUSH_CONFIRM

if [ "$PUSH_CONFIRM" = "y" ] || [ "$PUSH_CONFIRM" = "Y" ]; then
    git add *.html
    git commit -m "Setup Formspree with ID: $FORM_ID"
    
    if [ $? -eq 0 ]; then
        echo "✅ Changes committed"
        echo ""
        echo "Pushing to GitHub..."
        git push origin main
        
        if [ $? -eq 0 ]; then
            echo "✅ Successfully pushed to GitHub!"
        else
            echo "❌ Failed to push. Please run: git push origin main"
        fi
    else
        echo "❌ Failed to commit. Please commit manually."
    fi
else
    echo "⚠️  Skipping push. Run these commands manually:"
    echo "   git add *.html"
    echo "   git commit -m 'Setup Formspree'"
    echo "   git push origin main"
fi

echo ""
echo "=============================================="
echo "🎉 Setup Complete!"
echo "=============================================="
echo ""
echo "📍 Your Formspree Form ID: $FORM_ID"
echo "📧 Form submissions will go to: hello@sara-health.com"
echo ""
echo "🧪 Test Your Form:"
echo "   1. Go to: https://sra-health.vercel.app/contact.html"
echo "   2. Fill out and submit the form"
echo "   3. Check your email (hello@sara-health.com)"
echo ""
echo "📊 View Submissions:"
echo "   https://formspree.io/dashboard"
echo ""
echo "🔧 Formspree Settings:"
echo "   - Set up auto-responder"
echo "   - Add reCAPTCHA (optional)"
echo "   - Customize email template"
echo ""
```

---

## 🚀 Quick Setup Command

Run this in Terminal:

```bash
cd /Volumes/Elements/AG/SARA

# Make script executable
chmod +x setup-formspree-final.sh

# Run setup
./setup-formspree-final.sh
```

Just follow the prompts!

---

## 📧 What Happens After Setup

### **When Someone Submits Form:**

**You Receive Email:**
```
Subject: New submission from SARA Contact

Name: محمد أحمد
Email: mohammed@company.com
Company: شركة التقنية
Employees: 1000-5000
Phone: +966 55 123 4567
Interest: Employer
Message: أود الاستفسار عن باقة Pro

Submitted: 2026-03-06 15:30
Source: https://sara-health.vercel.app/contact.html
```

**User Sees:**
```
✅ تم إرسال رسالتك بنجاح!
سنتواصل معك خلال ٢٤ ساعة.
```

---

## 📊 Compare Free Plans

| Service | Free Tier | Features | Best For |
|---------|-----------|----------|----------|
| **Formspree** | 50/month | Email notifications, CSV export | Simple setup |
| **EmailJS** | 200/month | Custom templates, multiple services | Customization |
| **GetForm** | 50/month | Unlimited forms, webhooks | Multiple forms |
| **Google Forms** | Unlimited | Sheets integration, completely free | Unlimited submissions |

---

## 🎯 My Recommendation

**Use Formspree** because:
- ✅ Easiest setup (5 minutes)
- ✅ No coding required
- ✅ Works immediately
- ✅ Professional email notifications
- ✅ Spam protection included
- ✅ 50 submissions/month is enough for start

---

## 📞 Need Help?

### **Formspree Support:**
- Docs: https://help.formspree.io
- Email: support@formspree.io

### **EmailJS Support:**
- Docs: https://www.emailjs.com/docs
- Email: support@emailjs.com

---

## ✅ Next Steps

1. **Choose a service** (I recommend Formspree)
2. **Sign up** with hello@sara-health.com
3. **Get your ID/key**
4. **Run the setup script**
5. **Test the form**
6. **Start receiving leads!**

---

**Ready to set up? Run the script!** 🚀

```bash
cd /Volumes/Elements/AG/SARA
./setup-formspree-final.sh
```
