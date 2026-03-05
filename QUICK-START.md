# 🚀 SARA Platform — Quick Start Guide
## Get Live in 15 Minutes

---

## ⚡ Ultra-Fast Setup (15 Minutes)

### **Step 1: Form Backend (3 minutes)**

1. Go to https://formspree.io
2. Sign up (free)
3. Create new form → Copy form ID
4. Open these files and replace `YOUR_FORM_ID`:
   - `contact.html` (line ~195)
   - `index-new.html` (search for `YOUR_FORM_ID`)

### **Step 2: Update Contact Info (2 minutes)**

Search and replace in ALL HTML files:

```
+966555056545     → Your actual WhatsApp number
hello@sara-health.com → Your actual email
```

**Files to update:**
- `index-new.html`
- `b2b-new.html`
- `insurance-new.html`
- `contact.html`
- `thanks.html`

### **Step 3: Deploy (5 minutes)**

**Option A: Netlify (Easiest)**

```bash
# 1. Rename new files
mv index-new.html index.html
mv b2b-new.html b2b.html
mv insurance-new.html insurance.html

# 2. Go to https://app.netlify.com/drop
# 3. Drag the entire SARA folder
# 4. Done! Site is live
```

**Option B: GitHub Pages**

```bash
# 1. Rename files
mv index-new.html index.html
mv b2b-new.html b2b.html
mv insurance-new.html insurance.html

# 2. Initialize git
git init
git add .
git commit -m "SARA launch"

# 3. Create repo on GitHub
# 4. Push
git remote add origin https://github.com/YOUR_USERNAME/sara.git
git branch -M main
git push -u origin main

# 5. Enable Pages in GitHub Settings
```

### **Step 4: Test (5 minutes)**

**Checklist:**
- [ ] Site loads
- [ ] All navigation links work
- [ ] Mobile menu toggles
- [ ] ROI calculator works (b2b.html)
- [ ] Contact form submits
- [ ] WhatsApp links open
- [ ] Test on mobile phone

**Test Form:**
```
Name: اختبار أحمد
Email: test@example.com
Company: شركة اختبار
Employees: 1000-5000
Phone: +966 50 000 0000
```

---

## 📁 File Structure

```
SARA/
├── index.html              ← Main homepage (use index-new.html)
├── b2b.html                ← For employers (use b2b-new.html)
├── insurance.html          ← For insurers (use insurance-new.html)
├── investor.html           ← Investor pitch (already complete)
├── contact.html            ← NEW: Contact page with form
├── thanks.html             ← NEW: Thank you page after form
│
├── css/
│   └── sara.css            ← Shared stylesheet
│
├── js/
│   └── sara.js             ← Main JavaScript
│
└── Documentation/
    ├── DEPLOYMENT.md       ← Full deployment guide
    ├── FORM-BACKEND-SETUP.md ← Form backend options
    ├── CHANGES.md          ← What was changed
    └── QUICK-START.md      ← This file
```

---

## 🎯 What Each Page Does

| Page | Purpose | Audience |
|------|---------|----------|
| `index.html` | Main landing page | Everyone |
| `b2b.html` | Employer-focused | HR Directors, CFOs |
| `insurance.html` | Insurer-focused | Insurance companies |
| `investor.html` | Investor pitch | VCs, Angels |
| `contact.html` | Contact form | All leads |
| `thanks.html` | Post-submission | Form submitters |

---

## 🔧 Configuration Checklist

### **Required:**
- [ ] Replace `YOUR_FORM_ID` in contact forms
- [ ] Update WhatsApp number everywhere
- [ ] Update email address everywhere
- [ ] Test on mobile device

### **Recommended:**
- [ ] Add Google Analytics ID
- [ ] Buy custom domain
- [ ] Set up professional email
- [ ] Create social media preview image

### **Optional:**
- [ ] Add company logo
- [ ] Add real team photos
- [ ] Add customer testimonials
- [ ] Add blog section

---

## 📊 Analytics Setup (Optional)

### **Google Analytics 4:**

1. Go to https://analytics.google.com
2. Create property → Get Measurement ID (G-XXXXXXXXXX)
3. Add to ALL HTML files (in `<head>`):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎨 Customization

### **Change Colors:**

Edit `css/sara.css`:

```css
:root {
  --teal: #00C2A8;      /* Change main accent color */
  --gold: #E8B84B;      /* Change secondary accent */
  --navy: #153158;      /* Change primary brand color */
}
```

### **Change Fonts:**

Edit all HTML files, update Google Fonts link:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont" rel="stylesheet">
```

### **Add Logo:**

Replace text logo in nav:

```html
<a href="index.html" class="nav-logo">
  <img src="logo.png" alt="SARA Health" height="40">
</a>
```

---

## 🐛 Troubleshooting

### **Site Not Loading:**
1. Check file names (index.html, not index-new.html)
2. Verify files uploaded correctly
3. Clear browser cache
4. Check hosting platform status

### **Form Not Working:**
1. Verify Formspree ID is correct
2. Check browser console for errors
3. Test with different email
4. Check spam folder

### **Mobile Menu Not Working:**
1. Ensure `js/sara.js` is loaded
2. Check browser console for errors
3. Test on actual device (not just DevTools)

### **ROI Calculator Not Working:**
1. Check `js/sara.js` is loaded
2. Verify slider ID matches
3. Check browser console for errors

---

## 📞 Support Resources

### **Documentation:**
- `DEPLOYMENT.md` — Full deployment instructions
- `FORM-BACKEND-SETUP.md` — Form backend options
- `CHANGES.md` — What was changed and why

### **External:**
- MDN Web Docs: https://developer.mozilla.org
- Netlify Docs: https://docs.netlify.com
- GitHub Pages: https://docs.github.com/pages

### **Tools:**
- Test Site: https://pagespeed.web.dev
- Test Forms: https://formspree.io
- Mobile Test: https://responsivedesignchecker.com

---

## ✅ Final Checklist

Before going live:

**Content:**
- [ ] All contact info updated
- [ ] No placeholder text remaining
- [ ] All links work
- [ ] No console errors

**Design:**
- [ ] Looks good on desktop
- [ ] Looks good on tablet
- [ ] Looks good on mobile
- [ ] All images optimized

**Functionality:**
- [ ] Forms submit successfully
- [ ] WhatsApp links work
- [ ] Email links work
- [ ] ROI calculator works
- [ ] Mobile menu works

**SEO:**
- [ ] Meta descriptions set
- [ ] Title tags unique
- [ ] Open Graph tags set
- [ ] Favicon added

**Analytics:**
- [ ] Google Analytics added
- [ ] Conversion tracking set up
- [ ] Goal funnels configured

---

## 🎉 You're Live!

### **Next Steps:**

1. **Share on social media**
   - LinkedIn post
   - Twitter thread
   - WhatsApp broadcast

2. **Submit to Google**
   - Google Search Console
   - Google Business Profile
   - Bing Webmaster Tools

3. **Start collecting leads**
   - Monitor form submissions
   - Respond within 24 hours
   - Track in spreadsheet/CRM

4. **Monitor analytics**
   - Check daily for first week
   - Identify top pages
   - Track conversion rates

---

## 📈 Success Metrics

**Week 1 Goals:**
- 100+ visitors
- 5+ form submissions
- <3s page load time
- 0 critical bugs

**Month 1 Goals:**
- 1,000+ visitors
- 20+ qualified leads
- 3+ demo bookings
- 1+ closed deal

---

**Questions?** Check `DEPLOYMENT.md` or `FORM-BACKEND-SETUP.md`

**Built with ❤️ for SARA Health 🇸🇦**
