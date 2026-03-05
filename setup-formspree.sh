#!/bin/bash

# SARA Platform - Formspree Setup Assistant
# This script helps you set up Formspree for your contact form

echo "🚀 SARA Platform - Formspree Setup Assistant"
echo "=============================================="
echo ""

# Check if running from correct directory
if [ ! -f "contact.html" ]; then
    echo "❌ Please run this script from the SARA directory"
    echo "   cd /Volumes/Elements/AG/SARA"
    exit 1
fi

echo "✅ Found contact.html"
echo ""

# Step 1: Get Formspree ID
echo "📋 Step 1: Get Your Formspree ID"
echo "--------------------------------"
echo ""
echo "1. Open https://formspree.io in your browser"
echo "2. Sign up or log in"
echo "3. Click 'New Form'"
echo "4. Name it: SARA Contact"
echo "5. Enter your email for notifications"
echo "6. Click 'Create Form'"
echo "7. Copy your Form ID (looks like: xvndkqzw)"
echo ""
read -p "Enter your Formspree ID: " FORM_ID

if [ -z "$FORM_ID" ]; then
    echo "❌ No Form ID entered. Exiting."
    exit 1
fi

echo ""
echo "✅ Form ID received: $FORM_ID"
echo ""

# Step 2: Update contact.html
echo "📝 Step 2: Updating contact.html..."
echo ""

# Create backup
cp contact.html contact.html.backup
echo "✅ Backup created: contact.html.backup"

# Replace YOUR_FORM_ID with actual ID
sed -i.bak "s|https://formspree.io/f/YOUR_FORM_ID|https://formspree.io/f/$FORM_ID|g" contact.html

if [ $? -eq 0 ]; then
    echo "✅ contact.html updated successfully"
else
    echo "❌ Failed to update contact.html"
    exit 1
fi

echo ""

# Step 3: Update email address
echo "📧 Step 3: Update Email Address"
echo "--------------------------------"
echo ""
read -p "Enter your email address: " EMAIL

if [ -n "$EMAIL" ]; then
    cp contact.html contact.html.backup2
    sed -i.bak2 "s|hello@sara-health.com|$EMAIL|g" contact.html
    echo "✅ Email updated to: $EMAIL"
else
    echo "⚠️  Skipping email update (using default)"
fi

echo ""

# Step 4: Update WhatsApp number
echo "📱 Step 4: Update WhatsApp Number"
echo "----------------------------------"
echo ""
read -p "Enter your WhatsApp number (e.g., 966555056545): " WHATSAPP

if [ -n "$WHATSAPP" ]; then
    # Update in all HTML files
    for file in *.html; do
        if [ -f "$file" ]; then
            cp "$file" "$file.backup3"
            sed -i.bak3 "s|+966555056545|+$WHATSAPP|g" "$file"
            sed -i.bak3 "s|966555056545|$WHATSAPP|g" "$file"
        fi
    done
    echo "✅ WhatsApp number updated to: +$WHATSAPP"
else
    echo "⚠️  Skipping WhatsApp update (using default)"
fi

echo ""

# Step 5: Commit and push
echo "🔄 Step 5: Commit and Push to GitHub"
echo "-------------------------------------"
echo ""
read -p "Do you want to commit and push changes? (y/n): " PUSH_CONFIRM

if [ "$PUSH_CONFIRM" = "y" ] || [ "$PUSH_CONFIRM" = "Y" ]; then
    git add contact.html *.html
    git commit -m "Update contact form with Formspree ID: $FORM_ID"
    
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
    echo "   git add contact.html"
    echo "   git commit -m 'Update Formspree ID'"
    echo "   git push origin main"
fi

echo ""
echo "=============================================="
echo "🎉 Setup Complete!"
echo "=============================================="
echo ""
echo "📍 Your Formspree Form ID: $FORM_ID"
echo "📧 Form submissions will go to: $EMAIL"
echo "📱 WhatsApp: +$WHATSAPP"
echo ""
echo "🧪 Test Your Form:"
echo "   1. Go to: https://dryounis.github.io/sra/contact.html"
echo "   2. Fill out and submit the form"
echo "   3. Check your email for the submission"
echo ""
echo "📊 View Submissions:"
echo "   https://formspree.io/dashboard"
echo ""
echo "🔧 Formspree Settings:"
echo "   - Set up auto-responder"
echo "   - Add reCAPTCHA (optional)"
echo "   - Customize email template"
echo ""
echo "Need help? Check FORM-BACKEND-SETUP.md"
echo ""
