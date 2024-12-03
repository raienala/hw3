
//Program name: patient-form.html//
//Author: Ranadheer Reddy Aienala//
//Date created: 11/01/2024//
//Date last edited: 12/02/2024//
//Version: 4.0//
//Description: A medical registration form for patients.//

function displayDate() {
    const date = new Date();
    document.getElementById("dynamic-date").innerText = date.toLocaleDateString();
}

function reviewForm() {
    const reviewSection = document.getElementById("review-section");
    reviewSection.style.display = "block";
    reviewSection.classList.add("slide-down");

    // Smooth scroll to the review section
    reviewSection.scrollIntoView({ behavior: 'smooth' });
    var firstName = document.getElementById("first-name").value;
    var middleInitial = document.getElementById("middle-initial").value;
    var lastName = document.getElementById("last-name").value;
    var dob = document.getElementById("dob").value;
    var ssn = document.getElementById("ssn").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var address1 = document.getElementById("address1").value;
    var feeling = document.getElementById("feeling-slider").value;
   
    var conditions = document.querySelectorAll('input[name="conditions"]:checked');
    var checkedConditions = [];
    conditions.forEach(function(condition) {
        checkedConditions.push(condition.value);
    });
    var conditions = checkedConditions.length ? checkedConditions.join(", ") : "None";

    var gender = document.querySelector('input[name="gender"]:checked');
    var gender = gender ? gender.value : "Not specified";


    var vaccinated = document.querySelector('input[name="vaccinated"]:checked');
    var vaccinated = vaccinated ? vaccinated.value : "Not specified";

    
    var insurance = document.querySelector('input[name="insurance"]:checked');
    var insurance = insurance ? insurance.value : "Not specified";

    document.getElementById("review-first-name").textContent = firstName;
    document.getElementById("review-middleiinitial").textContent = middleInitial;
    document.getElementById("review-last-name").textContent = lastName;
    document.getElementById("review-dob").textContent = dob;
    document.getElementById("review-ssn").textContent = ssn;
    document.getElementById("review-phone").textContent = phone;
    document.getElementById("review-email").textContent = email;
    document.getElementById("review-address1").textContent = address1;
    document.getElementById("review-feeling").textContent = feeling;
    document.getElementById("review-conditions").textContent = conditions;
    document.getElementById("review-gender").textContent = gender;
    document.getElementById("review-vaccinated").textContent = vaccinated;
    document.getElementById("review-insurance").textContent = insurance;
    
    document.getElementById("review-section").style.display = "block";
}

