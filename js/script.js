function mailingListButtonPress() {
    alert("We don't have a mailing list. Nothing is real. The world is a lie and nothing matters anymore");
}

function randomArticle() {
    alert("Congratulations! You're the one millionth visitor too this site!");
    open("https://arxiv.org/pdf/2101.0" + Math.round(Math.random() * 1295 + 1000) + ".pdf");
}

function fakeSignUp() {
    alert("no.");
}
