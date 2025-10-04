# Updated EmailJS Template Setup

## Problem Solved
The previous approach of sending HTML in `{{{message}}}` was causing rendering issues. This new approach passes individual form fields as variables to EmailJS and builds the HTML directly in the template.

---

## Setup Instructions

### Step 1: Go to EmailJS Dashboard
- Visit https://dashboard.emailjs.com/admin
- Click "Email Templates"
- Open your template: `template_tcmacb9`

### Step 2: Replace the Template
1. Click on the **"Content"** tab
2. **Delete all existing content**
3. **Copy the entire content** from `emailjs-template-new.html`
4. **Paste** it into the template editor

### Step 3: Configure Template Settings
Make sure these are set in the **"Settings"** tab:
- **To Email**: `pareekshith@jnginnovators.com`
- **From Name**: `{{from_name}}`
- **Reply To**: `{{from_email}}`
- **Subject**: `New Employee Application from {{from_name}}`

### Step 4: Save the Template
- Click **"Save"**
- Wait for confirmation

### Step 5: Test the Form
- Refresh your form page
- Fill out and submit the form
- Check email at pareekshith@jnginnovators.com

---

## How It Works Now

### Before (❌ Bad):
```javascript
// Sent full HTML as one variable
message: `<div>...</div>` // Caused rendering issues
```

### After (✅ Good):
```javascript
// Pass individual fields
fullName: 'John Doe',
dob: '1990-01-01',
currentCompany: 'ABC Corp',
// ... etc
```

The template then uses these variables directly:
```html
<span class="field-value">{{fullName}}</span>
<span class="field-value">{{dob}}</span>
```

---

## Variables Available in Template

### Personal Information
- `{{fullName}}`
- `{{dob}}`
- `{{contactNumber}}`
- `{{email}}`

### Educational Background
- `{{education}}`

### Professional Experience
- `{{currentCompany}}`
- `{{previousCompany}}`
- `{{experience}}`
- `{{designation}}`

### Notice Period
- `{{onNoticePeriod}}` - "Yes" or "No" (display)
- `{{noticePeriodStatus}}` - "yes" or "no" (for conditionals)
- `{{noticeDays}}`
- `{{noticePeriodDuration}}`
- `{{joiningDate}}`

### Compensation
- `{{currentCtc}}`
- `{{expectedCtc}}`

### Documents
- `{{docEducation}}` - "✅" or "❌"
- `{{docExperience}}` - "✅" or "❌"
- `{{docRelieving}}` - "✅" or "❌"
- `{{docPayslips}}` - "✅" or "❌"

### Relocation & Travel
- `{{relocate}}` - "Yes" or "No" (display)
- `{{relocateStatus}}` - "yes" or "no" (for conditionals)
- `{{travel}}` - "Yes" or "No" (display)
- `{{travelStatus}}` - "yes" or "no" (for conditionals)

### Metadata
- `{{submissionDate}}` - Formatted date/time
- `{{from_name}}` - Candidate name (in header)
- `{{from_email}}` - Candidate email (in header)

---

## Conditional Logic in Template

The template uses Mustache syntax for conditionals:

```html
{{#if_equals noticePeriodStatus 'yes'}}
    <div>Show if yes</div>
{{else}}
    <div>Show if no</div>
{{/if_equals}}
```

**Note**: EmailJS may not support `if_equals` helper. If it doesn't work, you'll need to:

### Alternative 1: Remove Conditionals
Just show both fields always:
```html
<div>Days Remaining: {{noticeDays}}</div>
<div>Notice Period: {{noticePeriodDuration}}</div>
```

### Alternative 2: Use Basic Mustache
```html
{{#noticePeriodYes}}
    <div>Days Remaining: {{noticeDays}}</div>
{{/noticePeriodYes}}
{{#noticePeriodNo}}
    <div>Notice Period: {{noticePeriodDuration}}</div>
{{/noticePeriodNo}}
```

And update script.js to send boolean flags:
```javascript
noticePeriodYes: data.onNoticePeriod === 'yes',
noticePeriodNo: data.onNoticePeriod === 'no',
```

---

## Design Features

The new template is:
- ✅ Compact and professional
- ✅ Matches the form design aesthetic
- ✅ Uses Guardian Angel colors (blue, cream, black)
- ✅ Mobile responsive
- ✅ Clean section-based layout
- ✅ Color-coded yes/no indicators
- ✅ Gradient headers
- ✅ Highlighted compensation section

---

## Troubleshooting

### If conditionals don't work:
1. Open the template in EmailJS
2. Remove the `{{#if_equals}}` blocks
3. Just show both fields or simplify

### If variables don't show:
1. Check spelling in both script.js and template
2. Make sure script.js is updated with new templateParams
3. Clear browser cache and retry

### If styling is broken:
1. EmailJS might strip some CSS
2. All critical styles are inline
3. Should work across email clients

---

## Testing Checklist

Before going live:
- [ ] Template updated in EmailJS
- [ ] Settings configured (To Email, From Name, etc.)
- [ ] Template saved
- [ ] Form page refreshed
- [ ] Test submission sent
- [ ] Email received at pareekshith@jnginnovators.com
- [ ] All fields display correctly
- [ ] Styling looks good
- [ ] Conditional fields work (notice period)

---

**Your form is now ready with the new clean template approach!** 🎉
