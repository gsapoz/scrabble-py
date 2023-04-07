function getRandomLetter() {
  // Generate a random index between 0 and 25
  const randomIndex = Math.floor(Math.random() * 26);

  // Map the index to a letter using the character code
  const randomLetter = String.fromCharCode(65 + randomIndex); // 'A' = 65, 'Z' = 90

  return randomLetter;
}

function getRandomVowel() {
  const vowels = ["A", "E", "I", "O", "U"];
  const randomIndex = Math.floor(Math.random() * 5);
  return vowels[randomIndex];
}

function generateHand(letters) {}
