function handleFormSubmit(event, form) {
    try {
        if (!window['hn_faiz_widget_btn']) {
            window['hn_faiz_widget_btn'] = true;
            var submitButton = form.querySelector('button[type=submit]');
            if (submitButton) {
                submitButton.innerHTML = 'Hesaplanıyor...';
                setTimeout(function() {
                    window['hn_faiz_widget_btn'] = false;
                    submitButton.innerHTML = 'Hesapla';
                }, 5000);
            } else {
                setTimeout(function() {
                    window['hn_faiz_widget_btn'] = false;
                }, 5000);
            }
        } else {
            event.preventDefault();
        }
    } catch(err) {
        console.error(err);
    }
}