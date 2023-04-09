$(document).ready(function () {
  for (let x = 1; x < 122; x++) {
    $("#board-container").append(
      '<div id="slot' + x + '" class="board-slot">' + x + "</div>"
    );
  }

  let letters = $("#letter-container").data("letters");

  for (let i = 0; i < letters.length; i++) {
    if (letters[i].match(/[a-z]/i)) {
      // Ignore array symbols (commas, brackets, spaces, quotes)
      $("#letter-container").append(
        ` <div class="letter-block">${letters[i].toUpperCase()}</div> `
      );
    }
  }

  $(function () {
    $(".letter-block").draggable({});

    $(".board-slot").droppable({
      drop: function (event, ui) {
        let letter = ui.draggable;
        let slot = $(this);

        let y = slot.position().top + (slot.height() - letter.height()) / 2;
        let x = slot.position().left + (slot.width() - letter.width()) / 2;

        letter.animate({ top: y, left: x });
      },
    });
  });
});
