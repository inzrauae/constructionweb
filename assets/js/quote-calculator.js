// Inquiry Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: inquiryForm.querySelector('[name="name"]').value,
                email: inquiryForm.querySelector('[name="email"]').value,
                phone: inquiryForm.querySelector('[name="phone"]').value,
                service: inquiryForm.querySelector('[name="service"]').value,
                message: inquiryForm.querySelector('[name="message"]').value
            };
            
            // Log form data (you can send this to your backend)
            console.log('Inquiry Form Data:', formData);
            
            // Show success message
            alert('Thank you for your inquiry! We will contact you soon.');
            
            // Reset form
            inquiryForm.reset();
            
            // You can add AJAX call here to send data to your backend
            // Example:
            // fetch('/api/inquiry', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Thank you for your inquiry! We will contact you soon.');
            //     inquiryForm.reset();
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('Sorry, there was an error. Please try again.');
            // });
        });
    }
});
