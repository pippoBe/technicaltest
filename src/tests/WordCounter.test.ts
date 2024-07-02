import { WordCounter } from '../services/WordCounter';

describe('WordCounter', () => {
    let wordCounter: WordCounter;

    beforeEach(() => {
        wordCounter = new WordCounter();
    });

    it('should call functions correctly', () => {
        const observer = {
            update: jest.fn()
        };
        wordCounter.addObserver(observer);
        wordCounter.removeObserver(observer);
        wordCounter.countWords('Testo di prova');
        expect(observer.update).not.toHaveBeenCalled();
    });

    it('should count words, letters, and spaces correctly', () => {
        const content = 'Testo di prova';
        wordCounter.countWords(content);
        expect(wordCounter.getWordCount()).toBe(3);
        expect(wordCounter.getLetterCount()).toBe(12);
        expect(wordCounter.getSpaceCount()).toBe(2);
    });
});