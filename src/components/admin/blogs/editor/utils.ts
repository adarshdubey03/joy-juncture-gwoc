export function calculateReadability(text: string): { score: number; level: string } {
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.length > 0).length;
    const syllables = countSyllables(text);

    if (words === 0 || sentences === 0) return { score: 100, level: "Very Easy" };

    // Flesch-Kincaid Reading Ease
    // 206.835 - (1.015 * ASL) - (84.6 * ASW)
    const ASL = words / sentences;
    const ASW = syllables / words;
    const score = 206.835 - (1.015 * ASL) - (84.6 * ASW);

    let level = "Standard";
    if (score >= 90) level = "Very Easy";
    else if (score >= 80) level = "Easy";
    else if (score >= 70) level = "Fairly Easy";
    else if (score >= 60) level = "Standard";
    else if (score >= 50) level = "Fairly Difficult";
    else if (score >= 30) level = "Difficult";
    else level = "Very Difficult";

    return { score: Math.round(score), level };
}

function countSyllables(text: string): number {
    // Basic approximation
    const wordList = text.toLowerCase().split(/\s+/);
    let count = 0;

    wordList.forEach(word => {
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); // remove silent e
        word = word.replace(/^y/, ''); // y at start isn't vowel
        const vowels = word.match(/[aeiouy]{1,2}/g);
        count += vowels ? vowels.length : 1; // at least 1 per word fallback
    });

    return count;
}
