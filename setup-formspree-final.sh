#!/bin/bash

# SARA Platform - Formspree Final Setup Script
# This script sets up Formspree for all contact forms

echo "🚀 SARA Platform - Formspree Setup"
echo "==================================="
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
echo "1. Open https://formspree.io in your browser"
echo "2. Sign up with: hello@sara-health.com"
echo "3. Click 'New Form'"
echo "4. Name it: SARA Contact Form"
echo "5. Email for notifications: hello@sara-health.com"
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
cp contact.html contact.html.formspree-backup
echo "✅ Backup created: contact.html.formspree-backup"

# Check if file has Formspree
if grep -q "formspree.io/f/YOUR_FORM_ID" contact.html; then
    # Replace YOUR_FORM_ID with actual ID
    sed -i.bak "s|https://formspree.io/f/YOUR_FORM_ID|https://formspree.io/f/$FORM_ID|g" contact.html
    
    if [ $? -eq 0 ]; then
        echo "✅ contact.html updated successfully"
    else
        echo "❌ Failed to update contact.html"
        exit 1
    fi
else
    echo "⚠️  Could not find 'formspree.io/f/YOUR_FORM_ID' in contact.html"
    echo "   Checking if already configured..."
    
    if grep -q "formspree.io/f/" contact.html; then
        echo "✅ Formspree already configured!"
        CURRENT_ID=$(grep -o 'formspree.io/f/[a-zA-Z0-9]*' contact.html | head -1 | sed 's/formspree.io/f/\/f//')
        echo "   Current Form ID: $CURRENT_ID"
        read -p "Do you want to replace it with $FORM_ID? (y/n): " REPLACE_CONFIRM
        if [ "$REPLACE_CONFIRM" = "y" ] || [ "$REPLACE_CONFIRM" = "Y" ]; then
            sed -i.bak "s|formspree.io/f/[a-zA-Z0-9]*|formspree.io/f/$FORM_ID|g" contact.html
            echo "✅ Updated to new Form ID"
        else
            echo "⚠️  Keeping existing Form ID"
        fi
    else
        echo "❌ Formspree not found in contact.html"
        echo "   Please check the file manually"
        exit 1
    fi
fi

echo ""

# Step 3: Update email address
echo "📧 Step 3: Update Email Address"
echo "--------------------------------"
echo ""
read -p "Enter your email address (default: hello@sara-health.com): " EMAIL
EMAIL=${EMAIL:-hello@sara-health.com}

if [ -n "$EMAIL" ]; then
    cp contact.html contact.html.backup2
    sed -i.bak2 "s|hello@sara-health.com|$EMAIL|g" contact.html
    echo "✅ Email updated to: $EMAIL"
else
    echo "⚠️  Using default email: hello@sara-health.com"
fi

echo ""

# Step 4: Update WhatsApp number
echo "📱 Step 4: Update WhatsApp Number"
echo "----------------------------------"
echo ""
read -p "Enter your WhatsApp number (default: 966555056545): " WHATSAPP
WHATSAPP=${WHATSAPP:-966555056545}

if [ -n "$WHATSAPP" ]; then
    # Update in contact.html only
    cp contact.html contact.html.backup3
    sed -i.bak3 "s|966555056545|$WHATSAPP|g" contact.html
    echo "✅ WhatsApp number updated to: +$WHATSAPP"
else
    echo "⚠️  Using default WhatsApp number"
fi

echo ""

# Step 5: Test the form locally (optional)
echo "🧪 Step 5: Test Configuration"
echo "-----------------------------"
echo ""
read -p "Do you want to verify the Form ID was added correctly? (y/n): " VERIFY

if [ "$VERIFY" = "y" ] || [ "$VERIFY" = "Y" ]; then
    if grep -q "formspree.io/f/$FORM_ID" contact.html; then
        echo "✅ Form ID correctly added to contact.html"
    else
        echo "❌ Form ID not found in contact.html"
        echo "   Please check the file manually"
        exit 1
    fi
fi

echo ""

# Step 6: Commit and push
echo "🔄 Step 6: Commit and Push to GitHub"
echo "-------------------------------------"
echo ""
read -p "Do you want to commit and push changes? (y/n): " PUSH_CONFIRM

if [ "$PUSH_CONFIRM" = "y" ] || [ "$PUSH_CONFIRM" = "Y" ]; then
    git add contact.html
    git commit -m "Setup Formspree with ID: $FORM_ID

✅ Contact form configured
📧 Email notifications to: $EMAIL
📱 WhatsApp: +$WHATSAPP
🔗 Formspree: https://formspree.io/f/$FORM_ID"
    
    if [ $? -eq 0 ]; then
        echo "✅ Changes committed"
        echo ""
        echo "Pushing to GitHub..."
        git push origin main
        
        if [ $? -eq 0 ]; then
            echo "✅ Successfully pushed to GitHub!"
            echo ""
            echo "⏳ Waiting for Vercel to deploy..."
            echo "   Check: https://sra-health.vercel.app"
        else
            echo "❌ Failed to push. Please run: git push origin main"
        fi
    else
        echo "❌ Failed to commit. Please commit manually:"
        echo "   git add contact.html"
        echo "   git commit -m 'Setup Formspree'"
        echo "   git push origin main"
    fi
else
    echo "⚠️  Skipping push. Run these commands manually:"
    echo "   git add contact.html"
    echo "   git commit -m 'Setup Formspree'"
    echo "   git push origin main"
fi

echo ""
echo "=============================================="
echo "🎉 Setup Complete!"
echo "=============================================="
echo ""
echo "📍 Configuration Summary:"
echo "   Formspree Form ID: $FORM_ID"
echo "   Email: $EMAIL"
echo "   WhatsApp: +$WHATSAPP"
echo ""
echo "📍 Formspree URLs:"
echo "   Form URL: https://formspree.io/f/$FORM_ID"
echo "   Dashboard: https://formspree.io/dashboard"
echo "   Settings: https://formspree.io/forms/$FORM_ID/settings"
echo ""
echo "🧪 Test Your Form:"
echo "   1. Wait 2-3 minutes for Vercel to deploy"
echo "   2. Go to: https://sra-health.vercel.app/contact.html"
echo "   3. Fill out and submit the form"
echo "   4. Check your email ($EMAIL) for the submission"
echo ""
echo "🔧 Recommended Settings in Formspree:"
echo "   1. Go to: https://formspree.io/forms/$FORM_ID/settings"
echo "   2. Enable 'Autorespond' (optional)"
echo "   3. Add reCAPTCHA (recommended)"
echo "   4. Customize email template"
echo "   5. Set up redirect to thank you page"
echo ""
echo "📊 View Submissions:"
echo "   https://formspree.io/dashboard"
echo ""
echo "🎨 Customization:"
echo "   - Edit email template in Formspree dashboard"
echo "   - Add custom auto-response message"
echo "   - Set up spam filtering"
echo ""
echo "=============================================="
echo ""
echo "Need help? Check EMAIL-SETUP.md"
echo ""
