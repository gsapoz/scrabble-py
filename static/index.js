$(document).ready(function () {
  const x_defaults = ["8", "110", "212", "314", "416", "518", "620"];
  const default_y = "1163px";
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
      $("#letter-container").append(` <div class="letter-block" data-slot="0">
        ${letters[i].toUpperCase()}</div> `);
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

  function reset_letter(letter) {
    let nearest = null;
    let minDistance = Infinity;

    let x = letter.position().left + (letter.width() - letter.width()) / 2;

    for (let i = 0; i < x_defaults.length; i++) {
      const distance = Math.abs(x - x_defaults[i]);

      if (distance < minDistance) {
        minDistance = distance;
        nearest = x_defaults[i];
      }
    }

    // edit active_slots as well just in case it doesn't reset
    let slot_number = letter.attr("data-slot");
    let is_assigned = active_slots.indexOf(slot_number);
    if (is_assigned !== -1) {
      active_slots.splice(is_assigned, 1);
    }
    letter.attr("data-slot", "0");
    letter.animate({ top: default_y, left: nearest });
  }

  function reset_board() {
    const letter_blocks = document.querySelectorAll(
      ".letter-block.ui-draggable.ui-draggable-handle"
    );

    let index = 0;
    letter_blocks.forEach((letter) => {
      letter.style.top = default_y;
      letter.style.left = x_defaults[index] + "px";
      index++;
    });
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

  $("#letter-container").droppable({
    drop: function (event, ui) {
      let letter = ui.draggable; //the letter-block dropped back into its default

      reset_letter(letter);
    },
  });

  $("body").droppable({
    drop: function (event, ui) {
      let letter = ui.draggable; //the letter-block dropped back into its default
      reset_letter(letter);
    },
  });

  $("#reset-button").click(function () {
    event.preventDefault();

    reset_board();
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
          alert(submission);
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
