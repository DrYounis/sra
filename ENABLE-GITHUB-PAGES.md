# 🚀 Enable GitHub Pages - Quick Guide

## Option A: Manual Setup (2 minutes)

### Step 1: Go to Repository Settings
1. Open: **https://github.com/DrYounis/sra/settings/pages**
2. Or navigate: Repository → Settings → Pages (left sidebar)

### Step 2: Configure Pages
1. Under **"Build and deployment"**
2. **Source**: Select `Deploy from a branch`
3. **Branch**: 
   - Dropdown: Select `main`
   - Folder: Select `/ (root)`
4. Click **Save**

### Step 3: Wait for Deployment
- GitHub will build your site (1-2 minutes)
- You'll see a success message
- Your site URL will appear at the top

### Step 4: Access Your Site
Your site will be live at:
```
https://dryounis.github.io/sra/
```

---

## Option B: Using GitHub CLI (Automated)

If you have GitHub CLI installed:

```bash
# Check if gh is installed
gh --version

# If not installed, install it:
# macOS: brew install gh
# Then authenticate: gh auth login

# Enable Pages via API
gh api repos/DrYounis/sra/pages \
  --method POST \
  -f source='{"branch":"main"}'
```

---

## ⚡ After Enabling Pages

### Your Site Structure:

| Page | URL |
|------|-----|
| Homepage | https://dryounis.github.io/sra/index.html |
| B2B | https://dryounis.github.io/sra/b2b-new.html |
| Insurance | https://dryounis.github.io/sra/insurance-new.html |
| Contact | https://dryounis.github.io/sra/contact.html |
| Investor | https://dryounis.github.io/sra/investor.html |
| Thank You | https://dryounis.github.io/sra/thanks.html |

---

## 🔧 Important: Update Files Before Going Live

### 1. Set Up Formspree (Required for Contact Form)

**Step 1:** Go to https://formspree.io

**Step 2:** Sign up (free account)

**Step 3:** Create new form
- Click "New Form"
- Name it: "SARA Contact"
- Enter your email for notifications
- Click "Create Form"

**Step 4:** Copy your Form ID
- It will look like: `https://formspree.io/f/xvndkqzw`
- Copy the ID part (e.g., `xvndkqzw`)

**Step 5:** Update `contact.html`

Open `contact.html` and find line ~195:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Replace `YOUR_FORM_ID` with your actual ID:
```html
<form action="https://formspree.io/f/xvndkqzw" method="POST">
```

**Step 6:** Commit and push:
```bash
cd /Volumes/Elements/AG/SARA
git add contact.html
git commit -m "Update Formspree ID"
git push origin main
```

---

### 2. Update Contact Information

**Search and replace in ALL HTML files:**

**WhatsApp Number:**
```
Old: +966555056545
New: Your actual WhatsApp number
```

**Email Address:**
```
Old: hello@sara-health.com
New: Your actual email
```

**Files to update:**
- `index-new.html`
- `b2b-new.html`
- `insurance-new.html`
- `contact.html`
- `thanks.html`

**Quick find/replace command:**
```bash
# Replace WhatsApp number
grep -rl '+966555056545' /Volumes/Elements/AG/SARA/*.html | xargs sed -i '' 's/+966555056545/YOUR_NUMBER/g'

# Replace email
grep -rl 'hello@sara-health.com' /Volumes/Elements/AG/SARA/*.html | xargs sed -i '' 's/hello@sara-health.com/your@email.com/g'
```

---

### 3. Rename Files for Production

The new files have `-new` suffix. Rename them:

```bash
cd /Volumes/Elements/AG/SARA

# Backup old files
mv index.html index-old.html
mv b2b.html b2b-old.html
mv insurance.html insurance-old.html

# Rename new files
mv index-new.html index.html
mv b2b-new.html b2b.html
mv insurance-new.html insurance.html

# Commit changes
git add .
git commit -m "Deploy production-ready pages"
git push origin main
```

---

## ✅ Final Checklist

Before announcing your site:

- [ ] GitHub Pages is enabled and site is live
- [ ] Formspree form ID is updated
- [ ] Contact form tested (submit test message)
- [ ] WhatsApp number updated
- [ ] Email address updated
- [ ] All links work
- [ ] Site looks good on mobile
- [ ] ROI calculator works on B2B page

---

## 🧪 Test Your Form

**Submit a test message:**

1. Go to: https://dryounis.github.io/sra/contact.html
2. Fill out form:
   ```
   Name: اختبار أحمد (Test)
   Email: your-email@example.com
   Company: شركة اختبار
   Employees: 1000-5000
   Phone: +966 50 000 0000
   Interest: Employer
   Message: هذا اختبار للنموذج
   ```
3. Click "إرسال الرسالة"
4. Check your email for submission
5. Verify you see success message

---

## 🎨 Custom Domain (Optional)

### If you want a custom domain (e.g., sara-health.com):

**Step 1:** Buy domain from:
- Namecheap: https://namecheap.com
- Google Domains: https://domains.google
- GoDaddy: https://godaddy.com

**Step 2:** In GitHub Pages settings:
- Go to: https://github.com/DrYounis/sra/settings/pages
- Under "Custom domain", enter: `sara-health.com`
- Click **Save**

**Step 3:** Update DNS records at your domain registrar:

```
Type    Name    Value                       TTL
A       @       185.199.108.153             Auto
A       @       185.199.109.153             Auto
A       @       185.199.110.153             Auto
A       @       185.199.111.153             Auto
CNAME   www     dryounis.github.io          Auto
```

**Step 4:** Enable HTTPS (after DNS propagates):
- Check "Enforce HTTPS" in GitHub Pages settings

---

## 📊 Monitor Your Site

### GitHub Pages Status:
- Go to: https://github.com/DrYounis/sra/deployments
- See build status and history

### Formspree Submissions:
- Go to: https://formspree.io/dashboard
- View all form submissions
- Export to CSV

### Analytics (Optional):
1. Sign up for Google Analytics: https://analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to all HTML files in `<head>` section

---

## 🆘 Troubleshooting

### Site Not Loading:
1. Wait 2-3 minutes after pushing
2. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
3. Check: https://github.com/DrYounis/sra/actions
4. Clear browser cache

### Form Not Working:
1. Verify Formspree ID is correct
2. Check Formspree dashboard for submissions
3. Check browser console for errors (F12)
4. Test with different email

### 404 Error:
1. Ensure files are named correctly (index.html, not index-new.html)
2. Check GitHub Pages is enabled
3. Wait 2-3 minutes after enabling Pages

---

## 📞 Need Help?

### GitHub Pages Support:
- Docs: https://docs.github.com/pages
- Status: https://www.githubstatus.com

### Formspree Support:
- Docs: https://help.formspree.io
- Email: support@formspree.io

---

**Your SARA platform is almost live! 🚀**

Follow the steps above and you'll be ready to accept leads in minutes!
