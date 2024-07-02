interface Observer {
    // Metodo per aggiornare l'observer con una nuova parola
    update(word: string): void;
}

export class WordCounter {
    private observers: Observer[] = []; // Lista di observers
    private wordCounts: Map<string, number> = new Map(); // Mappa per tenere traccia del conteggio delle parole
    private letterCount: number = 0; // Contatore per il numero di lettere
    private spaceCount: number = 0; // Contatore per il numero di spazi

    // Aggiunge un observer alla lista
    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    // Rimuove un observer dalla lista
    removeObserver(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    // Conta le parole in un testo e notifica gli observers se una parola supera le 10 occorrenze
    countWords(text: string): void {
        const words = text.split(/\s+/);
        this.spaceCount = words.length - 1; // Gli spazi sono sempre n-1 rispetto al numero di parole
        for (const word of words) {
            this.letterCount += word.replace(/[^a-zA-Z]/g, "").length; // Conta solo le lettere, escludendo caratteri speciali e numeri
            const count = this.wordCounts.get(word.toLowerCase()) || 0; // Ignora il case delle parole
            this.wordCounts.set(word.toLowerCase(), count + 1);
            if (count + 1 > 10) {
                this.notifyObservers(word.toLowerCase());
            }
        }
    }
    
    // Restituisce il numero totale di parole
    getLetterCount(): number {
        return this.letterCount;
    }
    
    // Restituisce il numero totale di lettere
    getSpaceCount(): number {
        return this.spaceCount;
    }

    // Restituisce il numero totale di spazi
    getWordCount(): number {
        return this.wordCounts.size;
    }

    // Notifica tutti gli observers con la parola specificata
    private notifyObservers(word: string): void {
        for (const observer of this.observers) {
            observer.update(word);
        }
    }
}

export class WordCountObserver implements Observer {
    // Implementazione del metodo update per gestire l'evento di una parola ripetuta più di 10 volte
    update(word: string): void {
        console.log(`The word "${word}" has been repeated more than 10 times.`);
        // Qui si può gestire l'evento
    }
}