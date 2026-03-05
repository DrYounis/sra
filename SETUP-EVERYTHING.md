# 🚀 Complete Setup Guide - GitHub Pages + Contact Form
## Follow These Steps Exactly (10 Minutes Total)

---

## ⚡ QUICK START - Follow These 5 Steps

### **Step 1: Enable GitHub Pages (2 minutes)** 👈 START HERE

1. **Open this link in your browser:**
   ```
   https://github.com/DrYounis/sra/settings/pages
   ```

2. **Under "Build and deployment":**
   - Source: Select **`Deploy from a branch`**
   
3. **Configure:**
   - Branch: Select **`main`**
   - Folder: Select **`/ (root)`**
   
4. **Click "Save"**

5. **Wait 1-2 minutes** - GitHub will build your site

6. **Your site will be live at:**
   ```
   https://dryounis.github.io/sra/
   ```

✅ **Done with Step 1!** Test it by visiting the URL above.

---

### **Step 2: Set Up Formspree (3 minutes)**

1. **Go to Formspree:**
   ```
   https://formspree.io
   ```

2. **Sign up** (free account - takes 1 minute)

3. **Create your first form:**
   - Click **"New Form"**
   - Name: `SARA Contact Form`
   - Email to receive notifications: **Your email**
   - Click **"Create Form"**

4. **Copy your Form ID:**
   - You'll see: `https://formspree.io/f/xvndkqzw`
   - Copy the ID part (e.g., `xvndkqzw`)
   - **Save this ID - you'll need it in Step 3**

✅ **Done with Step 2!** Keep your Form ID handy.

---

### **Step 3: Update Contact Form (2 minutes)**

**Option A: Use the Automated Script (Recommended)**

Open Terminal and run:
```bash
cd /Volumes/Elements/AG/SARA
./setup-formspree.sh
```

The script will:
- Ask for your Formspree ID
- Ask for your email
- Ask for your WhatsApp number
- Update all files automatically
- Commit and push to GitHub

**Just follow the prompts!**

---

**Option B: Manual Update**

If you prefer manual:

1. **Open `contact.html`** in your text editor

2. **Find line ~195** (search for `YOUR_FORM_ID`)

3. **Replace:**
   ```html
   <!-- OLD -->
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   
   <!-- NEW (use your actual Form ID) -->
   <form action="https://formspree.io/f/xvndkqzw" method="POST">
   ```

4. **Update email** (search for `hello@sara-health.com`):
   ```html
   <!-- OLD -->
   <input type="hidden" name="_cc" value="hello@sara-health.com">
   
   <!-- NEW -->
   <input type="hidden" name="_cc" value="your-email@example.com">
   ```

5. **Update WhatsApp** (search for `+966555056545` in all HTML files):
   ```html
   <!-- OLD -->
   <a href="https://wa.me/966555056545">
   
   <!-- NEW -->
   <a href="https://wa.me/966555056545">  (replace with your number)
   ```

6. **Save all files**

7. **Commit and push:**
   ```bash
   cd /Volumes/Elements/AG/SARA
   git add contact.html
   git commit -m "Update Formspree ID and contact info"
   git push origin main
   ```

✅ **Done with Step 3!**

---

### **Step 4: Test Your Contact Form (2 minutes)**

1. **Go to your contact page:**
   ```
   https://dryounis.github.io/sra/contact.html
   ```

2. **Fill out the form with test data:**
   ```
   Name: اختبار أحمد
   Email: your-email@example.com
   Company: شركة اختبار
   Employees: 1000-5000
   Phone: +966 50 000 0000
   Interest: Employer
   Message: هذا اختبار للنموذج
   ```

3. **Click "إرسال الرسالة"**

4. **Check your email** - you should receive the submission!

5. **Check Formspree dashboard:**
   ```
   https://formspree.io/dashboard
   ```

✅ **Done with Step 4!** Your form is working!

---

### **Step 5: Rename Files for Production (1 minute)**

The new files have `-new` suffix. Let's rename them:

```bash
cd /Volumes/Elements/AG/SARA

# Backup old files
mv index.html index-old.html 2>/dev/null || true
mv b2b.html b2b-old.html 2>/dev/null || true
mv insurance.html insurance-old.html 2>/dev/null || true

# Rename new files to production
mv index-new.html index.html
mv b2b-new.html b2b.html
mv insurance-new.html insurance.html

# Commit and push
git add .
git commit -m "Deploy production-ready pages"
git push origin main
```

✅ **Done with Step 5!**

---

## 🎉 Congratulations! Your Site is Live!

### **Your Live URLs:**

| Page | URL |
|------|-----|
| **Homepage** | https://dryounis.github.io/sra/ |
| **For Employers (B2B)** | https://dryounis.github.io/sra/b2b.html |
| **For Insurers** | https://dryounis.github.io/sra/insurance.html |
| **Contact Form** | https://dryounis.github.io/sra/contact.html |
| **Investor Pitch** | https://dryounis.github.io/sra/investor.html |

---

## ✅ Final Checklist

Go through this checklist to ensure everything is working:

### **GitHub Pages:**
- [ ] GitHub Pages is enabled
- [ ] Site loads at https://dryounis.github.io/sra/
- [ ] All pages are accessible

