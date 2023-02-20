const optionsArray = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  'baba',
  28,
  29,
  30,
];

const optionsArrayLength = optionsArray.length;

const MAX_OPTIONS = 10;
const input = document.getElementById('inputField');
const dropdownContent = document.getElementById('dropdown-content');
let firsAvailableIndex = optionsArrayLength - MAX_OPTIONS;

let finalDropdownOptions = [];
let stringToHTML = (str) => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  return doc.body.firstChild;
};

//Map through all items and render only the last ten of them
let selected = '';
let renderList = (selected) =>
  optionsArray.map((element, index) => {
    let lastItems = optionsArrayLength - index;
    if (lastItems <= MAX_OPTIONS) {
      finalDropdownOptions = [
        ...finalDropdownOptions,
        `<li value=${element}    class="displayed dropdown-item ${
          selected.toString() === element.toString()
            ? 'highlighted style="background-color:blue"'
            : ''
        }"> ${element}</li>`,
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

renderList(selected);

const htmlList = finalDropdownOptions.join('');
const appendInputOptions = (arr) => {
  dropdownContent.innerHTML += arr;
};

//Add options to html file
appendInputOptions(htmlList);

//Update input value with the selected one from the dropdown list
const handleMouseOver = (element) => {
  let selectedValue = element.getAttribute('value');
  input.value = selectedValue;
};
const dropdownList = document.querySelectorAll('.dropdown-item');

dropdownList.forEach((element, i, arr) =>
  element.addEventListener('mouseover', () => handleMouseOver(element, i, arr))
);

const displayedOptions = Array.from(document.querySelectorAll('.displayed'));

//Highlight and update input field with the selected value
const highlighter = (selectedValue, i, focusedOut) => {
  selectedValue = stringToHTML(finalDropdownOptions[i]).getAttribute('value');
  if (focusedOut === false) {
    input.value = selectedValue;
  }
  finalDropdownOptions = [];
  document.querySelectorAll('.dropdown-item').forEach((e) => e.remove());
  selected = selectedValue;
  renderList(selected);
  const htmlList = finalDropdownOptions.join('');
  appendInputOptions(htmlList);
};

//Handle arrow keys
const handleArrowKeys = () => {
  //Highlight the top element from dropdown once the input has been focused
  let i = firsAvailableIndex;
  let selectedValue = finalDropdownOptions[i];
  highlighter(selectedValue, i, false);

  //Handle arrow keys
  document.onkeydown = (event) => {
    if (event.key === 'ArrowUp' && i > 0) {
      i = i - 1;
      highlighter(selectedValue, i, false);
    }
    if (event.key === 'ArrowDown' && i < optionsArrayLength - 1) {
      i = i + 1;
      highlighter(selectedValue, i, false);
    }
  };
};
console.log('called from magic function', finalDropdownOptions);
console.log('li', document.querySelectorAll('.dropdown-item'));

input.addEventListener('focusin', () => handleArrowKeys());
// input.addEventListener('focusout', () => {
//   highlighter('', 0, true);
// });
