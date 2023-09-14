export { againstComputer };

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const againstComputer = () => {
  let cells = document.querySelectorAll('.game-wrapper > div');
  for (let i = getRandomIntInclusive(0, 8); i < 9; i++) {
    if (cells[i].innerHTML != '') {
      againstComputer()
      return;
    } else {
      console.log(i);
      cells[i].click();
      console.log('computer click');
      return;
    }
  }
};