### **Contact Form:**
- [ ] Formspree account created
- [ ] Form ID updated in contact.html
- [ ] Test submission successful
- [ ] Received email notification

### **Contact Info:**
- [ ] WhatsApp number updated in all files
- [ ] Email address updated
- [ ] Phone numbers correct

### **Functionality:**
- [ ] ROI calculator works (b2b.html)
- [ ] Mobile menu toggles
- [ ] All links work
- [ ] Site looks good on mobile

---

## 📊 Manage Your Leads

### **Formspree Dashboard:**
- View submissions: https://formspree.io/dashboard
- Export to CSV
- Set up auto-responder
- Add spam protection

### **Set Up Auto-Response (Optional):**

In Formspree dashboard:
1. Go to your form settings
2. Click "Autorespond"
3. Enable auto-responder
4. Write your message:
   ```
   Subject: شكراً لتواصلك مع SARA!
   
   Message:
   مرحباً،
   
   استلمنا رسالتك وسنتواصل معك خلال ٢٤ ساعة.
   
   فريق SARA
   hello@sara-health.com
   +966 55 XXX XXXX
   ```

---

## 🎨 Optional: Custom Domain

If you want `sara-health.com` instead of `dryounis.github.io/sara`:

### **Step 1: Buy Domain**
- Namecheap: https://namecheap.com
- Google Domains: https://domains.google

### **Step 2: Add to GitHub**
1. Go to: https://github.com/DrYounis/sra/settings/pages
2. Under "Custom domain", enter: `sara-health.com`
3. Click **Save**

### **Step 3: Update DNS**
At your domain registrar, add:

```
Type    Name    Value                       TTL
A       @       185.199.108.153             Auto
A       @       185.199.109.153             Auto
A       @       185.199.110.153             Auto
A       @       185.199.111.153             Auto
CNAME   www     dryounis.github.io          Auto
```

### **Step 4: Enable HTTPS**
- Wait for DNS to propagate (5-10 minutes)
- Check "Enforce HTTPS" in GitHub Pages settings

---

## 📈 Add Google Analytics (Optional)

### **Step 1: Create Account**
1. Go to: https://analytics.google.com
2. Sign in with Google account
3. Create new property: "SARA Health"
4. Get Measurement ID (format: `G-XXXXXXXXXX`)

### **Step 2: Add to All HTML Files**

Add this to `<head>` section of ALL HTML files:

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

Replace `G-XXXXXXXXXX` with your actual ID.

### **Step 3: Commit and Push**
```bash
git add *.html
git commit -m "Add Google Analytics"
git push origin main
```

---

## 🆘 Troubleshooting

### **Site Not Loading:**
1. Wait 2-3 minutes after enabling Pages
2. Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Check build status: https://github.com/DrYounis/sra/actions
4. Clear browser cache

### **Form Not Submitting:**
1. Verify Formspree ID is correct
2. Check browser console for errors (F12)
3. Check Formspree dashboard for submissions
4. Test with different email

### **404 Error:**
1. Ensure GitHub Pages is enabled
2. Wait 2-3 minutes after enabling
3. Check files are named correctly (index.html, not index-new.html)

### **Not Receiving Emails:**
1. Check spam folder
2. Verify email address in Formspree settings
3. Check Formspree dashboard
4. Re-submit test form

---

## 📞 Support Resources

### **GitHub Pages:**
- Documentation: https://docs.github.com/pages
- Status: https://www.githubstatus.com
- Community: https://github.community

### **Formspree:**
- Documentation: https://help.formspree.io
- Support: support@formspree.io
- Dashboard: https://formspree.io/dashboard

### **General:**
- MDN Web Docs: https://developer.mozilla.org
- Google Analytics: https://analytics.google.com/analytics/academy

---

## 🎯 Next Steps After Setup

### **Week 1:**
- [ ] Share site on LinkedIn
- [ ] Send to 10 potential clients
- [ ] Monitor analytics daily
- [ ] Respond to leads within 24 hours

### **Month 1:**
- [ ] Add customer testimonials
- [ ] Create case study
- [ ] Set up email newsletter
- [ ] Run LinkedIn ads

### **Ongoing:**
- [ ] Update content monthly
- [ ] Monitor performance
- [ ] A/B test CTAs
- [ ] Add new features

---

## 📊 Success Metrics

Track these KPIs:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Page Views | 100+/week | Google Analytics |
| Form Submissions | 5+/week | Formspree dashboard |
| Response Time | <24 hours | Email timestamps |
| Conversion Rate | >5% | Submissions / Visitors |
| Mobile Traffic | >50% | Google Analytics |

---

## 🎉 You're All Set!

Your SARA platform is now:
- ✅ Live on GitHub Pages
- ✅ Contact form working
- ✅ Ready to accept leads
- ✅ Mobile responsive
- ✅ SEO optimized

**Start sharing and collecting leads!** 🚀

---

**Questions?** Check these files:
- `ENABLE-GITHUB-PAGES.md` - GitHub Pages details
- `FORM-BACKEND-SETUP.md` - Form backend options
- `QUICK-START.md` - 15-minute launch guide
- `DEPLOYMENT.md` - Complete deployment guide

**Built with ❤️ for SARA Health 🇸🇦**
