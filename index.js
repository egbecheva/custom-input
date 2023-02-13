let optionsArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const maxOptions = 10;
let finalArray = [];
let listItems = optionsArray.map((element, index) => {
  if (index <= maxOptions) {
    finalArray = [
      ...finalArray,
      '<div class="not-displayed dropdown-item">' + element + '</div>',
    ];
  }
  if (index > maxOptions) {
    finalArray = [
      ...finalArray,
      '<div class="dropdown-item">' + element + '</div>',
    ];
  }

  return finalArray;
});
const htmlList = finalArray.join('');
const dqdo = (arr) => {
  document.getElementById('dropdown-content').innerHTML += arr;
};
dqdo(htmlList);
