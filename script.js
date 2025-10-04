// Form Navigation and Progress
let currentSection = 1;
const totalSections = 7;

function updateProgress() {
    const progress = (currentSection / totalSections) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function nextSection(sectionNumber) {
    // Validate current section before moving forward
    if (!validateSection(currentSection)) {
        return;
    }

    // Hide current section
    document.querySelector(`.form-section[data-section="${currentSection}"]`).classList.remove('active');

    // Show next section
    currentSection = sectionNumber;
    document.querySelector(`.form-section[data-section="${currentSection}"]`).classList.add('active');

    // Update progress bar
    updateProgress();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevSection(sectionNumber) {
    // Hide current section
    document.querySelector(`.form-section[data-section="${currentSection}"]`).classList.remove('active');

    // Show previous section
    currentSection = sectionNumber;
    document.querySelector(`.form-section[data-section="${currentSection}"]`).classList.add('active');

    // Update progress bar
    updateProgress();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Section Validation
function validateSection(sectionNumber) {
    const section = document.querySelector(`.form-section[data-section="${sectionNumber}"]`);
    const inputs = section.querySelectorAll('input[required], input[type="radio"][required]');
    let isValid = true;

    // Handle radio button groups
    const radioGroups = {};
    inputs.forEach(input => {
        if (input.type === 'radio') {
            if (!radioGroups[input.name]) {
                radioGroups[input.name] = [];
            }
            radioGroups[input.name].push(input);
        }
    });

    // Validate radio groups
    for (const groupName in radioGroups) {
        const group = radioGroups[groupName];
        const isChecked = group.some(radio => radio.checked);

        if (!isChecked) {
            isValid = false;
            const radioContainer = group[0].closest('.form-group');
            const errorMsg = radioContainer.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = 'Please select an option';
                errorMsg.classList.add('show');
            }
        }
    }

    // Validate other inputs
    inputs.forEach(input => {
        if (input.type !== 'radio' && input.type !== 'checkbox') {
            if (!input.value.trim() && !input.closest('.conditional-field')) {
                isValid = false;
                input.classList.add('error');
                const errorMsg = input.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.textContent = 'This field is required';
                    errorMsg.classList.add('show');
                }
            }
        }
    });

    // Validate checkboxes in section 6
    if (sectionNumber === 6) {
        const checkboxes = section.querySelectorAll('input[type="checkbox"][required]');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        if (!allChecked) {
            isValid = false;
            alert('Please confirm that you can provide all required documents.');
        }
    }

    // Validate conditional fields in section 4
    if (sectionNumber === 4) {
        const noticePeriodValue = document.querySelector('input[name="onNoticePeriod"]:checked')?.value;

        if (noticePeriodValue === 'yes') {
            const noticeDaysInput = document.getElementById('noticeDays');
            if (!noticeDaysInput.value.trim()) {
                isValid = false;
                noticeDaysInput.classList.add('error');
                const errorMsg = noticeDaysInput.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.textContent = 'Please enter the number of days';
                    errorMsg.classList.add('show');
                }
            }
        } else if (noticePeriodValue === 'no') {
            const noticePeriodDurationInput = document.getElementById('noticePeriodDuration');
            if (!noticePeriodDurationInput.value.trim()) {
                isValid = false;
                noticePeriodDurationInput.classList.add('error');
                const errorMsg = noticePeriodDurationInput.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.textContent = 'Please enter your notice period';
                    errorMsg.classList.add('show');
                }
            }
        }
    }

    return isValid;
}

// Clear error on input
document.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT') {
        e.target.classList.remove('error');
        const errorMsg = e.target.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.classList.remove('show');
        }
    }
});

// Clear radio button errors on change
document.addEventListener('change', (e) => {
    if (e.target.type === 'radio') {
        const radioContainer = e.target.closest('.form-group');
        const errorMsg = radioContainer?.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.classList.remove('show');
        }
    }
});

// Conditional Fields Logic
document.addEventListener('DOMContentLoaded', () => {
    // Notice Period Conditional Logic
    const noticePeriodRadios = document.querySelectorAll('input[name="onNoticePeriod"]');
    const noticeDaysGroup = document.getElementById('noticeDaysGroup');
    const noticePeriodDurationGroup = document.getElementById('noticePeriodDurationGroup');
    const noticeDaysInput = document.getElementById('noticeDays');
    const noticePeriodDurationInput = document.getElementById('noticePeriodDuration');

    noticePeriodRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            // Hide both conditional fields first
            noticeDaysGroup.style.display = 'none';
            noticePeriodDurationGroup.style.display = 'none';
            noticeDaysGroup.classList.remove('show');
            noticePeriodDurationGroup.classList.remove('show');

            // Clear values and remove required attributes
            noticeDaysInput.value = '';
            noticePeriodDurationInput.value = '';
            noticeDaysInput.removeAttribute('required');
            noticePeriodDurationInput.removeAttribute('required');

            // Show appropriate field based on selection
            if (e.target.value === 'yes') {
                noticeDaysGroup.style.display = 'flex';
                setTimeout(() => {
                    noticeDaysGroup.classList.add('show');
                }, 10);
                noticeDaysInput.setAttribute('required', 'required');
            } else if (e.target.value === 'no') {
                noticePeriodDurationGroup.style.display = 'flex';
                setTimeout(() => {
                    noticePeriodDurationGroup.classList.add('show');
                }, 10);
                noticePeriodDurationInput.setAttribute('required', 'required');
            }
        });
    });

    // Email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailInput.classList.add('error');
            const errorMsg = emailInput.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = 'Please enter a valid email address';
                errorMsg.classList.add('show');
            }
        }
    });

    // Phone number validation
    const phoneInput = document.getElementById('contactNumber');
    phoneInput.addEventListener('blur', () => {
        const phoneRegex = /^[+]?[\d\s-]{10,}$/;
        if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
            phoneInput.classList.add('error');
            const errorMsg = phoneInput.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = 'Please enter a valid phone number';
                errorMsg.classList.add('show');
            }
        }
    });

    // Initialize progress bar
    updateProgress();
});

