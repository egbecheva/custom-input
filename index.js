const optionsArray = [
  'A - Alpha',
  'B - Bravo',
  'C - Charlie',
  'D - Delta',
  'E - Echo',
  'F - Foxtrot',
  'G - Golf	',
  'H - Hotel',
  'I - India',
  'J - Juliet',
  'K - Kilo',
  'L - Lima',
  'M - Mike',
  'N - November',
  'O - Oscar',
  'P - Papa',
  'Q - Quebec',
  'R - Romeo',
  'S - Sierra',
  'T - Tango',
  'U - Uniform',
  'V - Victor',
  'W - Whiskey',
  'X - X-ray',
  'Y - Yankee',
  'Z - Zulu',
  '9 - Niner',
];

const optionsArrayLength = optionsArray.length;

const OPTIONS = 10;
let MIN_INDEX = optionsArrayLength - OPTIONS;
let MAX_INDEX = MIN_INDEX + OPTIONS;
let initialMinIndex = MIN_INDEX;
const input = document.getElementById('inputField');
const dropdownContent = document.getElementById('dropdown-content');
let i = MIN_INDEX;
let lastItems;

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
    lastItems = optionsArray.slice(MIN_INDEX, MAX_INDEX);
    if (index >= MIN_INDEX && index <= MAX_INDEX) {
      finalDropdownOptions = [
        ...finalDropdownOptions,
        `<li value="${element}" class="displayed dropdown-item ${
          selected.toString() === element.toString() ? 'highlighted' : ''
        }"> ${element}</li>`,
      ];
    }
    if (index < MIN_INDEX) {
      finalDropdownOptions = [
        ...finalDropdownOptions,
        `<li value="${element}" class="not-displayed dropdown-item"> ${element} </li>`,
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
  let selectedValue = finalDropdownOptions[i];
  console.log('selectedValue', selectedValue);
  highlighter(selectedValue, i, false);

  const dropDownMinValues = () => {
    if (optionsArrayLength - i < OPTIONS) {
      MIN_INDEX = initialMinIndex;
    } else {
      MIN_INDEX = i;
    }

    return MIN_INDEX;
  };
  //Handle arrow keys
  document.onkeydown = (event) => {
    if (event.key === 'ArrowUp' && i > 0) {
      i = i - 1;
      dropDownMinValues();
      MAX_INDEX = MIN_INDEX + OPTIONS;
      highlighter(selectedValue, i, false);
    }
    if (event.key === 'ArrowDown' && i < optionsArrayLength - 1) {
      i = i + 1;
      dropDownMinValues();
      MAX_INDEX = i + OPTIONS;
      highlighter(selectedValue, i, false);
    }
  };
};

input.addEventListener('focusin', () => handleArrowKeys());
input.addEventListener('focusout', () => {
  highlighter('', 0, true);
});
