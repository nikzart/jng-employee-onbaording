# EmailJS "Recipients Address is Empty" - Quick Fix

## Problem
Error: `The recipients address is empty` (HTTP 422)

## Solution

You need to configure the **To Email** field in your EmailJS template settings.

### Step-by-Step Fix:

1. **Go to EmailJS Dashboard**
   - Visit https://dashboard.emailjs.com/admin
   - Log in to your account

2. **Navigate to Email Templates**
   - Click "Email Templates" in the left sidebar
   - Find your template: `template_tcmacb9`
   - Click on it to edit

3. **Configure Template Settings**
   - Look for the **"Settings"** tab at the top
   - Find the **"To Email"** field
   - Enter: `pareekshith@jnginnovators.com`

   **Alternative Option:**
   - If you want dynamic recipient from the form, use: `{{to_email}}`
   - But for your use case, hardcoding is better

4. **Configure Other Fields (Important)**

   Set these fields in the Settings tab:

   ```
   To Email:        pareekshith@jnginnovators.com
   From Name:       {{from_name}}
   Reply To:        {{from_email}}
   Subject:         New Employee Application from {{from_name}}
   ```

5. **Save the Template**
   - Click "Save" button
   - Wait for confirmation

6. **Test Again**
   - Go back to your form
   - Fill it out completely
   - Submit
   - Check pareekshith@jnginnovators.com inbox

---

## Alternative: Update Template Content Tab

If the Settings tab doesn't work, you can also set the recipient in the **Content** tab:

1. Go to the **Content** tab of your template
2. At the top, there should be fields for:
   - **To:** Enter `pareekshith@jnginnovators.com`
   - **From:** Enter `{{from_name}}`
   - **Subject:** Enter `New Employee Application from {{from_name}}`
   - **Reply-To:** Enter `{{from_email}}`

---

## Screenshot Guide

### What to Look For:

```
┌─────────────────────────────────────────┐
│ Template: template_tcmacb9              │
├─────────────────────────────────────────┤
│ Settings | Content | Test                │
├─────────────────────────────────────────┤
│                                          │
│ To Email: [pareekshith@jnginnovators.com]│ ← FILL THIS
│                                          │
│ From Name: [{{from_name}}]              │ ← SET THIS
│                                          │
│ Reply To: [{{from_email}}]              │ ← SET THIS
│                                          │
│ Subject: [New Employee Application...]  │ ← SET THIS
│                                          │
└─────────────────────────────────────────┘
```

---

## Verify It's Working

After configuring the template, test it:

1. Open browser console (F12)
2. Fill out the form
3. Submit
4. Check console for:
   - ✅ `Email sent successfully: {status: 200, text: 'OK'}`
   - ❌ If still error, check the exact error message

---

## Common Mistakes

### ❌ Wrong:
- Leaving "To Email" field empty
- Using `to_email` variable but not passing it
- Not saving the template after changes

### ✅ Correct:
- Hardcode `pareekshith@jnginnovators.com` in template settings
- Save and wait for confirmation
- Clear browser cache and retry

---

## Still Not Working?

### Option 1: Recreate the Template

1. Delete current template
2. Create new template
3. Copy HTML from `emailjs-template.html`
4. **BEFORE saving**, set "To Email" to `pareekshith@jnginnovators.com`
5. Save

### Option 2: Use Auto-Reply Template

1. In EmailJS dashboard, create template from "Contact Form" preset
2. Modify it with your HTML
3. The preset usually has proper email configuration

### Option 3: Check Service Configuration

1. Go to "Email Services"
2. Click on `jng-innovators`
3. Make sure it's properly connected
4. Test the service connection

---

## Testing Checklist

Before production:

- [ ] Template "To Email" is set to pareekshith@jnginnovators.com
- [ ] Template "From Name" is set to {{from_name}}
- [ ] Template "Reply To" is set to {{from_email}}
- [ ] Template "Subject" includes {{from_name}}
- [ ] Service is connected and active
- [ ] Template is saved
- [ ] Browser cache cleared
- [ ] Test submission successful
- [ ] Email received in inbox

---

## Need More Help?

**EmailJS Documentation:**
https://www.emailjs.com/docs/user-guide/adding-email-template/

**EmailJS Support:**
support@emailjs.com

**Form Code:**
Everything is correct in your form code. The issue is 100% in the EmailJS dashboard template configuration.
