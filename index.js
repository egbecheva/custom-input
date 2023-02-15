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

const displayedOptions = Array.from(
  document.querySelectorAll('.displayed', console.log())
);

//Handle arrow keys
const handleArrowKeys = () => {
  let firsAvailableIndex = optionsArrayLength - MAX_OPTIONS;
  let i = firsAvailableIndex;
  console.log('displayedOptions', displayedOptions);

  document.onkeydown = (event) => {
    let selectedValue = finalDropdownOptions[firsAvailableIndex];
    if (event.key === 'ArrowUp') {
      console.log('up');
      i = i - 1;
      console.log('i', i);

      selectedValue = finalDropdownOptions[i];
      input.value = selectedValue;
    }
    if (event.key === 'ArrowDown') {
      console.log('down');

      i = i + 1;
      console.log('i', i);

      selectedValue = finalDropdownOptions[i];
      input.value = selectedValue;
    }
  };
};

input.addEventListener('focus', () => handleArrowKeys());
