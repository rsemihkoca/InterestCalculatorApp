function handleFormSubmit(event, form) {
    try {
        event.preventDefault();

        if (!window["hn_faiz_widget_btn"]) {
            window["hn_faiz_widget_btn"] = true;
            var submitButton = form.querySelector("button[type=submit]");

            if (submitButton) {
                submitButton.innerHTML = "Hesaplanıyor...";
                submitButton.disabled = true; // Disable the submit button during calculation

                setTimeout(function () {
                    try {
                        // Simulate async API call
                        simulateAsyncApiCall(form)
                            .then((response) => {
                                // Handle success
                                window["hn_faiz_widget_btn"] = false;
                                submitButton.innerHTML = "Hesapla";
                                submitButton.disabled = false; // Re-enable the submit button

                                // Display success message or response
                                console.log("API Response:", response);
                                // Update UI with success message or response
                                updateResultUI(response);
                            })
                            .catch((error) => {
                                // Handle failure
                                window["hn_faiz_widget_btn"] = false;
                                submitButton.innerHTML = "Hesapla";
                                submitButton.disabled = false; // Re-enable the submit button
                                error = error || "An unexpected error occurred. Please try again.";
                                showPopup(error);
                                // throw error;
                            });
                    } catch (innerErr) {
                        console.error(innerErr);
                        showPopup(innerErr.toString());

                    }
                }, 500);
            }
        }
    } catch (err) {
        console.error(err);
        showPopup(err.toString());
    }
}


function simulateAsyncApiCall(form) {
    // Replace this with the actual API endpoint and method
    const apiUrl = "http://localhost:5210/api/Interest/Calculate";
    const formData = new FormData(form);

    return new Promise((resolve, reject) => {
        fetch(apiUrl, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // Check if the response has an 'errors' field
                if (data && data.errors) {
                    // Extract error messages and format them
                    const errorMessages = Object.values(data.errors)
                        .flatMap((error) => error.filter(errorMessage => errorMessage !== "The value '' is invalid."));
                    // • add a bullet point in front of each message
                    errorMessages.forEach((message, index) => {
                        errorMessages[index] = `• ${message}`;
                    });
                    const formattedError = errorMessages.join("\n");
                    // console.error("API Error:", formattedError);
                    reject(formattedError);
                } else {
                    // If there are no errors, resolve with the data
                    resolve(data);
                }
            })
            .catch((error) => {
                // console.error("API Request Failed:", error.toString());
                reject(error);
            });
    });
}

function updateResultUI(response) {
    var resultFieldset = document.getElementById("hn-faiz-widget");
    if (resultFieldset) {
        resultFieldset.innerHTML = `
                <form id="hform" class="hnarac" method="get" action="http://localhost:5210/">
                <fieldset>
                    <legend>Hesaplama Sonuçları</legend>
                    <div style="margin-left: 2%;font-size: 1rem;font-family: Helvetica,sans-serif;letter-spacing: 0.08rem;color:#333;background: #fff" >
                        <br><br>
                        <strong>Anapara:</strong>&nbsp;${response["anapara"].toFixed(2)} <br> <br>
                        <strong>Faiz Tutarı:</strong>&nbsp;${response["Faiz Tutarı"].toFixed(2)} <br> <br>
                        <strong>Getiri Oranı:</strong>&nbsp;%${response["Getiri Oranı"].toFixed(2)} <br> <br>
                        <strong>Vade Sonu Toplam:</strong>&nbsp;${response["Vade Sonu Toplam"].toFixed(2)} <br> <br>
                        <div class="buttons"> <button  type="submit">Başa Dön</button> </div>
                     </div>
       
                </fieldset>
                </form>
                `;
    }
}

function showPopup(message) {

    var errorPopup = document.getElementById("errorPopup");
    var errorMessageElement = document.getElementById("errorMessage");

    errorMessageElement.innerText = message;

    // Calculate dimensions based on message length
    var messageHeight = errorMessageElement.offsetHeight + 40; // Add padding
    var messageWidth = errorMessageElement.offsetWidth + 40; // Add padding

    // Set dimensions
    errorPopup.style.height = messageHeight + "px";
    errorPopup.style.width = messageWidth + "px";

    errorPopup.classList.add("show");

    setTimeout(function () {
        errorPopup.classList.remove("show");
    }, 3000);

}
