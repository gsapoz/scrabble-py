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

$(document).ready(function () {
  for (let x = 1; x < 122; x++) {
    $("#board-container").append(
      '<div id="slot' + x + '" class="board-slot">' + x + "</div>"
    );
  }

  for (let i = 0; i < 7; i++) {
    $("#letter-container").append(
      ` <div class="letter-block">${getRandomLetter()}</div> `
    );
  }

  $(function () {
    $(".letter-block").draggable({});

    $(".board-slot").droppable({
      drop: function (event, ui) {
        let letter = ui.draggable;
        let slot = $(this);

        let y = slot.position().top;
        let x = slot.position().left;
        console.log(x);
        // draggable.animate({ top: y, left: x });
      },
    });
  });
});
