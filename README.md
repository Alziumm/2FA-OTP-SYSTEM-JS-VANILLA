# Very scalable OTP system in Vanilla JS.

This code is used to verify OTP fields on a form. It is designed to work with multiple OTP fields on the same page and include some cool settings to fit with your needs.

## JS Settings:

const autoSubmit = true; <=> Set to 'true' to automatically submit the form when the OTP is full of 6 numbers.
const addCssClassWhenVerified = false; <=> Set to 'true' to add a class named 'verified' to the OTP field when the OTP is verified.
const shakeEffect = true; <=> Set to 'true' to enable the shake effect when the input of the user is incorrect.

## JS Callback:

There is a simple callback function named 'submitAction' that is automatically loaded if the OTP is verified. You can modify this function to fit your needs. Additionally, note that if you have defined an 'otpname' attribute in the HTML tag of #otp-field, you can easily interact with the different OTPs without needing a separate callback function for each OTP.

## Compatibility:

| | Chrome | Safari | Edge | Firefox | Brave | Opera |
| ------------- | ----------- | ----------- | ---------- | ----------- | ----------- | ---------- |
| Compatibility | ✅ Working  | ✅ Working | ✅ Working | ✅ Working | ✅ Working | ✅ Working |

## Licence:

You can use this code to do absolutely whatever you like. 

## Contact:

If you have any questions or need the services of a full-stack developer, feel free to contact me at: pierre.lebret@spunky.dev.