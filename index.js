let optionsArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const maxOptions = 10;
let finalArray = [];
let listItems = optionsArray.map((element, index) => {
  if (index <= maxOptions) {
    finalArray = [
      ...finalArray,
      `<li value=${element} class="not-displayed dropdown-item"> ${element} </li>`,
    ];
  }
  if (index > maxOptions) {
    finalArray = [
      ...finalArray,
      `<li value=${element} class="dropdown-item"> ${element} </li>`,
    ];
  }

  return finalArray;
});
const htmlList = finalArray.join('');
const appendInputOptions = (arr) => {
  document.getElementById('dropdown-content').innerHTML += arr;
};
appendInputOptions(htmlList);

const handleMouseOver = (element) => {
  const input = document.getElementById('inputField');
  const selectedValue = element.getAttribute('value');
  input.value = selectedValue;
};

const dropDownList = document.querySelectorAll('.dropdown-item');

dropDownList.forEach((element) =>
  element.addEventListener('mouseover', () => handleMouseOver(element))
);
