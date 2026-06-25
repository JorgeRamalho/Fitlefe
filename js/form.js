/* ============================================
   FitLife — Form JavaScript
   Validação, máscaras e multi-step
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initFormSteps();
  initInputMasks();
  initFormValidation();
});

let currentStep = 1;
const totalSteps = 3;

/* Multi-step form navigation */
function initFormSteps() {
  const form = document.getElementById('fitlifeForm');
  if (!form) return;

  form.querySelectorAll('[data-next-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });
  });

  form.querySelectorAll('[data-prev-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  });
}

function goToStep(step) {
  if (step < 1 || step > totalSteps) return;

  const form = document.getElementById('fitlifeForm');
  const fieldsets = form.querySelectorAll('[data-form-step]');
  const progressSteps = document.querySelectorAll('.form__progress-step');

  fieldsets.forEach(fs => {
    fs.hidden = parseInt(fs.dataset.formStep, 10) !== step;
  });

  progressSteps.forEach(ps => {
    const psStep = parseInt(ps.dataset.step, 10);
    ps.classList.remove('form__progress-step--active', 'form__progress-step--completed');

    if (psStep < step) {
      ps.classList.add('form__progress-step--completed');
    } else if (psStep === step) {
      ps.classList.add('form__progress-step--active');
    }
  });

  currentStep = step;

  const cadastroSection = document.getElementById('cadastro');
  if (cadastroSection) {
    cadastroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* Input masks */
function initInputMasks() {
  const telefone = document.getElementById('telefone');
  const cpf = document.getElementById('cpf');
  const cep = document.getElementById('cep');

  if (telefone) {
    telefone.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length > 0) {
        value = `(${value}`;
      }

      e.target.value = value;
    });
  }

  if (cpf) {
    cpf.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 9) {
        value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
      } else if (value.length > 6) {
        value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
      } else if (value.length > 3) {
        value = `${value.slice(0, 3)}.${value.slice(3)}`;
      }

      e.target.value = value;
    });
  }

  if (cep) {
    cep.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 8) value = value.slice(0, 8);

      if (value.length > 5) {
        value = `${value.slice(0, 5)}-${value.slice(5)}`;
      }

      e.target.value = value;
    });
  }
}

/* Form validation */
function initFormValidation() {
  const form = document.getElementById('fitlifeForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateStep(currentStep)) return;

    const formData = collectFormData(form);
    console.log('📋 Dados do cadastro FitLife:', formData);

    form.style.display = 'none';
    document.getElementById('formSuccess').classList.add('form__success--visible');
  });

  form.querySelectorAll('.form__input, .form__select, .form__textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
}

function validateStep(step) {
  let isValid = true;

  switch (step) {
    case 1:
      isValid = validateField(document.getElementById('nome')) && isValid;
      isValid = validateField(document.getElementById('email')) && isValid;
      isValid = validateField(document.getElementById('telefone')) && isValid;
      isValid = validateField(document.getElementById('nascimento')) && isValid;
      isValid = validateField(document.getElementById('cpf')) && isValid;
      break;

    case 2:
      isValid = validateRadioGroup('objetivo', 'objetivoError') && isValid;
      isValid = validateField(document.getElementById('nivel')) && isValid;
      break;

    case 3:
      isValid = validateField(document.getElementById('plano')) && isValid;
      isValid = validateConsent() && isValid;
      break;
  }

  return isValid;
}

function validateField(field) {
  if (!field) return true;

  const errorEl = document.getElementById(`${field.id}Error`);
  let isValid = true;
  let message = '';

  if (field.required && !field.value.trim()) {
    isValid = false;
    message = 'Este campo é obrigatório';
  } else if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      message = 'Informe um e-mail válido';
    }
  } else if (field.id === 'telefone' && field.value) {
    const digits = field.value.replace(/\D/g, '');
    if (digits.length < 10) {
      isValid = false;
      message = 'Informe um telefone válido';
    }
  } else if (field.id === 'cpf' && field.value) {
    const digits = field.value.replace(/\D/g, '');
    if (digits.length !== 11) {
      isValid = false;
      message = 'Informe um CPF válido';
    }
  } else if (field.id === 'nascimento' && field.value) {
    const birth = new Date(field.value);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    if (age < 14 || age > 100) {
      isValid = false;
      message = 'Idade deve ser entre 14 e 100 anos';
    }
  }

  field.classList.toggle('form__input--error', !isValid);
  field.classList.toggle('form__select--error', !isValid && field.tagName === 'SELECT');

  if (errorEl) {
    errorEl.textContent = message || errorEl.textContent;
    errorEl.classList.toggle('form__error--visible', !isValid);
  }

  return isValid;
}

function validateRadioGroup(name, errorId) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  const errorEl = document.getElementById(errorId);

  if (!checked) {
    if (errorEl) errorEl.classList.add('form__error--visible');
    return false;
  }

  if (errorEl) errorEl.classList.remove('form__error--visible');
  return true;
}

function validateConsent() {
  const consent = document.getElementById('consentimento');
  const errorEl = document.getElementById('consentimentoError');

  if (!consent.checked) {
    if (errorEl) errorEl.classList.add('form__error--visible');
    return false;
  }

  if (errorEl) errorEl.classList.remove('form__error--visible');
  return true;
}

function clearFieldError(field) {
  field.classList.remove('form__input--error', 'form__select--error');
  const errorEl = document.getElementById(`${field.id}Error`);
  if (errorEl) errorEl.classList.remove('form__error--visible');
}

function collectFormData(form) {
  const data = {};
  const formElements = form.elements;

  for (const element of formElements) {
    if (!element.name) continue;

    if (element.type === 'checkbox') {
      if (element.name === 'modalidades') {
        if (!data.modalidades) data.modalidades = [];
        if (element.checked) data.modalidades.push(element.value);
      }
    } else if (element.type === 'radio') {
      if (element.checked) data[element.name] = element.value;
    } else if (element.type !== 'submit' && element.type !== 'button') {
      data[element.name] = element.value;
    }
  }

  if (data.peso && data.altura) {
    const alturaM = parseFloat(data.altura) / 100;
    const peso = parseFloat(data.peso);
    data.imc = (peso / (alturaM * alturaM)).toFixed(1);
  }

  data.dataCadastro = new Date().toISOString();

  return data;
}
