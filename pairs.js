// Parses a "name = value" string into a { name, value } pair.
// Returns null if the format is invalid.
function parsePair(text) {
    const match = text.match(/^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/);
    if (!match) return null;
    return {name: match[1], value: match[2]};
}

function sortByName(pairs) {
    return [...pairs].sort((a, b) => a.name.localeCompare(b.name));
}

function sortByValue(pairs) {
    return [...pairs].sort((a, b) => a.value.localeCompare(b.value));
}

export {parsePair, sortByName, sortByValue};