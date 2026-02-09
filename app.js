const fs = require('fs');
const chalk = require('chalk');

function readFileContent() {
    return fs.readFileSync('declaration.txt', 'utf8');
}

function getWordCounts(content) {
    const wordCount = {};
    const words = content.split(/\W+/).filter(Boolean);

    for (const word of words) {
        const lower = word.toLowerCase();
        if (wordCount[lower]) {
            wordCount[lower]++;
        } else {
            wordCount[lower] = 1;
        }
    }

    return wordCount;
}

function colorWord(word, count) {
    if (count === 1) {
        return chalk.blue(word);
    } else if (count >= 2 && count <= 5) {
        return chalk.green(word);
    } else {
        return chalk.red(word);
    }
}

function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).map(word => {
            const lower = word.toLowerCase();
            return colorWord(word, wordCount[lower] || 0);
        }).join(' ');

        console.log(coloredLine);
    }
}

function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    processFile();
}

module.exports = {
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines,
    processFile
};
