export const getElementById = (selector) => {
  return document.getElementById(selector);
}

export const querySelector = (selector) => {
  return document.querySelector(selector);
}

export const createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  return element;
}