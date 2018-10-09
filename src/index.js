import fs from 'fs';
import util from "util";
import parser from './grammar.pegjs';

const readfile = util.promisify(fs.readFile);
const writefile = util.promisify(fs.writeFile);

const formatEntry = entryNode => `@${entryNode.type}{${entryNode.label},\n${entryNode.fields.map(formatField).join("\n")}\n}`;

const formatField = fieldNode => ` ${fieldNode.type} = {${fieldNode.value}}`;

function formatNbibCode(code) {
    const entryNodes = parser.parse(code).filter(node => node.type !== 'comment');

    entryNodes.sort((n1, n2) => n1.label > n2.label);

    const entries = entryNodes.map(formatEntry);

    return entries.join("\n\n");
}

const inputFile = process.argv[2];
const extIndex = inputFile.toLowerCase().indexOf('.nbib');

const help = ['?', '-h', '--help'];

if (help.includes(inputFile)) {
    console.log(`nbib - neat bibtex bibliography
    First argument should be the filepath of the input file with the .nbib extension
    Second argument can be the output filepath and is optional
    
    If no second argument is provided, the input filepath with the extension changed to .bib will be used`);
}
else if (extIndex === -1) {
    console.warn("Use the nbib extension for nbib files to avoid confusion")
}
else {
    const outputFile = process.argv[3] || inputFile.substr(0, extIndex) + ".bib";

    readfile(inputFile, 'UTF8').then(nbibCode => {
        try {
            const bibCode = formatNbibCode(nbibCode);
            return writefile(outputFile, bibCode);
        }
        catch (e) {
            console.warn(`Syntax error at line ${e.location.start.line}: ${e.message}`);
        }
    });
}