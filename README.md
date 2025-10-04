# JNG Employee Onboarding Form

A professional, modern employee onboarding form for **Jilz and Ganze Innovators Private Limited**.

## Features

- 🎨 Modern UI matching Guardian Angel website design
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations and transitions
- 🔄 Multi-step form with progress tracking
- ✅ Real-time validation
- 🎯 Intelligent conditional fields
- 📧 Email submission to pareekshith@jnginnovators.com
- ♿ Accessible (ARIA labels, keyboard navigation)

## Setup Instructions

### Option 1: Using EmailJS (Recommended)

1. **Sign up for EmailJS** (free tier available)
   - Go to https://www.emailjs.com/
   - Create a free account
   - Add an email service (Gmail, Outlook, etc.)
   - Create an email template

2. **Configure EmailJS**
   - Get your Public Key from EmailJS dashboard
   - Note your Service ID and Template ID
   - Open `script.js` and update the EmailJS configuration:

```javascript
// Replace these values in script.js
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
```

3. **Email Template Setup**
   In EmailJS, create a template with these variables:
   - `{{from_name}}` - Candidate's full name
   - `{{from_email}}` - Candidate's email
   - `{{message}}` - Full form data
   - `{{to_email}}` - Set to pareekshith@jnginnovators.com

### Option 2: Using a Backend API

If you prefer to use your own backend:

1. Create an API endpoint that accepts POST requests
2. Update the `sendEmail()` function in `script.js` to call your API
3. Ensure your backend sends emails to pareekshith@jnginnovators.com

### Option 3: Simple mailto (Current Implementation)

The form currently uses a basic approach for testing. To make it production-ready, implement Option 1 or 2.

## File Structure

```
jng-employee-form/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── script.js           # Form logic and validation
├── jng-logo.png       # Company logo
└── README.md          # This file
```

## Form Sections

1. **Personal Information** - Name, DOB, Contact, Email
2. **Educational Background** - Qualifications
3. **Professional Experience** - Company details, experience, designation
4. **Notice Period & Availability** - With conditional logic
5. **Compensation** - Current and expected CTC
6. **Document Availability** - Required documents checklist
7. **Relocation & Travel** - Willingness to relocate and travel

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #5B8FD8;
    --primary-dark: #4A7AC4;
    --secondary-color: #000000;
    --bg-cream: #E8DED3;
    --bg-light: #F5F1ED;
}
```

### Form Fields

To add/remove fields, edit the HTML in `index.html` and update validation logic in `script.js`.

## Testing

1. Open `index.html` in a web browser
2. Fill out the form and test validation
3. Test conditional fields (notice period questions)
4. Submit and verify email delivery

## Production Deployment

1. Set up EmailJS or backend API
2. Update email configuration in `script.js`
3. Test email delivery
4. Deploy to web hosting (Netlify, Vercel, GitHub Pages, etc.)

## License

Copyright © 2025 Jilz and Ganze Innovators Private Limited

## Support

For issues or questions, contact: pareekshith@jnginnovators.com
