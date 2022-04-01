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
    let kurajle = 5;
    if (field.value.trim() === "") {
      this.setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be blank`,
        "error",
      );
      this.isValid = false;
    } else {
      this.setStatus(field, null, "success");
      this.isValid = true;
    }

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
    const errorMessage = field.parentElement.querySelector(".invalid-feedback");

    if (status === "success") {
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      field.parentElement
        .querySelector(".invalid-feedback")
        .classList.remove("show");
      field.classList.remove("input-error");
    }

    if (status === "error") {
      field.parentElement.querySelector(".invalid-feedback").innerText =
        message;
      field.parentElement
        .querySelector(".invalid-feedback")
        .classList.add("show");
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


// -------------------------------------------------------------------------------------------------------------

class FormWizard {
  constructor(prop_element = null, firstFields, prop_currentStepIdx = 0) {
    this.element = prop_element;
    this.steps = [...this.element.querySelectorAll(".js-step")];
    this.formControls = [...this.element.querySelectorAll(".js-form-control")];
    this.btnPrev = this.element.querySelector(".js-btn-prev");
    this.btnNext = this.element.querySelector(".js-btn-next");
    this.progressBar = this.element.querySelector(".js-progress-bar");
    this.currentStepIdx = prop_currentStepIdx;
    this.formButtons = this.element.querySelector("#form-buttons");
    this.btnSubmit = this.element.querySelector("#btn-submit");
    this.firstFields = firstFields;
    this.init();
  }

  init() {
    this.showStep(this.currentStepIdx);
    this.addEvents();
  }

  showStep(prop_stepIdx = 0) {
    const stepIdx = prop_stepIdx;

    this.steps[stepIdx].classList.add("is-active");
    this.btnPrev.classList[stepIdx === 0 ? "remove" : "add"]("is-active");
    this.formButtons.classList[stepIdx === 0 ? "remove" : "add"](
      "form-buttons-justify",
    );
    // this.btnNext.innerText = this.btnNext.dataset[stepIdx === this.steps.length - 1 ? 'finalStepText' : 'stepText'];
    if (stepIdx === this.steps.length - 1) {
      this.btnNext.classList.add("step");
      this.btnSubmit.classList.add("submit-active");
    } else {
      this.btnNext.classList.remove("step");
      this.btnSubmit.classList.remove("submit-active");
    }
  }

  prevNext(prop_value = 0) {
    const value = prop_value;

    if (value === 1 && !this.validate()) {
      return false;
    }

    this.steps[this.currentStepIdx].classList.remove("is-active");
    this.currentStepIdx += value;

    if (this.currentStepIdx >= this.steps.length) {
      this.element.submit();
      return false;
    }

    this.showStep(this.currentStepIdx);
  }

  validate() {
    const currentStepRequiredElements = [
      ...this.steps[this.currentStepIdx].querySelectorAll("[required]"),
    ];
    let valid = true;

    for (let element of currentStepRequiredElements) {
      if (element.value === null || element.value.trim() === "") {
        element.closest(".js-input-group").classList.add("has-error");
        valid = false;
      }
    }

    for (let field of this.firstFields) {
      if (field.id === "source_zip" || field.id === "destination_zip") {
        const re = /\b\d{5}\b/g;
        if (!re.test(field.value)) {
          valid = false;
        }
      }
    }
    for (let field of this.firstFields) {
      if (field.id === "move_date") {
        const re = /[0-9]{4}\-[0-9]{2}\-[0-9]{2}/g;
        if (!re.test(field.value)) {
          valid = false;
        }
      }
    }

    return valid;
  }

  clearErrors(e) {
    e.target.closest(".js-input-group").classList.remove("has-error");
  }

  updateProgressBar(prop_stepIdx = 0) {
    const percentage = prop_stepIdx / this.steps.length;

    this.progressBar.style.transform = `scaleX(${
      percentage === 0 ? "0.01" : percentage
    })`;
  }

  addEvents() {
    for (let formControl of this.formControls) {
      formControl.addEventListener("keyup", this.clearErrors.bind(this));
      formControl.addEventListener("change", this.clearErrors.bind(this));
    }

    this.btnPrev.addEventListener("click", this.prevNext.bind(this, -1));
    this.btnNext.addEventListener("click", this.prevNext.bind(this, 1));
  }
}

function FormWizardInit() {
    console.log("inititititi");

    window.formWizardObjs = {};
  const firstFields = [
    document.getElementById("first_name"),
    document.getElementById("source_zip"),
    document.getElementById("destination_zip"),
    document.getElementById("move_date"),
  ];
  const formWizards = [...document.querySelectorAll(".js-form-wizard")];

  if (formWizards.length) {
    for (let formWizard of formWizards) {
      formWizardObjs[formWizard.id] = new FormWizard(formWizard, firstFields);
    }
  }
}

if (document.readyState !== "loading") {
    console.log("document is already ready, just execute code here");
    myInitCode();
    FormWizardInit();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      console.log("document was not ready, place code here");
      myInitCode();
      FormWizardInit();
    });
  }