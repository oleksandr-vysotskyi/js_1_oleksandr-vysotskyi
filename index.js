import { parsePair, sortByName, sortByValue } from './pairs.js';

// DOM elements
function getElementById(id) {
    return document.getElementById(id);
}

const input = getElementById('inputPair');
const addButton = getElementById('addButton');
const textArea = getElementById('boxPair');
const sortByNameButton = getElementById('sortByNameButton');
const sortByValueButton = getElementById('sortByValueButton');
const deleteButton = getElementById('deleteButton');

let pairs = [];

// Renders the current pairs into the list box.
function renderPairs() {
    textArea.value = pairs.map(({ name, value }) => `${name}=${value}`).join('\n');
}

addButton.onclick = (event) => {
    event.preventDefault();

    const pair = parsePair(input.value);
    if (!pair) {
        input.setCustomValidity('Wrong format. Use: name = value');
        input.reportValidity();
        return;
    }

    input.setCustomValidity('');
    pairs.push(pair);
    input.value = '';
    renderPairs();
};

sortByNameButton.onclick = (event) => {
    event.preventDefault();
    pairs = sortByName(pairs);
    renderPairs();
};

sortByValueButton.onclick = (event) => {
    event.preventDefault();
    pairs = sortByValue(pairs);
    renderPairs();
};

deleteButton.onclick = (event) => {
    event.preventDefault();
    pairs = [];
    renderPairs();
};

