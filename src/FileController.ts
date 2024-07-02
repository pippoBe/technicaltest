import { FileReader } from './services/FileReader';
import { WordCounter, WordCountObserver } from './services/WordCounter';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fileReader = new FileReader();

const wordCounter = new WordCounter();
const wordCountObserver = new WordCountObserver();
wordCounter.addObserver(wordCountObserver);

rl.question('Inserisci un path locale o un URL: ', (pathOrUrl) => {
    fileReader.readFromPathOrUrl(pathOrUrl)
        .then(content => {
            wordCounter.countWords(content);
            console.log(`Numero totale di parole: ${wordCounter.getWordCount()}`);
            console.log(`Numero di lettere: ${wordCounter.getLetterCount()}`);
            console.log(`Numero di spazi: ${wordCounter.getSpaceCount()}`);
        })
        .catch(error => console.error(error))
        .finally(() => rl.close());
});