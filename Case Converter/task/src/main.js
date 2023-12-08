const textarea = document.querySelector("textarea");
const upperCaseBtn = document.getElementById("upper-case");
const lowerCaseBtn = document.getElementById("lower-case");
const properCaseBtn = document.getElementById("proper-case");
const sentenceCaseBtn = document.getElementById("sentence-case");
const saveTextFileBtn = document.getElementById("save-text-file");

upperCaseBtn.addEventListener("click", upperCaseBtnHandler);
lowerCaseBtn.addEventListener("click", lowerCaseBtnHandler);
properCaseBtn.addEventListener("click", properCaseBtnHandler);
sentenceCaseBtn.addEventListener("click", sentenceCaseBtnHandler);
saveTextFileBtn.addEventListener('click', saveTextFileBtnHandler);


function upperCaseBtnHandler(){
    console.log("upper-case button clicked");
    let initialText = textarea.value;
    textarea.value = initialText.toUpperCase();
}

function lowerCaseBtnHandler(){
    console.log("lower-case button clicked");
    let initialText = textarea.value;
    textarea.value = initialText.toLowerCase();
}

function properCaseBtnHandler(){
    console.log("proper-case button clicked");
    let initialText = textarea.value.toLowerCase().trim();
    let paragraphs = splitTextToParagraphs(initialText);
    for (let i = 0; i < paragraphs.length; i++) {
        let sentences = splitParagraphsToSentences(paragraphs[i]);
        for (let j = 0; j < sentences.length; j++) {
            let sentence = sentences[j].trim();
            let words = sentence.split(' ');
            for (let k = 0; k < words.length; k++) {
                let word = words[k];
                words[k] = word.charAt(0).toUpperCase() + word.substring(1);
            }
            sentences[j] = words.join(' ');
        }
        paragraphs[i] = sentences.join('. ') + '.';
    }
    textarea.value = paragraphs.join('\n\n');
}

function sentenceCaseBtnHandler(){
    console.log("sentence-case button clicked");
    let initialText = textarea.value.toLowerCase().trim();
    let paragraphs = splitTextToParagraphs(initialText);
    for (let i = 0; i < paragraphs.length; i++) {
        let sentences = splitParagraphsToSentences(paragraphs[i]);
        for (let j = 0; j < sentences.length; j++) {
            let sentence = sentences[j].trim();
            let words = sentence.split(' ');
            for (let k = 0; k < words.length; k++) {
                if (k === 0) {
                    let word = words[k];
                    console.log(word);
                    words[k] = word.charAt(0).toUpperCase() + word.substring(1);
                }
            }
            sentences[j] = words.join(' ');
        }
        paragraphs[i] = sentences.join('. ') + '.';
    }
    textarea.value = paragraphs.join('\n\n');
}

function saveTextFileBtnHandler(){
    download("text.txt",textarea.value);
}

function splitTextToParagraphs(text){
    return text.split('\n\n');
}
function splitParagraphsToSentences(paragraph){
    let sentences = paragraph.split(".");
    return sentences.slice(0, sentences.length - 1);
}

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
