window.onload = function() {
    var headers = {
        "key" : "Key",
        "phrase" : "Phrase",
    }

    //code implementation from: https://stackoverflow.com/questions/16647404/javascript-function-to-enter-only-alphabets-on-keypress
    function alphaOnly(event) {
        var textInput = document.getElementById("input-text").value;
        textInput = textInput.replace(/[^A-Za-z ]/g, "");
        document.getElementById("input-text").value = textInput;
    };

    function main() {
        var input = $("#input-text").val().toUpperCase();
        var key = parseInt($("#key-select").val());

        if ($("#method-select").val() === "Cipher") {
            key = 26 - key;
        }

        var output = [];

        for (i = 0; i < input.length; i++) {
            var character = input.charCodeAt(i);

            if (character === 32) {
                output.push(' ');
                continue;
            }

            var cipherChar = (character - 65 + key) % 26;
            output.push(String.fromCharCode(cipherChar + 65));
        }

        $("#output-text").val(output.join(""));

    }

    function bruteforce() {
        var input = $("#input-text").val().toUpperCase();
        var phrases = [];

        for (key = 0; key < 26; key++) {
            var output = [];

            for (i = 0; i < input.length; i++) {
                var character = input.charCodeAt(i);

                if (character === 32) {
                    output.push(' ');
                    continue;
                }

                var cipherChar = (character - 65 + key) % 26;
                output.push(String.fromCharCode(cipherChar + 65));
            }

            var phrase = output.join("");
            var language = franc(phrase.toLowerCase());

            var detected = language == "eng";

            phrases.push({"possible": detected, "phrase" : phrase, "key": key});
        }

        phrases.sort(function (a, b) {
            return b.possible - a.possible;
        });

        var table = new TableBuilder({'class': 'table table-sm table-striped table-responsive'})
        .setHeaders(headers)
        .setData(phrases)
        .render();
        $("#table-container").html(table);

    }

    $('#input-text').bind('input', alphaOnly);
    $("#button-encode").on("click", main);
    $("#button-bruteforce").on("click", bruteforce);

    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
    }
}