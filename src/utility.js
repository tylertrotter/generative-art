function randomNumber(min, max) {
  return min + max;//Math.ceil(Math.random() * (max - min)) + min;
}

export {
  randomNumber
}