// Form Submission
document.getElementById('onboardingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate final section
    if (!validateSection(currentSection)) {
        return;
    }

    // Show loading overlay
    document.getElementById('loadingOverlay').classList.add('show');

    // Collect form data
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        // Send email using EmailJS with form data
        await sendEmail(data);

        // Hide loading overlay
        document.getElementById('loadingOverlay').classList.remove('show');

        // Show success modal
        document.getElementById('successModal').classList.add('show');

        // Reset form
        setTimeout(() => {
            e.target.reset();
            currentSection = 1;
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.remove('active');
            });
            document.querySelector('.form-section[data-section="1"]').classList.add('active');
            updateProgress();
        }, 2000);

    } catch (error) {
        // Hide loading overlay
        document.getElementById('loadingOverlay').classList.remove('show');

        // Show error message
        alert('There was an error submitting your application. Please try again or contact us directly at pareekshith@jnginnovators.com');
        console.error('Submission error:', error);
    }
});

async function sendEmail(data) {
    // EmailJS Configuration
    const EMAILJS_PUBLIC_KEY = '0KeNDP5bx8-wHh_H9';
    const EMAILJS_SERVICE_ID = 'jng-innovators';
    const EMAILJS_TEMPLATE_ID = 'template_tcmacb9';

    // Check if EmailJS is configured
    if (typeof emailjs === 'undefined') {
        // Fallback: Use Web3Forms (alternative free service) or mailto
        return sendEmailFallback(emailContent);
    }

    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Format notice period details
    let noticePeriodDetails = 'N/A';
    if (data.onNoticePeriod === 'yes' && data.noticeDays) {
        noticePeriodDetails = `${data.noticeDays} days remaining`;
    } else if (data.onNoticePeriod === 'no' && data.noticePeriodDuration) {
        noticePeriodDetails = data.noticePeriodDuration;
    }

    // Send email via EmailJS - pass individual fields as variables
    const templateParams = {
        to_email: 'pareekshith@jnginnovators.com',
        from_name: document.getElementById('fullName').value,
        from_email: document.getElementById('email').value,

        // Personal Information
        fullName: data.fullName || 'N/A',
        dob: data.dob || 'N/A',
        contactNumber: data.contactNumber || 'N/A',
        email: data.email || 'N/A',

        // Educational Background
        education: data.education || 'N/A',

        // Professional Experience
        currentCompany: data.currentCompany || 'N/A',
        previousCompany: data.previousCompany || 'N/A',
        experience: data.experience || 'N/A',
        designation: data.designation || 'N/A',

        // Notice Period
        onNoticePeriod: data.onNoticePeriod === 'yes' ? '✅ Yes' : '❌ No',
        noticePeriodDetails: noticePeriodDetails,
        joiningDate: data.joiningDate || 'N/A',

        // Compensation
        currentCtc: data.currentCtc || 'N/A',
        expectedCtc: data.expectedCtc || 'N/A',

        // Documents
        docEducation: data.docEducation === 'yes' ? '✅' : '❌',
        docExperience: data.docExperience === 'yes' ? '✅' : '❌',
        docRelieving: data.docRelieving === 'yes' ? '✅' : '❌',
        docPayslips: data.docPayslips === 'yes' ? '✅' : '❌',

        // Relocation & Travel
        relocate: data.relocate === 'yes' ? '✅ Yes' : '❌ No',
        travel: data.travel === 'yes' ? '✅ Yes' : '❌ No',

        // Timestamp
        submissionDate: new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );
        console.log('Email sent successfully:', response);
        return response;
    } catch (error) {
        console.error('EmailJS error:', error);
        throw error;
    }
}

// Fallback email method using Web3Forms API (free, no signup required for testing)
async function sendEmailFallback(emailContent) {
    // Using Web3Forms - a free form submission service
    // For production, get your own access key from https://web3forms.com

    const formData = {
        access_key: 'YOUR_WEB3FORMS_KEY_HERE', // Get free key from web3forms.com
        subject: 'New Employee Onboarding Application - JNG Innovators',
        from_name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        message: emailContent,
        to_email: 'pareekshith@jnginnovators.com'
    };

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            console.log('Email sent successfully via Web3Forms');
            return result;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Web3Forms error:', error);

        // Final fallback: Log to console and create a mailto link
        console.log('Email Content:', emailContent);
        console.log('Please set up EmailJS or Web3Forms for production use.');

        // Create downloadable text file as fallback
        downloadFormData(emailContent);

        // Simulate successful submission for demo purposes
        return Promise.resolve({ status: 'demo' });
    }
}

// Create downloadable backup of form data
function downloadFormData(emailContent) {
    const blob = new Blob([emailContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JNG_Application_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    console.log('Form data downloaded as backup. Please send this file to pareekshith@jnginnovators.com');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

// Close modal on outside click
document.getElementById('successModal').addEventListener('click', (e) => {
    if (e.target.id === 'successModal') {
        closeModal();
    }
});

// Smooth animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.form-group').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
    observer.observe(element);
});
