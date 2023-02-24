const optionsArray = [
  'A - Alpha',
  'B - Bravo',
  'C - Charlie',
  'D - Delta',
  'E - Echo',
  'F - Foxtrot',
  'G - Golf',
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
let CURRENT_INDEX = MIN_INDEX;
let initialMinIndex = MIN_INDEX;
const input = document.getElementById('inputField');
const dropdownContent = document.getElementById('dropdown-content');
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
        `<li value="${element}" class="displayed dropdown-item  ${
          selected.toString().replace(/\s/g, '') ===
          element.toString().replace(/\s/g, '')
            ? 'highlighted'
            : ''
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

//Update input value with the one hovered over from the dropdown list
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
const highlighter = (selectedValue, i, isFocusedOut) => {
  finalDropdownOptions[i] = options[i];
  selectedValue = options[i].textContent;
  if (isFocusedOut === false) {
    input.value = selectedValue;
  }
  finalDropdownOptions = [];
  document.querySelectorAll('.dropdown-item').forEach((e) => e.remove());
  renderList(selectedValue);
  const htmlList = finalDropdownOptions.join('');
  appendInputOptions(htmlList);
};

//Handle arrow keys
const handleArrowKeys = () => {
  //Highlight the top element from dropdown once the input has been focused
  let selectedValue = finalDropdownOptions[CURRENT_INDEX];
  highlighter(selectedValue, CURRENT_INDEX, false);

  //Calculate the minimal index for the element to be shown on the dropdownlist
  const dropDownMinValues = () => {
    if (optionsArrayLength - CURRENT_INDEX < OPTIONS) {
      MIN_INDEX = initialMinIndex;
    } else {
      MIN_INDEX = CURRENT_INDEX;
    }

    return MIN_INDEX;
  };

  //Handle up and down arrow keys
  document.onkeydown = (event) => {
    if (event.key === 'ArrowUp' && CURRENT_INDEX > 0) {
      CURRENT_INDEX = CURRENT_INDEX - 1;
      dropDownMinValues();
      MAX_INDEX = MIN_INDEX + OPTIONS;
      highlighter(selectedValue, CURRENT_INDEX, false);
    }
    if (event.key === 'ArrowDown' && CURRENT_INDEX < optionsArrayLength - 1) {
      CURRENT_INDEX = CURRENT_INDEX + 1;
      dropDownMinValues();
      MAX_INDEX = CURRENT_INDEX + OPTIONS;
      highlighter(selectedValue, CURRENT_INDEX, false);
    }
  };
};

const options = document.querySelectorAll('li');
// Function to filter options based on user input
const filterOptions = (inputValue) => {
  options.forEach((option, i) => {
    if (option.textContent.toLowerCase().includes(inputValue.toLowerCase())) {
      MIN_INDEX = i;
      CURRENT_INDEX = i;
      if (MIN_INDEX + OPTIONS > optionsArrayLength) {
        MAX_INDEX = optionsArrayLength;
      }
      MAX_INDEX = MIN_INDEX + OPTIONS;
      highlighter(inputValue, CURRENT_INDEX, false);
    }
  });
};

// Add event listener to search input
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    filterOptions(event.target.value);
  }
});

input.addEventListener('focusin', () => handleArrowKeys());
input.addEventListener('focusout', () => {
  highlighter('', 0, true);
});
