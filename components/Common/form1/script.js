class FormValidator {
    constructor(form, fields) {
      this.form = form;
      this.fields = fields;
      this.isValid = false;
    }
  
    initialize() {
      this.validateOnEntry();
      this.validateOnSubmit();
    }
  
    validateOnSubmit() {
      let self = this;
  
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        self.fields.forEach((field) => {
          const input = document.querySelector(`#${field}`);
          if (input != null) {
            self.validateFields(input);
          }
        });
        if (this.isValid) {
          this.sendData(this.form);
        }
      });
    }
  
    validateOnEntry() {
      let self = this;
      this.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (input != null) {
          input.addEventListener("input", (event) => {
            self.validateFields(input);
          });
        }
      });
    }
  
    validateFields(field) {
      // Check presence of values
      // if (field.value.trim() === "") {
      //   this.setStatus(
      //     field,
      //     `${field.previousElementSibling.innerText} cannot be blank`,
      //     "error"
      //   );
      //   this.isValid = false;
      // } else {
      //   this.setStatus(field, null, "success");
      //   this.isValid = true;
      // }
  
      // check for a valid email address
      if (field.type === "email") {
        const re = /\S+@\S+\.\S+/;
        if (re.test(field.value)) {
          this.setStatus(field, null, "success");
          this.isValid = true;
        } else {
          this.setStatus(field, "Please enter valid email address", "error");
          this.isValid = false;
        }
      }
  
      if (field.id === "source_zip" || field.id === "destination_zip") {
        const re = /\b\d{5}\b/g;
        if (re.test(field.value)) {
          this.setStatus(field, null, "success");
          this.isValid = true;
        } else {
          this.setStatus(field, "Please enter valid zip code", "error");
          this.isValid = false;
        }
      }
  
      if (field.id === "move_date") {
        const re = /[0-9]{4}\-[0-9]{2}\-[0-9]{2}/g;
        if (re.test(field.value)) {
          this.setStatus(field, null, "success");
          this.isValid = true;
        } else {
          this.setStatus(field, "Please enter move date", "error");
          this.isValid = false;
        }
      }
  
      if (field.id === "phone") {
        const re = /\([0-9]{3}\) [0-9]{3}\-[0-9]{4}/g;
        if (re.test(field.value)) {
          this.setStatus(field, null, "success");
          this.isValid = true;
        } else {
          this.setStatus(field, "Please enter valid phone number", "error");
          this.isValid = false;
        }
      }
      if (field.id === "move_size_id") {
        if (field.value != "default") {
          this.setStatus(field, null, "success");
          this.isValid = true;
        } else {
          this.setStatus(field, "Please select size of move", "error");
          this.isValid = false;
        }
      }
    }
  
    setStatus(field, message, status) {
      // const errorMessage = field.parentElement.querySelector(".invalid-feedback");
  
      if (status === "success") {
        // if (errorMessage) {
        //   errorMessage.innerText = "";
        // }
        // field.parentElement
        //   .querySelector(".invalid-feedback")
        //   .classList.remove("show");
        field.classList.remove("input-error");
      }
  
      if (status === "error") {
        // field.parentElement.querySelector(".invalid-feedback").innerText =
        //   message;
        // field.parentElement
        //   .querySelector(".invalid-feedback")
        //   .classList.add("show");
        field.classList.add("input-error");
      }
    }
    sendData(form) {
      let self = this;
  
      let data = new FormData(form);
      const sendUrl = 'https://api.mod24.com/api/v1/quotes';
      const redirectUrl = '/thank-you';
  
      var mydate = new Date(form.move_date.value);
      let year = mydate.getFullYear();
      let month = (1 + mydate.getMonth()).toString().padStart(2, "0");
      let day = mydate.getDate().toString().padStart(2, "0");
      mydate = month + "/" + day + "/" + year;
  
      data.set("move_date", mydate);
  
      const XHR = new XMLHttpRequest();
  
  
      // Define what happens on successful data submission
      XHR.addEventListener("load", function (event) {   
        console.log(...data);
        window.location.replace(redirectUrl);
      });
  
      // Define what happens in case of error
      XHR.addEventListener("error", function (event) {
        alert("Oops! Something went wrong. Refresh the page and try again");
      });
  
      // Set up our request
      XHR.open("POST", sendUrl);
  
      // The data sent is what the user provided in the form
      XHR.send(data);
    }
  }
  
  
  function myInitCode() {
       const form = document.querySelector("#free-quote-form");
    const fields = [
      "first_name",
      "last_name",
      "source_zip",
      "destination_zip",
      "move_date",
      "phone",
      "email",
      "move_size_id",
    ];
  console.log("Santa Monica Movers");
    document.getElementById("phone").addEventListener("input", function (e) {
      var x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    });
  
    const validator = new FormValidator(form, fields);
    validator.initialize();
  }
  if( document.readyState !== 'loading' ) {
      console.log( 'document is already ready, just execute code here' );
      myInitCode();
  } else {
      document.addEventListener('DOMContentLoaded', function () {
          console.log( 'document was not ready, place code here' );
          myInitCode();
      });
  }
  