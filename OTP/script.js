// This script is used to verify OTP fields on a form. It is designed to work with multiple OTP fields on the same page.

// Settings:

const autoSubmit = true;                                                // Set to 'true' to automatically submit the form when the OTP is full of 6 numbers.
const addCssClassWhenVerified = false;                                  // Set to 'true' to add a class named 'verified' to the OTP field when the OTP is verified.
const shakeEffect = true;                                               // Set to 'true' to enable the shake effect when the input of the user is incorrect.

const actionBtn = document.getElementById('sdev-call-setup-2FA');       // The button that will trigger the OTP verification.

// ----------------------------------------------
// OTP submit:
// ----------------------------------------------

const otpField = document.querySelectorAll('#otp-field');
const otpInputs = Array.from(document.querySelectorAll("#otp-field input"));

const submitAction = (index = 0) => {

    /**
     * Handles the action to be performed after the OTP is verified. You can modify this function to fit your needs.
     *
     * @param {number} [index=0] - Modif index value if you have multiple OTP fields to verify on the same page.
     * 
     * @returns {boolean} - Returns 'true' if the OTP is verified.
    */

    // Example: Submit data to an API to verify if the OTP is correct.

    console.log(`${otpField[index].getAttribute('otpname')} OTP have been verified!`);

    if (addCssClassWhenVerified){
        otpField[index].classList.add('verified');
    };

    return true;

};

// ----------------------------------------------
// OTP Internal:
// ----------------------------------------------

// Do not modify the code below unless you know what you are doing.

const verifOTP = (otpToMap) => {return /^[0-9]{6}$/.test(otpToMap.map(x => x.value).join(''));};

const shake_element = (otpToShake) => {

    if (shakeEffect){

        otpToShake.forEach((inpt) => {

            inpt.classList.remove('shake');
            inpt.classList.add('shake');

            setTimeout(() => inpt.classList.remove('shake'), 600);

        });

    };

};

const switchFocus = (otpToSwitch) => {

    otpToSwitch.focus();
    otpToSwitch.select();
    otpToSwitch.setSelectionRange(otpToSwitch.value.length, otpToSwitch.value.length);

};

otpField.forEach((input, index) => {

    let otpInputs = Array.from(input.querySelectorAll("input"));

    otpInputs.forEach((input, i_index) => {

        input.addEventListener("paste", (e) => {

            e.preventDefault();

            const pasteData = (e.clipboardData || window.clipboardData).getData('text');
            const digits = pasteData.replace(/\D/g, '');

            if (digits.length === 6) {
                otpInputs.forEach((otpInput, idx) => {
                    otpInput.value = digits[idx] || '';
                });
                otpInputs[5].focus();
            } else {
                shake_element(otpInputs);
            };

        });

        input.addEventListener("keydown", (e) => {

            if ((e.key === "Backspace" && input.value === "") || e.key === "ArrowLeft") {
                if (e.key === "ArrowLeft"){
                    e.preventDefault();
                };
                let previousInput = otpInputs[i_index - 1];
                if (previousInput) {
                    switchFocus(previousInput);
                };
            };
            if (e.key === "ArrowRight") {
                e.preventDefault();
                let nextInput = otpInputs[i_index + 1];
                if (nextInput) {
                    switchFocus(nextInput);
                };
            };
            if (e.key === "Enter") {
                e.preventDefault();
                if (verifOTP(otpInputs)) {
                    submitAction(index);
                } else {
                    shake_element(otpInputs);
                };
            };

        });

        input.addEventListener("input", (e) => {

            if (/^[0-9]{1}$/.test(e.data)){
                input.value = e.data;
                let nextInput = otpInputs[i_index + 1];
                if (nextInput) {
                    switchFocus(nextInput);
                };
                if (autoSubmit && verifOTP(otpInputs)) {
                    submitAction(index);
                };
            } else {
                if (/^[0-9]{1}$/.test(input.value.replace(/\D/g, ''))){
                    input.value = input.value.replace(/\D/g, '');
                } else {
                    input.value = "";
                }
                if (e.data != null){
                    shake_element(otpInputs);
                };
            };

        });

        input.addEventListener("focus", (e) => {
            input.select();
            input.setSelectionRange(input.value.length, input.value.length);
        });

    });

});