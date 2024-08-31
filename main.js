// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Disable the submit button to prevent multiple submissions
  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  // Get reCAPTCHA response
  var recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    alert('Please complete the reCAPTCHA');
    submitButton.disabled = false;
    return;
  }

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Send form data to Firebase Function
  fetch('https://<YOUR_REGION>-<YOUR_PROJECT_ID>.cloudfunctions.net/submitForm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, company, email, phone, message, recaptchaResponse })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    alert('Message sent successfully');
    // Re-enable the submit button after a delay (e.g., 5 seconds)
    setTimeout(() => {
      submitButton.disabled = false;
    }, 5000);
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to send message');
    submitButton.disabled = false;
  });
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}