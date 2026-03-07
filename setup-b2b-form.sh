#!/bin/bash

# SARA B2B Form Setup - Send to op.younis@gmail.com

echo "🚀 SARA B2B Lead Form Setup"
echo "============================"
echo ""
echo "📧 Email will be sent to: op.younis@gmail.com"
echo ""

# Step 1: Get Formspree ID
echo "📋 Step 1: Create Formspree Form"
echo "---------------------------------"
echo ""
echo "1. Go to: https://formspree.io"
echo "2. Sign up with: op.younis@gmail.com"
echo "3. Click 'New Form'"
echo "4. Name it: 'SARA B2B Leads'"
echo "5. Email for notifications: op.younis@gmail.com"
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

# Step 2: Update B2B form
echo "📝 Step 2: Updating B2B Lead Form..."
echo ""

# Create backup
cp b2b-lead-form.html b2b-lead-form.html.backup
echo "✅ Backup created"

# Replace Formspree ID
if grep -q "formspree.io/f/YOUR_FORMSPREE_ID" b2b-lead-form.html; then
    sed -i.bak "s|https://formspree.io/f/YOUR_FORMSPREE_ID|https://formspree.io/f/$FORM_ID|g" b2b-lead-form.html
    
    if [ $? -eq 0 ]; then
        echo "✅ B2B form updated successfully"
    else
        echo "❌ Failed to update form"
        exit 1
    fi
else
    echo "⚠️  Could not find Formspree URL in form"
    exit 1
fi

echo ""

# Step 3: Update homepage link
echo "🔗 Step 3: Adding B2B Form Link to Homepage"
echo "-------------------------------------------"
echo ""

# Add B2B form link to b2b.html navigation or hero
if [ -f "b2b.html" ]; then
    # Check if link already exists
    if ! grep -q "b2b-lead-form.html" b2b.html; then
        # Add to hero CTA or create new button
        sed -i.bak2 's|احجز عرضاً مجانياً ←|احجز عرضاً مجانياً ←|g' b2b.html
        echo "✅ B2B form link will be added manually"
    else
        echo "✅ B2B form already linked"
    fi
fi

echo ""

# Step 4: Commit and push
echo "🔄 Step 4: Commit and Push to GitHub"
echo "-------------------------------------"
echo ""
read -p "Do you want to commit and push changes? (y/n): " PUSH_CONFIRM

if [ "$PUSH_CONFIRM" = "y" ] || [ "$PUSH_CONFIRM" = "Y" ]; then
    git add b2b-lead-form.html
    git commit -m "Setup B2B lead form with Formspree

✅ B2B Lead Form Created
📧 Notifications to: op.younis@gmail.com
🔗 Formspree ID: $FORM_ID
📊 Tracks: Company size, industry, contact info, timeline

Form collects:
- Company name, size, industry, city
- Contact person name, position, email, phone
- Service interest and timeline
- Additional message

Optimized for scaling B2B sales!"
    
    if [ $? -eq 0 ]; then
        echo "✅ Changes committed"
        echo ""
        echo "Pushing to GitHub..."
        git push origin main
        
        if [ $? -eq 0 ]; then
            echo "✅ Successfully pushed to GitHub!"
        else
            echo "❌ Failed to push. Run: git push origin main"
        fi
    else
        echo "❌ Failed to commit. Commit manually."
    fi
else
    echo "⚠️  Skip push. Run manually:"
    echo "   git add b2b-lead-form.html"
    echo "   git commit -m 'Setup B2B form'"
    echo "   git push origin main"
fi

echo ""
echo "=============================================="
echo "🎉 B2B Lead Form Setup Complete!"
echo "=============================================="
echo ""
echo "📍 Configuration:"
echo "   Formspree ID: $FORM_ID"
echo "   Email: op.younis@gmail.com"
echo "   Form URL: https://formspree.io/f/$FORM_ID"
echo ""
echo "📍 Live URLs:"
echo "   B2B Form: https://sra-health.vercel.app/b2b-lead-form.html"
echo "   Dashboard: https://formspree.io/dashboard"
echo ""
echo "🧪 Test Your Form:"
echo "   1. Wait 2-3 minutes for Vercel deploy"
echo "   2. Go to: https://sra-health.vercel.app/b2b-lead-form.html"
echo "   3. Fill out and submit"
echo "   4. Check op.younis@gmail.com for lead"
echo ""
echo "📊 Lead Data Collected:"
echo "   ✓ Company name, size, industry, city"
echo "   ✓ Contact person name, position"
echo "   ✓ Email and phone"
echo "   ✓ Service interest"
echo "   ✓ Timeline to start"
echo "   ✓ Additional message"
echo ""
echo "💡 Pro Tips:"
echo "   - Check spam folder for first email"
echo "   - Set up auto-responder in Formspree"
echo "   - Export leads to CSV from dashboard"
echo "   - Follow up within 24 hours"
echo ""
echo "🔗 Add Form Link to Website:"
echo "   Update b2b.html CTA button to:"
echo '   <a href="b2b-lead-form.html" class="btn-primary">اطلب عرض سعر</a>'
echo ""
