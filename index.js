const optionsArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];
const optionsArrayLength = optionsArray.length;

const MAX_OPTIONS = 10;
const input = document.getElementById('inputField');
const dropdownContent = document.getElementById('dropdown-content');

let finalDropdownOptions = [];

//Map through all items and render only the last ten of them
let listItems = optionsArray.map((element, index) => {
  let lastItems = optionsArrayLength - index;
  if (lastItems <= MAX_OPTIONS) {
    finalDropdownOptions = [
      ...finalDropdownOptions,
      `<li value=${element} class="displayed dropdown-item"> ${element} </li>`,
    ];
  }
  if (lastItems > MAX_OPTIONS) {
    finalDropdownOptions = [
      ...finalDropdownOptions,
      `<li value=${element} class="not-displayed dropdown-item"> ${element} </li>`,
    ];
  }

  return finalDropdownOptions;
});

const htmlList = finalDropdownOptions.join('');
const appendInputOptions = (arr) => {
  dropdownContent.innerHTML += arr;
};

//Add options to html file
appendInputOptions(htmlList);

//Update input value with the selected one from the dropdown list
const handleMouseOver = (element, i, arr) => {
  let selectedValue = element.getAttribute('value');
  input.value = selectedValue;
};
const dropdownList = document.querySelectorAll('.dropdown-item');

dropdownList.forEach((element, i, arr) =>
  element.addEventListener('mouseover', () => handleMouseOver(element, i, arr))
);

const displayedOptions = Array.from(document.querySelectorAll('.displayed'));

let stringToHTML = (str) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  return doc.body.firstChild;
};

//Handle arrow keys
const handleArrowKeys = () => {
  let firsAvailableIndex = optionsArrayLength - MAX_OPTIONS - 1;
  let i = firsAvailableIndex;
  let selectedValue = stringToHTML(
    finalDropdownOptions[firsAvailableIndex]
  ).getAttribute('value');

  document.onkeydown = (event) => {
    if (event.key === 'ArrowUp' && i > 0) {
      i = i - 1;

      selectedValue = stringToHTML(finalDropdownOptions[i]).getAttribute(
        'value'
      );
      input.value = selectedValue;
    }
    if (event.key === 'ArrowDown' && i < optionsArrayLength - 1) {
      i = i + 1;
      selectedValue = stringToHTML(finalDropdownOptions[i]).getAttribute(
        'value'
      );
      input.value = selectedValue;
    }
  };
};

input.addEventListener('focus', () => handleArrowKeys());
