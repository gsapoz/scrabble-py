$(document).ready(function () {
  const active_slots = [];
  for (let x = 1; x < 122; x++) {
    $("#board-container").append(
      '<div id="' + x + '" class="board-slot">' + x + "</div>"
    );
  }

  let letters = $("#letter-container").data("letters");

  for (let i = 0; i < letters.length; i++) {
    if (letters[i].match(/[a-z]/i)) {
      // Ignore array symbols (commas, brackets, spaces, quotes)
      $("#letter-container").append(
        ` <div class="letter-block" data-slot="0">${letters[
          i
        ].toUpperCase()}</div> `
      );
    }
  }

  function hor_adjacent(slots) {
    // checks if all the letter blocks are horizontally adjacent
    for (let i = 1; i < slots.length; i++) {
      if (Math.abs(slots[i] - slots[i - 1]) > 1) {
        return false;
      }
    }
    return true;
  }

  function ver_adjacent(slots) {
    // checks if all the letter blocks are vertically adjacent
    for (let i = 1; i < slots.length; i++) {
      if (Math.abs(slots[i] - slots[i - 1]) > 11) {
        return false;
      }
    }
    return true;
  }

  function active_word() {
    let word = "";

    if (active_slots.length > 0) {
      if (hor_adjacent(active_slots) || ver_adjacent(active_slots)) {
        active_slots.sort((a, b) => a - b);

        for (let i = 0; i < active_slots.length; i++) {
          let index = active_slots[i];
          let block = document.querySelector('[data-slot="' + index + '"]');
          let letter = block.textContent;
          word += letter;
        }
      }
    }

    return word;
  }

  $(function () {
    // enable drag-and-drop animations to emulate scrabble mechanics
    $(".letter-block").draggable({
      start: function () {
        let letter = $(this);
        let slot_number = letter.attr("data-slot");

        let is_assigned = active_slots.indexOf(slot_number);
        if (is_assigned !== -1) {
          active_slots.splice(is_assigned, 1);
        }
      },
    });

    $(".board-slot").droppable({
      drop: function (event, ui) {
        let letter = ui.draggable; //the letter-block being dropped into this slot
        let slot = $(this);

        let y = slot.position().top + (slot.height() - letter.height()) / 2;
        let x = slot.position().left + (slot.width() - letter.width()) / 2;
        let slotId = slot.attr("id");

        active_slots.push(slotId);
        letter.attr("data-slot", slotId);
        letter.animate({ top: y, left: x });
        // console.log(active_slots);
      },
    });
  });

  $("#submit-button").click(function () {
    // prevent the default "GET" request behavior
    event.preventDefault();

    // assemble a word using all the active slots and submit it to the server
    let submission = active_word();

    // post to our python server endpoint to validate our word and play it
    $.ajax({
      type: "POST",
      url: "/submit-word",
      data: {
        word: submission,
      },
      success: function (response) {
        if (typeof response.message === "boolean" && response.message) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // handle errors
        console.error(textStatus, errorThrown);
      },
    });
  });
});
