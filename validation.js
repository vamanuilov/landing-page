import { isNotEmpty } from './dynamicProgress.js'

const nameRegex = /^[a-zA-Zа-яА-Я-]{1,52}$/
const textRegex = /^[a-zA-Zа-яА-Я-\s]{1,52}$/
const dateRegex = /^(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})*$/

export const showErrorLabel = (elementId) => {
  document.getElementById(elementId).classList.add('error')
  document.querySelector(`label[for="${elementId}"]`).classList.add('label-error')
}

export const hideErrorLabel = (elementId) => {
  document.getElementById(elementId).classList.remove('error')
  document.querySelector(`label[for="${elementId}"]`).classList.remove('label-error')
}

document.getElementById('formUsername').addEventListener('change', (inputElement) => {
  if (!nameRegex.test(inputElement.target.value)) {
    showErrorLabel(inputElement.target.id)
  }
})

document.getElementById('formUsername').addEventListener('input', (inputElement) => {
  if (inputElement.target.classList.contains('error') && nameRegex.test(inputElement.target.value)) {
    hideErrorLabel(inputElement.target.id)
  }
})

document
  .querySelector('.form-additional-info')
  .querySelectorAll('input[type=text]')
  .forEach((el) => {
    el.addEventListener('change', (inputElement) => {
      if (!textRegex.test(inputElement.target.value)) {
        showErrorLabel(inputElement.target.id)
      }
    })

    el.addEventListener('input', (inputElement) => {
      if (inputElement.target.classList.contains('error') && textRegex.test(inputElement.target.value)) {
        hideErrorLabel(inputElement.target.id)
      }
    })
  })

document.getElementById('formDate').addEventListener('blur', (inputElement) => {
  const inputDate = new Date(inputElement.target.value).toLocaleDateString('ru-RU')

  if (!dateRegex.test(inputDate)) {
    showErrorLabel(inputElement.target.id)
  }
})

document.getElementById('formDate').addEventListener('input', (inputElement) => {
  const inputDate = new Date(inputElement.target.value).toLocaleDateString('ru-RU')

  if (inputElement.target.classList.contains('error') && dateRegex.test(inputDate)) {
    hideErrorLabel(inputElement.target.id)
  }
})

document.getElementById('userInfoSubmit').addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()
  const completeBlock = document.getElementById('completeBlockWrap')
  const userFormSubmitBtn = document.getElementById('userInfoSubmit')

  const isTextNotEmpty = [...document.getElementById('userForm').querySelectorAll('input[type=text]')].reduce(
    (acc, element) => {
      const { value, id } = element

      if (!isNotEmpty(value)) {
        showErrorLabel(id)
      }
      return acc && isNotEmpty(value)
    },
    true
  )
  // TODO: move dom appeals to top
  const isDateNotEmpty = isNotEmpty(document.getElementById('formDate').value)

  if (!isDateNotEmpty) {
    showErrorLabel(document.getElementById('formDate').id)
  }

  const isSelectNotEmpty = isNotEmpty(document.getElementById('formUserGender').value)

  if (!isSelectNotEmpty) {
    showErrorLabel(document.getElementById('formUserGender').id)
  }

  const isFileNotEmpty = isNotEmpty(document.getElementById('fileUpload').value)
  if (!isFileNotEmpty) {
    showErrorLabel(document.getElementById('fileUpload').id)
  }

  if (isFileNotEmpty && isSelectNotEmpty && isDateNotEmpty && isTextNotEmpty) {
    // TODO: add check for valid values or disable button in every check if not disabled
    completeBlock.classList.remove('hidden')
    userFormSubmitBtn.disabled = true
  }
})
