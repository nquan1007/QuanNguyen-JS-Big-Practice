/**
 * Check if the value of that element is blank or not
 * @param {DOM} element 
 * @returns {Boolean}
 */
const isBlank = (element) => {
  return element.value === '' ? true : false;
}

/**
 * Pass the Nodelist of form's input boxes to validate whether the input box is blank or not
 * If the input box is blank, its border is red and the invalid message appears
 * Otherwise, its border is green and there is no invalid message
 * @param {NodeList} formInputBoxes 
 */
const formBlankValidate = (formInputBoxes) => {
  formInputBoxes.forEach(inputBox => {
    const formGroup = inputBox.parentElement;
    const invalidMessage = formGroup.querySelector('.index-form-message');
    inputBox.addEventListener('focusout', () => {
      if (isBlank(inputBox)) {
        invalidMessage.innerHTML = ('This field cannot be blank');
        inputBox.classList.add('error');
        inputBox.classList.remove('success');
      } else {
        invalidMessage.innerHTML = '';
        inputBox.classList.add('success');
        inputBox.classList.remove('error');
      };
    });
  });
}

export { formBlankValidate }