# EmailJS Setup Guide - Step by Step

## 🚀 Complete Setup Instructions

### Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right)
3. Create account with your email
4. Verify your email address

---

### Step 2: Connect Your Email Service

1. In EmailJS dashboard, go to **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - Outlook
   - Yahoo
   - Or other SMTP service
4. Click **"Connect Account"**
5. Follow the authentication steps
6. **Copy the Service ID** (e.g., `service_abc123`) - you'll need this later

---

### Step 3: Create Email Template

1. Go to **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. **Delete all default content** in the template editor
4. **Copy the entire content** from `emailjs-template.html`
5. **Paste it** into the template editor
6. Configure the template settings:
   - **Template Name**: `JNG Employee Onboarding`
   - **To Email**: `pareekshith@jnginnovators.com`
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{from_email}}`
   - **Subject**: `New Employee Application from {{from_name}}`
   - **Reply To**: `{{from_email}}`
7. Click **"Save"**
8. **Copy the Template ID** (e.g., `template_xyz789`)

---

### Step 4: Get Your Public Key

1. Go to **"Account"** in the left sidebar
2. Click on **"General"** tab
3. Find **"Public Key"** section
4. **Copy your Public Key** (e.g., `user_abc123xyz`)

---

### Step 5: Update Your Form Code

Open `script.js` and find these lines (around line 337-339):

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE';
```

**Replace with your actual values:**

```javascript
const EMAILJS_PUBLIC_KEY = 'user_abc123xyz'; // Your Public Key from Step 4
const EMAILJS_SERVICE_ID = 'service_abc123';  // Your Service ID from Step 2
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Your Template ID from Step 3
```

---

### Step 6: Test Your Form

1. Open `index.html` in your browser
2. Fill out the form completely
3. Submit the form
4. Check **pareekshith@jnginnovators.com** for the email
5. The email should arrive within 1-2 minutes

---

## 📧 Email Template Variables Explained

The template uses these variables from your form:

| Variable | Source | Description |
|----------|--------|-------------|
| `{{from_name}}` | Full Name field | Candidate's name |
| `{{from_email}}` | Email field | Candidate's email address |
| `{{message}}` | All form data | Complete formatted application |
| `{{to_email}}` | Hard-coded | pareekshith@jnginnovators.com |

---

## 🎨 Customizing the Email Template

### Change Colors

In `emailjs-template.html`, modify these styles:

```css
/* Header gradient */
background: linear-gradient(135deg, #5B8FD8 0%, #4A7AC4 100%);

/* Accent color */
color: #5B8FD8;

/* Background boxes */
background-color: #E8DED3;
```

### Change Logo

Add your company logo to the email header:

```html
<div class="email-header">
    <img src="YOUR_LOGO_URL" alt="JNG Logo" style="max-width: 200px; margin-bottom: 20px;">
    <h1>🎯 New Employee Application</h1>
</div>
```

---

## 🔧 Troubleshooting

### "Error sending email"
- **Check** that all three IDs are correctly copied
- **Verify** your email service is connected in EmailJS dashboard
- **Check** browser console (F12) for error messages

### Email not received
- **Check spam folder**
- **Verify** the to_email in template settings
- **Test** sending from EmailJS dashboard directly

### "emailjs is not defined"
- **Check** that the EmailJS script is loaded in `index.html`
- **Look for** this line before `</body>`:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
  ```

### Rate Limiting
- EmailJS free tier: **200 emails/month**
- If you exceed this, upgrade to paid plan or use Web3Forms

---

## 🆓 Alternative: Web3Forms (No Signup Testing)

If you want to test quickly without EmailJS setup:

1. Go to **https://web3forms.com/**
2. Enter your email to get a free access key
3. In `script.js`, find this line (around line 379):
   ```javascript
   access_key: 'YOUR_WEB3FORMS_KEY_HERE',
   ```
4. Replace with your Web3Forms key:
   ```javascript
   access_key: 'abc-123-def-456',
   ```

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] EmailJS Public Key is correctly set in script.js
- [ ] Service ID is correctly set in script.js
- [ ] Template ID is correctly set in script.js
- [ ] Template's "To Email" is set to pareekshith@jnginnovators.com
- [ ] Email service is connected and authenticated
- [ ] Test submission received successfully
- [ ] Email formatting looks professional
- [ ] Reply-to address works correctly

---

## 📞 Support

If you encounter issues:

1. **EmailJS Documentation**: https://www.emailjs.com/docs/
2. **EmailJS Support**: support@emailjs.com
3. **Form Developer**: Check console logs for detailed error messages

---

## 🎯 Quick Start (Copy-Paste Ready)

After completing Steps 1-4, here's what you need to update in `script.js`:

```javascript
// REPLACE THESE THREE LINES IN script.js (around line 337-339)

const EMAILJS_PUBLIC_KEY = 'paste_your_public_key_here';
const EMAILJS_SERVICE_ID = 'paste_your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'paste_your_template_id_here';
```

**That's it! Your form is ready to send emails.** 🎉

---

## 📈 Going to Production

### For Production Deployment:

1. **Test thoroughly** with multiple form submissions
2. **Monitor** EmailJS usage dashboard
3. **Set up** email forwarding rules if needed
4. **Consider** upgrading EmailJS plan if you expect >200 submissions/month
5. **Backup** form submissions (current code auto-downloads backup files)

### Recommended Hosting:
- **Netlify** (free, drag-and-drop deployment)
- **Vercel** (free, GitHub integration)
- **GitHub Pages** (free, version controlled)

All three support static HTML/CSS/JS sites perfectly!

---

**You're all set! 🚀**
