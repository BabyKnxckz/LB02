// read form element
let ALL_INPUT_VALID;

//fields from input form
const form = document.getElementById('form');
const userName = document.getElementById('userName');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const jobDescription = document.getElementById('jobDescription');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const companyName = document.getElementById('companyName');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
    ALL_INPUT_VALID = false; 
    // NEwLY oFFFF  ALL_INPUT_VALID = false;
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
      // NEWLY OFFFFF ALL_INPUT_VALID = false;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
        
    );
    ALL_INPUT_VALID = false; 

  } else if (input.value.length > max) {
    showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
    );
    ALL_INPUT_VALID = false; 

  } else {
    showSuccess(input);
  }
}

function checkPhone(input) {
  const re = /^(?:(?:|0{1,2}|\+{0,2})41(?:|\(0\))|0)([1-9]\d)(\d{3})(\d{2})(\d{2})$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Phonenumber is not valid');
    ALL_INPUT_VALID = false; 

  }
}
// Check Lastname is valid
function checkLastname(input) {
  const re = (/^[A-Za-z]+$/);
  if (re.test(input.value.trim())) {
    //showSuccess(input);
    checkLength(lastName, 3, 50);
  } else {
    showError(input, 'Lastname is not valid');
    ALL_INPUT_VALID = false; 

  }
}

// Check Firstname is valid
function checkFirstname(input) {
  const re = (/^[A-Za-z]+$/);
  if (re.test(input.value.trim())) {
    //showSuccess(input);
    checkLength(firstName, 2, 20);
  } else {
    showError(input, 'Firstname is not valid');
    ALL_INPUT_VALID = false; 

  }
}
function checkJobDescription(input) {
  const re = (/^[A-Za-z]+$/);
  if (re.test(input.value.trim())) {
    //showSuccess(input);
    checkLength(jobDescription, 8, 30);
  } else {
    showError(input, 'jobDescription is not valid');
    ALL_INPUT_VALID = false; 

  }
}

function checkUserName(input) {
  const re = (/^[A-Za-z\s]+$/);
  if (re.test(input.value.trim())) {
    //showSuccess(input);
    checkLength(userName, 4, 20)
  } else {
    showError(input, 'userName is not valid');
    ALL_INPUT_VALID = false; 

  }
}

function checkCompanyName(input) {
  const re = (/^[0-9a-zA-Z\s]+$/);
  if (re.test(input.value.trim())) {
    //showSuccess(input);
    checkLength(companyName, 2, 30);
  } else {
    showError(input, 'companyName is not valid');
    ALL_INPUT_VALID = false; 

  }
}

/**
 * Get fieldname
 * @param input: HTML-Element by its id
 * @returns {string}: Returns caption of the input field with first Letter in capital
 */
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

/**
 * Validate form input elements
 */
/* Aufgabe: Validieren Sie folgende Input-Elemente aus:
  lastName, jobDescription, phone
*/
//--Begin
function validateForm(){
  if(!checkRequired([email, firstName, lastName, jobDescription, userName, phone, companyName ])){
    // checkLength(userName, 4, 20);
    // checkLength(lastName, 3, 50);
    // checkLength(firstName, 2, 20);
    // checkLength(jobDescription, 8, 30);
    // checkLength(companyName, 2, 30);
    
    checkFirstname(firstName);
    checkLastname(lastName);
    checkEmail(email);
    checkPhone(phone);
    checkJobDescription(jobDescription);
    checkUserName(userName);
    checkCompanyName(companyName);
  }
}
//--End

/**
 * Make a testcall after the page is loaded
 */
window.onload = () => {
  console.log(`Make test call to the server ...`);
  getWelcome().then(
      result => {
        console.log(`Response from server: ${result}`);
      },
      error => {
        console.log(error)
      }
  );
};

/**
 * Event listener
 */
form.addEventListener('submit', function(e) {
  ALL_INPUT_VALID = true;
  e.preventDefault();
  validateForm();
  if (ALL_INPUT_VALID){
    
    let formData = {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        jobDescription: jobDescription.value,
        userName: userName.value,
        phone: phone.value,
        companyName: companyName.value
      }
    //--End

    console.log(`All input is valid. Send data to server: 
      ${JSON.stringify(formData)}`);

    //Variant 1
    //sendForm1(formData);

    //Variant 2
    sendForm2(formData).then(
        result => {
          console.log(`Response from server: ${result}`);
          window.location.href = './confirm.html';
        },
        error => {
          console.log(error);
        }
    );

  } else {
    console.log("At least one validation failed. No data sent to contact-server.")
  }

});
