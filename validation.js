(function () {
  function applyCommonLanguage(lang) {
    const safeLang = lang === "en" ? "en" : "es";

    document.querySelectorAll("[data-es][data-en]").forEach((el) => {
      const target = el.getAttribute(`data-${safeLang}`);
      if (target === null) return;

      if (el.hasAttribute("data-ph-es") && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) {
        el.setAttribute("placeholder", target);
      } else if (el.tagName === "OPTION") {
        el.textContent = target;
      } else {
        el.innerHTML = target;
      }
    });

    document.querySelectorAll("[data-ph-es]").forEach((el) => {
      const ph = el.getAttribute(`data-ph-${safeLang}`);
      if (ph !== null) {
        el.setAttribute("placeholder", ph);
      }
    });

    const btnLangEn = document.getElementById("btn-lang-en");
    const btnLangEs = document.getElementById("btn-lang-es");
    const mobLangEn = document.getElementById("mob-lang-en");
    const mobLangEs = document.getElementById("mob-lang-es");

    if (btnLangEn && btnLangEs) {
      btnLangEn.className = "px-3 py-1 rounded-full text-sm font-bold transition-all text-gray-500 hover:text-primary-400";
      btnLangEs.className = "px-3 py-1 rounded-full text-sm font-bold transition-all text-gray-500 hover:text-primary-400";
      (safeLang === "en" ? btnLangEn : btnLangEs).className =
        "px-3 py-1 rounded-full text-sm font-bold transition-all bg-primary-400 text-white shadow-md";
    }

    if (mobLangEn && mobLangEs) {
      mobLangEn.className = "px-6 py-2 rounded-full font-bold text-white/70 hover:text-white";
      mobLangEs.className = "px-6 py-2 rounded-full font-bold text-white/70 hover:text-white";
      (safeLang === "en" ? mobLangEn : mobLangEs).className =
        "px-6 py-2 rounded-full font-bold bg-primary-400 text-white shadow-md";
    }

    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");

    if (btnEs && btnEn) {
      if (safeLang === "es") {
        btnEs.classList.add("bg-brand-500", "text-white", "shadow-sm");
        btnEs.classList.remove("bg-slate-200", "text-slate-600");
        btnEn.classList.add("bg-slate-200", "text-slate-600");
        btnEn.classList.remove("bg-brand-500", "text-white", "shadow-sm");
      } else {
        btnEn.classList.add("bg-brand-500", "text-white", "shadow-sm");
        btnEn.classList.remove("bg-slate-200", "text-slate-600");
        btnEs.classList.add("bg-slate-200", "text-slate-600");
        btnEs.classList.remove("bg-brand-500", "text-white", "shadow-sm");
      }
    }

    document.documentElement.lang = safeLang;
    localStorage.setItem("healthcore_lang", safeLang);
  }

  window.setLanguage = function setLanguage(lang) {
    applyCommonLanguage(lang);
  };

  window.changeLanguage = function changeLanguage(lang) {
    applyCommonLanguage(lang);
    if (typeof window.validateFormForApplication === "function") {
      window.validateFormForApplication(false);
    }
  };

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  window.closeMobileMenu = function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove("open");
  };

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("open");
    });
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", window.closeMobileMenu);
  }

  window.navigate = function navigate(view) {
    if (view === "landing") {
      window.location.hash = "landing";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  window.scrollToSection = function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const form = document.getElementById("patient-form");
  const savedLang = localStorage.getItem("healthcore_lang") || "es";
  applyCommonLanguage(savedLang);

  if (!form) {
    return;
  }

  const viewForm = document.getElementById("view-application");
  const viewSuccess = document.getElementById("success-container");
  const submitButton = document.getElementById("submit-button");
  const submitText = document.getElementById("submit_btn_text");

  const firstNameInput = document.getElementById("first_name");
  const lastNameInput = document.getElementById("last_name");
  const dobInput = document.getElementById("date_of_birth");
  const languageInput = document.getElementById("preferred_language");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const clinicInput = document.getElementById("preferred_clinic");
  const serviceInput = document.getElementById("service_type");
  const preferredDateInput = document.getElementById("preferred_date");
  const preferredTimeInput = document.getElementById("preferred_time");
  const insuranceProviderInput = document.getElementById("insurance_provider");
  const insuranceMemberIdInput = document.getElementById("insurance_member_id");
  const healthConcernInput = document.getElementById("health_concern");
  const consentInput = document.getElementById("contact_consent");
  const charCount = document.getElementById("char_count");

  const errorDict = {
    es: {
      err_fname: "El nombre debe contener solo letras y tener al menos 2 caracteres",
      err_lname: "El apellido debe contener solo letras y tener al menos 2 caracteres",
      err_dob: "Ingresa una fecha de nacimiento valida. El paciente debe tener entre 0 y 120 anos",
      err_email: "Ingresa un correo electronico valido (ejemplo: nombre@proveedor.com)",
      err_phone: "El telefono debe incluir un codigo de pais (ejemplo: +1 305 555 0191)",
      err_lang: "Selecciona tu idioma preferido",
      err_clinic: "Selecciona la clinica que te gustaria visitar",
      err_date: "Selecciona una fecha valida. No se permiten fechas pasadas",
      err_time: "Selecciona tu franja horaria preferida",
      err_service: "Selecciona el tipo de atencion que estas buscando",
      err_service_paediatric: "Pediatrics esta disponible para pacientes menores de 18 anos. Revisa la fecha de nacimiento o selecciona otro servicio.",
      err_new_patient: "Indica si esta es tu primera visita a HealthCore",
      err_has_ins: "Indica si tienes seguro medico",
      err_ins_prov: "Ingresa el nombre de tu aseguradora",
      err_ins_id: "El ID de afiliado debe tener entre 6 y 20 caracteres alfanumericos",
      err_health_concern: "Describe tu consulta medica en al menos 20 caracteres",
      err_consent: "Debes dar tu consentimiento para ser contactado antes de enviar este formulario"
    },
    en: {
      err_fname: "First name must contain only letters and have at least 2 characters",
      err_lname: "Last name must contain only letters and have at least 2 characters",
      err_dob: "Enter a valid date of birth. Patient must be between 0 and 120 years old",
      err_email: "Enter a valid email (e.g. name@provider.com)",
      err_phone: "Phone must include country code (e.g. +1 305 555 0191)",
      err_lang: "Select your preferred language",
      err_clinic: "Select the clinic you would like to visit",
      err_date: "Select a valid date. Past dates are not allowed",
      err_time: "Select your preferred time slot",
      err_service: "Select the type of care you are looking for",
      err_service_paediatric: "Pediatrics is available for patients under 18. Check date of birth or select a different service.",
      err_new_patient: "Indicate if this is your first visit to HealthCore",
      err_has_ins: "Indicate if you have health insurance",
      err_ins_prov: "Enter the name of your insurance provider",
      err_ins_id: "Member ID must be between 6 and 20 alphanumeric characters",
      err_health_concern: "Describe your health concern in at least 20 characters",
      err_consent: "You must consent to be contacted before submitting this form"
    }
  };

  function getLang() {
    return document.documentElement.lang === "en" ? "en" : "es";
  }

  function t(key) {
    return errorDict[getLang()][key];
  }

  function stripToDigits(text) {
    return (text || "").replace(/\D/g, "");
  }

  function getSelectedValue(name) {
    const selected = form.querySelector(`input[name='${name}']:checked`);
    return selected ? selected.value : "";
  }

  function calculateAge(dateText) {
    const birthDate = new Date(dateText);
    if (Number.isNaN(birthDate.getTime())) return -1;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }

    return age;
  }

  function normalizeStartOfDay(dateLike) {
    const d = new Date(dateLike);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function validateName(input, errorKey) {
    if (!input) return true;

    const value = input.value.trim();
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;
    const valid = regex.test(value);

    input.setCustomValidity(valid ? "" : t(errorKey));
    return valid;
  }

  function validateDob() {
    if (!dobInput) return true;

    const value = dobInput.value;
    const age = calculateAge(value);
    const valid = value && age >= 0 && age <= 120;

    dobInput.setCustomValidity(valid ? "" : t("err_dob"));
    return valid;
  }

  function validateEmail() {
    if (!emailInput) return true;

    const value = emailInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

    emailInput.setCustomValidity(valid ? "" : t("err_email"));
    return valid;
  }

  function validatePhone() {
    if (!phoneInput) return true;

    const value = phoneInput.value.trim();
    const digits = stripToDigits(value);
    const valid = /^\+/.test(value) && digits.length >= 8 && digits.length <= 15;

    phoneInput.setCustomValidity(valid ? "" : t("err_phone"));
    return valid;
  }

  function validateSelect(input, errorKey) {
    if (!input) return true;
    const valid = input.value.trim() !== "";
    input.setCustomValidity(valid ? "" : t(errorKey));
    return valid;
  }

  function validatePreferredDate() {
    if (!preferredDateInput) return true;

    const value = preferredDateInput.value;
    if (!value) {
      preferredDateInput.setCustomValidity(t("err_date"));
      return false;
    }

    const selectedDate = normalizeStartOfDay(value);
    const today = normalizeStartOfDay(new Date());
    const valid = selectedDate >= today;
    preferredDateInput.setCustomValidity(valid ? "" : t("err_date"));
    return valid;
  }

  function validateRadioGroup(name, errorKey) {
    const radios = form.querySelectorAll(`input[name='${name}']`);
    const isSelected = !!form.querySelector(`input[name='${name}']:checked`);

    radios.forEach((radio) => {
      radio.setCustomValidity(isSelected ? "" : t(errorKey));
    });

    return isSelected;
  }

  function validateInsuranceFields() {
    const hasInsurance = getSelectedValue("has_insurance") === "Yes";

    if (!hasInsurance) {
      if (insuranceProviderInput) insuranceProviderInput.setCustomValidity("");
      if (insuranceMemberIdInput) insuranceMemberIdInput.setCustomValidity("");
      return true;
    }

    const providerValid = insuranceProviderInput && insuranceProviderInput.value.trim().length >= 2;
    const memberValid = insuranceMemberIdInput && /^[A-Za-z0-9-]{6,20}$/.test(insuranceMemberIdInput.value.trim());

    if (insuranceProviderInput) {
      insuranceProviderInput.setCustomValidity(providerValid ? "" : t("err_ins_prov"));
    }

    if (insuranceMemberIdInput) {
      insuranceMemberIdInput.setCustomValidity(memberValid ? "" : t("err_ins_id"));
    }

    return !!providerValid && !!memberValid;
  }

  function validateHealthConcern() {
    if (!healthConcernInput) return true;

    const valid = healthConcernInput.value.trim().length >= 20;
    healthConcernInput.setCustomValidity(valid ? "" : t("err_health_concern"));
    return valid;
  }

  function validateConsent() {
    if (!consentInput) return true;

    const valid = consentInput.checked;
    consentInput.setCustomValidity(valid ? "" : t("err_consent"));
    return valid;
  }

  function validatePediatricsRule() {
    if (!serviceInput || !dobInput) return true;

    const service = serviceInput.value;
    const age = calculateAge(dobInput.value);

    if (service === "Pediatrics" && age >= 18) {
      serviceInput.setCustomValidity(t("err_service_paediatric"));
      return false;
    }

    if (serviceInput.validationMessage === t("err_service_paediatric")) {
      serviceInput.setCustomValidity("");
    }

    return true;
  }

  function setDateConstraints() {
    if (!preferredDateInput) return;

    const today = normalizeStartOfDay(new Date());
    preferredDateInput.min = today.toISOString().split("T")[0];
    preferredDateInput.removeAttribute("max");
  }

  function updateCharCounter() {
    if (!healthConcernInput || !charCount) return;

    const currentLength = healthConcernInput.value.length;
    charCount.textContent = String(currentLength);

    if (currentLength > 450) {
      charCount.classList.remove("text-brand-500");
      charCount.classList.add("text-rose-500");
    } else {
      charCount.classList.add("text-brand-500");
      charCount.classList.remove("text-rose-500");
    }
  }

  function validateForm(showMessages) {
    const checks = [
      validateName(firstNameInput, "err_fname"),
      validateName(lastNameInput, "err_lname"),
      validateDob(),
      validateSelect(languageInput, "err_lang"),
      validateEmail(),
      validatePhone(),
      validateSelect(clinicInput, "err_clinic"),
      validateSelect(serviceInput, "err_service"),
      validatePreferredDate(),
      validateSelect(preferredTimeInput, "err_time"),
      validateRadioGroup("new_patient", "err_new_patient"),
      validateRadioGroup("has_insurance", "err_has_ins"),
      validateInsuranceFields(),
      validateHealthConcern(),
      validateConsent(),
      validatePediatricsRule()
    ];

    const isValid = checks.every(Boolean);

    if (showMessages && !isValid) {
      form.reportValidity();
    }

    return isValid;
  }

  window.validateFormForApplication = validateForm;

  window.togglePatientId = function togglePatientId(val) {
    const container = document.getElementById("patient_id_container");
    const input = document.getElementById("patient_id");

    if (!container || !input) return;

    if (val === "No") {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
      input.value = "";
    }

    validateForm(false);
  };

  window.toggleInsurance = function toggleInsurance(val) {
    const container = document.getElementById("insurance_details");
    if (!container || !insuranceProviderInput || !insuranceMemberIdInput) return;

    if (val === "Yes") {
      container.classList.remove("hidden");
    } else {
      container.classList.add("hidden");
      insuranceProviderInput.value = "";
      insuranceMemberIdInput.value = "";
    }

    validateForm(false);
  };

  window.resetForm = function resetForm() {
    form.reset();

    const patientIdContainer = document.getElementById("patient_id_container");
    const insuranceDetails = document.getElementById("insurance_details");

    if (patientIdContainer) patientIdContainer.classList.add("hidden");
    if (insuranceDetails) insuranceDetails.classList.add("hidden");

    if (viewSuccess) viewSuccess.classList.add("hidden");
    if (viewForm) viewForm.classList.remove("hidden");

    updateCharCounter();
    validateForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function handleSubmit(event) {
    event.preventDefault();

    const valid = validateForm(true);
    if (!valid) return;

    if (!submitButton || !submitText) return;

    const lang = getLang();
    const previousLabel = submitText.textContent;

    submitButton.disabled = true;
    submitButton.innerHTML = `<span id="submit_btn_text">${lang === "es" ? "Enviando..." : "Sending..."}</span><span class="animate-spin text-2xl">⏳</span>`;

    setTimeout(() => {
      if (viewForm) viewForm.classList.add("hidden");
      if (viewSuccess) viewSuccess.classList.remove("hidden");

      submitButton.innerHTML = `<span id="submit_btn_text" data-es="Enviar Solicitud de Cita" data-en="Submit Appointment Request">${previousLabel}</span><span class="text-2xl">🚀</span>`;
      validateForm(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  }

  function bindLiveValidation() {
    const controls = form.querySelectorAll("input, select, textarea");
    controls.forEach((control) => {
      control.addEventListener("input", () => {
        updateCharCounter();
        validateForm(false);
      });

      control.addEventListener("change", () => {
        updateCharCounter();
        validateForm(false);
      });

      control.addEventListener("blur", () => {
        validateForm(false);
      });
    });
  }

  setDateConstraints();
  bindLiveValidation();
  form.addEventListener("submit", handleSubmit);

  updateCharCounter();
  validateForm(false);
})();
