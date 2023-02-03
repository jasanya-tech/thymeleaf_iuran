$(document).ready(function () {
    // validasi house number only allow number
    $("#houseNumber").on("keyup", function () {
        let wordInput = $(this)
            .val()
            .substr($(this).val().length - 1);
        // only allow integer
        if (!parseInt(wordInput) && wordInput != 0) {
            $(this).val($(this).val().replace(wordInput, ""));
        }
    });
    // validasi rt only allow number
    $("#rt").on("keyup", function () {
        let wordInput = $(this)
            .val()
            .substr($(this).val().length - 1);
        // only allow integer
        if (!parseInt(wordInput) && wordInput != 0) {
            $(this).val($(this).val().replace(wordInput, ""));
        }
    });
    // validasi rw only allow number
    $(document).ready(function () {
        $("#rw").on("keyup", function () {
            let wordInput = $(this)
                .val()
                .substr($(this).val().length - 1);
            // only allow integer
            if (!parseInt(wordInput) && wordInput != 0) {
                $(this).val($(this).val().replace(wordInput, ""));
            }
        });
    })
});