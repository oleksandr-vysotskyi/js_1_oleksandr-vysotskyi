import { parsePair, sortByName, sortByValue } from './pairs.js';

// DOM elements
function getElementById(id) {
    return document.getElementById(id);
}

const input = getElementById('inputPair');
const addButton = getElementById('addButton');
const pairsList = getElementById('pairsList');
const sortByNameButton = getElementById('sortByNameButton');
const sortByValueButton = getElementById('sortByValueButton');
const deleteButton = getElementById('deleteButton');

let pairs = [];
let nextPairId = 1;

// Renders the current pairs into the selectable list.
function renderPairs() {
    pairsList.innerHTML = '';

    pairs.forEach(({ id, name, value }) => {
        const option = document.createElement('option');
        option.value = String(id);
        option.textContent = `${name}=${value}`;
        pairsList.appendChild(option);
    });
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
    pairs.push({ id: nextPairId++, ...pair });
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

    const selectedIds = new Set(
        [...pairsList.selectedOptions].map((option) => Number(option.value))
    );
    if (selectedIds.size === 0) {
        return;
    }

    pairs = pairs.filter(({ id }) => !selectedIds.has(id));
    renderPairs();
};
