function handleFormSubmit(event, form) {
    try {
        event.preventDefault();

        if (!window['hn_faiz_widget_btn']) {
            window['hn_faiz_widget_btn'] = true;
            var submitButton = form.querySelector('button[type=submit]');

            if (submitButton) {
                submitButton.innerHTML = 'Hesaplanıyor...';
                submitButton.disabled = true;  // Disable the submit button during calculation

                setTimeout(function () {
                    try {
                        // Simulate async API call
                        simulateAsyncApiCall(form)
                            .then(response => {
                                // Handle success
                                window['hn_faiz_widget_btn'] = false;
                                submitButton.innerHTML = 'Hesapla';
                                submitButton.disabled = false;  // Re-enable the submit button

                                // Display success message or response
                                console.log('API Response:', response);
                                // Update UI with success message or response
                                // For example: document.getElementById('result').innerHTML = response;
                            })
                            .catch(error => {
                                // Handle failure
                                window['hn_faiz_widget_btn'] = false;
                                submitButton.innerHTML = 'Hesapla';
                                submitButton.disabled = false;  // Re-enable the submit button

                                // Display error message
                                console.error('API Error:', error);
                                // Update UI with error message
                                // For example: document.getElementById('error').innerHTML = 'Something went wrong!';
                            });
                    } catch (innerErr) {
                        console.error(innerErr);
                    }
                }, 5000);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

// Simulate an asynchronous API call
function simulateAsyncApiCall(form) {
    // Replace this with the actual API endpoint and method
    const apiUrl = 'http://localhost:5210/api/Interest/Calculate';
    const formData = new FormData(form);

    return new Promise((resolve, reject) => {
        fetch(apiUrl, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    reject('Failed to fetch');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}