function updateSliderValue(value) {
    document.getElementById("slider-value").textContent = value;
}
document.addEventListener("DOMContentLoaded", function () {
    const firstName = document.getElementById("first-name");
    const middleInitial = document.getElementById("middle-initial");
    const lastName = document.getElementById("last-name");

    const firstNameError = document.getElementById("firstNameError");
    const middleInitialError = document.getElementById("middleInitialError");
    const lastNameError = document.getElementById("lastNameError");

    // Attach event listeners for validation
    firstName.addEventListener("input", validateFirstName);
    firstName.addEventListener("blur", validateFirstName);

    middleInitial.addEventListener("input", validateMiddleInitial);
    middleInitial.addEventListener("blur", validateMiddleInitial);

    lastName.addEventListener("input", validateLastName);
    lastName.addEventListener("blur", validateLastName);

    function validateFirstName() {
        const pattern = /^[A-Za-z]{1,30}$/;
        if (!pattern.test(firstName.value)) {
            firstNameError.textContent = "First name must be 1 to 30 letters only.";
        } else {
            firstNameError.textContent = "";
        }
    }

    function validateMiddleInitial() {
        const pattern = /^[A-Za-z]$/;
        if (middleInitial.value && !pattern.test(middleInitial.value)) {
            middleInitialError.textContent = "Middle initial must be 1 letter only.";
        } else {
            middleInitialError.textContent = "";
        }
    }

    function validateLastName() {
        const pattern = /^[A-Za-z]{1,30}$/;
        if (!pattern.test(lastName.value)) {
            lastNameError.textContent = "Last name must be 1 to 30 letters only.";
        } else {
            lastNameError.textContent = "";
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const dobInput = document.getElementById("dob");
    const dobError = document.getElementById("dob-error");

    const ssnInput = document.getElementById("ssn");
    const ssnError = document.getElementById("ssn-error");

    // Attach event listeners for real-time validation
    dobInput.addEventListener("input", validateDOB);
    dobInput.addEventListener("blur", validateDOB);

    ssnInput.addEventListener("input", validateSSN);
    ssnInput.addEventListener("blur", validateSSN);

    function validateDOB() {
        const dobValue = dobInput.value;
        dobError.textContent = ""; // Clear error

        if (!dobValue) {
            dobError.textContent = "Date of Birth is required.";
            return false;
        }

        const birthDate = new Date(dobValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const minBirthDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

        if (birthDate > today) {
            dobError.textContent = "Date of Birth cannot be in the future.";
            return false;
        }

        if (birthDate < minBirthDate) {
            dobError.textContent = "Date of Birth must be within the last 120 years.";
            return false;
        }

        return true;
    }

    function validateSSN() {
        const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
        const ssnValue = ssnInput.value;
        ssnError.textContent = ""; // Clear error

        if (!ssnValue) {
            ssnError.textContent = "SSN is required.";
            return false;
        }

        if (!ssnPattern.test(ssnValue)) {
            ssnError.textContent = "SSN must be in the format XXX-XX-XXXX.";
            return false;
        }

        return true;
    }

    // Automatically format SSN as the user types
    window.formatSSN = function (input) {
        const value = input.value.replace(/\D/g, ""); // Remove non-digits
        const formattedSSN = value
            .replace(/^(\d{3})(\d)/, "$1-$2")
            .replace(/-(\d{2})(\d)/, "-$1-$2");

        input.value = formattedSSN.substring(0, 11); // Limit to 11 characters
    };
});

document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");

    const phoneError = document.createElement("span");
    const emailError = document.createElement("span");

    phoneError.classList.add("error-message");
    emailError.classList.add("error-message");

    phoneInput.parentElement.appendChild(phoneError);
    emailInput.parentElement.appendChild(emailError);

    // Attach event listeners for real-time validation
    phoneInput.addEventListener("input", formatPhoneNumber);
    phoneInput.addEventListener("input", validatePhoneNumber);
    phoneInput.addEventListener("blur", validatePhoneNumber);

    emailInput.addEventListener("input", validateEmail);
    emailInput.addEventListener("blur", validateEmail);

    // Automatically format phone number as user types
    function formatPhoneNumber(event) {
        let phoneValue = phoneInput.value.replace(/\D/g, ''); // Remove all non-digit characters
        if (phoneValue.length > 3 && phoneValue.length <= 6) {
            phoneValue = phoneValue.replace(/(\d{3})(\d{1,})/, '$1-$2'); // Add dash after 3 digits
        } else if (phoneValue.length > 6) {
            phoneValue = phoneValue.replace(/(\d{3})(\d{3})(\d{1,})/, '$1-$2-$3'); // Add dash after 6 digits
        }
        phoneInput.value = phoneValue.substring(0, 12); // Limit to 12 characters: XXX-XXX-XXXX
    }

    // Validate Phone Number
    function validatePhoneNumber() {
        const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        const phoneValue = phoneInput.value;
        phoneError.textContent = ""; // Clear previous error

        if (!phoneValue) {
            phoneError.textContent = "Phone number is required.";
            return false;
        }

        if (!phonePattern.test(phoneValue)) {
            phoneError.textContent = "Phone number must match the format: 000-000-0000.";
            return false;
        }

        return true;
    }

    // Validate Email Address
    function validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailValue = emailInput.value;
        emailError.textContent = ""; // Clear previous error

        if (!emailValue) {
            emailError.textContent = "Email address is required.";
            return false;
        }

        if (!emailPattern.test(emailValue)) {
            emailError.textContent = "Please enter a valid email address.";
            return false;
        }

        return true;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const address1Input = document.getElementById("address1");
    const address2Input = document.getElementById("address2");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const zipInput = document.getElementById("zip");

    const address1Error = document.createElement("span");
    const address2Error = document.createElement("span");
    const cityError = document.createElement("span");
    const stateError = document.createElement("span");
    const zipError = document.createElement("span");

    address1Error.classList.add("error-message");
    address2Error.classList.add("error-message");
    cityError.classList.add("error-message");
    stateError.classList.add("error-message");
    zipError.classList.add("error-message");

    address1Input.parentElement.appendChild(address1Error);
    address2Input.parentElement.appendChild(address2Error);
    cityInput.parentElement.appendChild(cityError);
    stateInput.parentElement.appendChild(stateError);
    zipInput.parentElement.appendChild(zipError);

    // Attach event listeners for real-time validation
    address1Input.addEventListener("input", validateAddress1);
    address1Input.addEventListener("blur", validateAddress1);

    address2Input.addEventListener("input", validateAddress2);
    address2Input.addEventListener("blur", validateAddress2);

    cityInput.addEventListener("input", validateCity);
    cityInput.addEventListener("blur", validateCity);

    stateInput.addEventListener("input", validateState);
    stateInput.addEventListener("blur", validateState);

    zipInput.addEventListener("input", validateZip);
    zipInput.addEventListener("blur", validateZip);

    // Validate Address Line 1
    function validateAddress1() {
        const address1Value = address1Input.value;
        address1Error.textContent = ""; // Clear previous error

        if (!address1Value) {
            address1Error.textContent = "Address Line 1 is required.";
            return false;
        }

        if (address1Value.length < 3) {
            address1Error.textContent = "Address Line 1 must be at least 3 characters.";
            return false;
        }

        return true;
    }

    // Validate Address Line 2 (Optional)
    function validateAddress2() {
        const address2Value = address2Input.value;
        address2Error.textContent = ""; // Clear previous error

        if (address2Value.length > 0 && address2Value.length < 3) {
            address2Error.textContent = "Address Line 2 must be at least 3 characters.";
            return false;
        }

        return true;
    }

    // Validate City
    function validateCity() {
        const cityValue = cityInput.value;
        cityError.textContent = ""; // Clear previous error

        if (!cityValue) {
            cityError.textContent = "City is required.";
            return false;
        }

        if (cityValue.length < 2) {
            cityError.textContent = "City must be at least 2 characters.";
            return false;
        }

        return true;
    }

    // Validate State (Optional, here assumed as a text input for simplicity)
    function validateState() {
        const stateValue = stateInput.value;
        stateError.textContent = ""; // Clear previous error

        if (stateValue && stateValue.length < 2) {
            stateError.textContent = "State name must be at least 2 characters.";
            return false;
        }

        return true;
    }

    // Validate ZIP Code
    function validateZip() {
        const zipPattern = /^\d{5}(-\d{4})?$/;
        const zipValue = zipInput.value;
        zipError.textContent = ""; // Clear previous error

        if (!zipValue) {
            zipError.textContent = "ZIP Code is required.";
            return false;
        }

        if (!zipPattern.test(zipValue)) {
            zipError.textContent = "ZIP Code must match the format: 12345 or 12345-6789.";
            return false;
        }

        return true;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const insuranceYes = document.getElementById("insurance-yes");
    const insuranceNo = document.getElementById("insurance-no");
    const genderMale = document.getElementById("gender-male");
    const genderFemale = document.getElementById("gender-female");
    const vaccinatedYes = document.getElementById("vaccinated-yes");
    const vaccinatedNo = document.getElementById("vaccinated-no");
    const symptomsInput = document.getElementById("symptoms");

    const insuranceError = document.createElement("span");
    const genderError = document.createElement("span");
    const vaccinatedError = document.createElement("span");
    const symptomsError = document.createElement("span");

    insuranceError.classList.add("error-message");
    genderError.classList.add("error-message");
    vaccinatedError.classList.add("error-message");
    symptomsError.classList.add("error-message");

    insuranceYes.parentElement.appendChild(insuranceError);
    insuranceNo.parentElement.appendChild(insuranceError);
    genderMale.parentElement.appendChild(genderError);
    genderFemale.parentElement.appendChild(genderError);
    vaccinatedYes.parentElement.appendChild(vaccinatedError);
    vaccinatedNo.parentElement.appendChild(vaccinatedError);
    symptomsInput.parentElement.appendChild(symptomsError);

    // Attach event listeners for real-time validation
    insuranceYes.addEventListener("input", validateInsurance);
    insuranceNo.addEventListener("input", validateInsurance);

    genderMale.addEventListener("input", validateGender);
    genderFemale.addEventListener("input", validateGender);

    vaccinatedYes.addEventListener("input", validateVaccinated);
    vaccinatedNo.addEventListener("input", validateVaccinated);

    

    // Validate Insurance
    function validateInsurance() {
        insuranceError.textContent = ""; 

        if (!insuranceYes.checked && !insuranceNo.checked) {
            insuranceError.textContent = "Please select an option for Medical Insurance.";
            return false;
        }

        return true;
    }

    // Validate Gender
    function validateGender() {
        genderError.textContent = ""; 

        if (!genderMale.checked && !genderFemale.checked) {
            genderError.textContent = "Please select a gender.";
            return false;
        }

        return true;
    }

    // Validate Vaccination Status
    function validateVaccinated() {
        vaccinatedError.textContent = ""; 

        if (!vaccinatedYes.checked && !vaccinatedNo.checked) {
            vaccinatedError.textContent = "Please select your vaccination status.";
            return false;
        }

        return true;
    }

   
});

document.addEventListener("DOMContentLoaded", function () {
    const feelingSlider = document.getElementById("feeling-slider");
    const sliderValue = document.getElementById("slider-value");
    // Display current slider value
    feelingSlider.addEventListener("input", function () {
        sliderValue.textContent = feelingSlider.value;
        validateSlider();  // Validate the slider value on every input change
    });


    // Validate Slider (ensure value is within the range 1-10)
    function validateSlider() {
        const value = parseInt(feelingSlider.value, 10);
        if (value < 1 || value > 10) {
            sliderValue.textContent = "Invalid value!";
        } else {
            sliderValue.textContent = feelingSlider.value;
        }
    }

   
});

document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const userIdInput = document.getElementById("user-id");

    // On-the-fly validation for Password
    passwordInput.addEventListener("input", function () {
        validatePasswords();
    });

    // On-the-fly validation for Confirm Password
    confirmPasswordInput.addEventListener("input", function () {
        validatePasswords();
    });

    // On-the-fly validation for User ID
    userIdInput.addEventListener("input", function () {
        validateUserId();
    });

    function validatePasswords() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const userId = userIdInput.value.toLowerCase();
    
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_=+\\\/><.,`~]).{8,30}$/;
        let passwordValid = true;
        let confirmPasswordValid = true;
    
       
    
        // Check password format
        if (!regex.test(password)) {
            passwordValid = false;
            showError(passwordInput, "Password must contain 8-30 characters, including uppercase, lowercase, a number, and a special character.");
        } else {
            clearError(passwordInput);
        }
    
        // Check if password contains user ID or part of it
        const userIdParts = userId.split(/[^a-z0-9]/i); // Split by non-alphanumeric characters for broader matching
        if (userIdParts.some(part => part && password.toLowerCase().includes(part))) {
            passwordValid = false;
            showError(passwordInput, "Password cannot contain your User ID or part of it.");
        } else {
            clearError(passwordInput);
        }
    
        // Return the validity
        return passwordValid && confirmPasswordValid;
    }
    
    // Helper functions for showing and clearing errors
    function showError(input, message) {
        const errorSpan = input.nextElementSibling; // Assuming a span for error message exists next to input
        errorSpan.textContent = message;
        errorSpan.style.display = "inline";
    }
    
    function clearError(input) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = "";
        errorSpan.style.display = "none";
    }
    

    // User ID validation logic
    function validateUserId() {
        const userIdInput = document.getElementById("user-id");
        const errorElement = document.getElementById("user-id-error"); // Placeholder for error message
        let userId = userIdInput.value.trim();
    
        if (/^[a-z][a-z0-9_-]{4,29}$/i.test(userId)) {
            userId = userId.toLowerCase();
            userIdInput.value = userId;
            errorElement.textContent = ""; // Clear error
            return true;
        } else {
            errorElement.textContent = "Invalid User ID! Must be 5-30 characters, start with a letter, and contain only letters, numbers, underscores, or dashes.";
            return false;
        }
    }
    

    // Show error message next to input
    function showError(inputElement, message) {
        let errorSpan = inputElement.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            inputElement.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
    }

    // Clear error message
    function clearError(inputElement) {
        const errorSpan = inputElement.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error-message")) {
            errorSpan.textContent = "";
        }
    }
});

document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const passwordError = document.getElementById('password-error');

    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
    } else {
        passwordError.textContent = "";
    }
});

document.getElementById('confirm-password').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    const confirmPasswordError = document.getElementById('confirm-password-error');

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
    } else {
        confirmPasswordError.textContent = "";
    }
});
function validatePassword() {
    const password = document.getElementById('password');
    const message = document.getElementById('password-error');
    if (password.value.length < 8) {
        message.textContent = 'Password must be at least 8 characters long.';
    } else {
        message.textContent = '';
    }
}

function setCookie(name, value, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(name + "=") === 0) {
        return cookie.substring(name.length + 1);
      }
    }
    return "";
  }

function checkCookie() {
    console.log('working')
    const name = getCookie("firstname");
    console.log(name)
    if (name) {
      document.getElementById("welcome-message").innerHTML = `Welcome back, ${name}! &nbsp;<a role="button" href="#" onclick="startNewUser()">Click here to start new user</a>`;
      document.forms["registration-form"]["first-name"].value = name;
    }
    else{
        document.getElementById("welcome-message").innerHTML = `Welcome new user`;
        document.forms["registration-form"]["first-name"].value = ""
    }
  }

function validateConfirmPassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const message = document.getElementById('confirm-password-error');
    if (confirmPassword.value !== password.value) {
        message.textContent = 'Passwords do not match.';
    } else {
        message.textContent = '';
    }
}

function startNewUser(){
    // Set the cookie expiration date to a past date to delete it
    console.log("cookie removed")
    document.cookie = "firstname" + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    checkCookie()
}

function validateForm() {
    // event.preventDefault()
    console.log("here started")
    let checkbox = document.getElementById("Remember")
    console.log(checkbox)
    if (checkbox.checked) {
        console.log("working cookie")
        const firstName = document.getElementById("first-name").value
        setCookie("firstname",firstName,2)
    } 
    else{
        document.cookie = "firstname" + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
    if (
        validateFirstName() &&
        validateMiddleInitial() &&
        validateLastName() &&
        validateDOB() &&
        validateSSN() &&
        validatePhoneNumber() &&
        validateEmail() &&
        validateUserId() &&
        validateAddress1() &&
        validateAddress2() &&
        validateCity() &&
        validateState() &&
        validateZip() &&
        validateInsurance() &&
        validateGender() &&
        validateVaccinated() &&
        validateSlider() &&
        validatePassword() && 
        validateConfirmPassword()&&
        validateUserId()
    ) {
        // Redirect to the Thank You page
        window.location.href = "thankyou.html"; // Replace with your thank-you page URL
        return true;
    } else {
        alert("Check any errors before submitting.");
        return false;
    }
}


checkCookie()
