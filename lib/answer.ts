import { KNOWLEDGE, type Entry } from '@/data/knowledge';

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'to', 'of', 'in', 'on', 'for',
  'and', 'or', 'but', 'if', 'i', 'me', 'my', 'we', 'you', 'your', 'it', 'its', 'do', 'does',
  'did', 'can', 'could', 'should', 'would', 'will', 'shall', 'have', 'has', 'had', 'what',
  'how', 'when', 'where', 'which', 'who', 'why', 'about', 'with', 'from', 'as', 'at', 'by',
  'there', 'this', 'that', 'get', 'got', 'need', 'want', 'much', 'many', 'any', 'all',
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

/** Crude stem so "universities" matches "university" and "applying" matches "apply". */
function stem(w: string): string {
  return w
    .replace(/ies$/, 'y')
    .replace(/(ing|ed|es|s)$/, '')
    .replace(/(tion|ment)$/, '');
}

export type Answer = {
  entry: Entry;
  score: number;
};

export function findAnswers(query: string, limit = 3): Answer[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];
  const stems = tokens.map(stem);
  const lowerQuery = query.toLowerCase();

  const scored = KNOWLEDGE.map((entry) => {
    let score = 0;
    const haystackKeywords = entry.keywords.map((k) => k.toLowerCase());
    const questionTokens = tokenize(entry.question).map(stem);
    const answerTokens = tokenize(entry.answer).map(stem);
    const topicTokens = tokenize(entry.topic).map(stem);

    // Whole-phrase keyword hit is the strongest signal.
    for (const k of haystackKeywords) {
      if (k.includes(' ') && lowerQuery.includes(k)) score += 14;
    }

    for (let i = 0; i < stems.length; i++) {
      const s = stems[i];
      const raw = tokens[i];

      if (haystackKeywords.some((k) => k === raw || stem(k) === s)) score += 8;
      else if (haystackKeywords.some((k) => k.includes(raw) || raw.includes(stem(k)))) score += 4;

      if (questionTokens.includes(s)) score += 5;
      if (topicTokens.includes(s)) score += 4;
      if (answerTokens.includes(s)) score += 1;
    }

    // Reward entries that cover more of the query rather than one word heavily.
    const covered = stems.filter(
      (s) =>
        questionTokens.includes(s) ||
        answerTokens.includes(s) ||
        haystackKeywords.some((k) => stem(k) === s || k.includes(s))
    ).length;
    score += (covered / stems.length) * 10;

    return { entry, score };
  })
    .filter((r) => r.score >= 8)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

export const SUGGESTED_QUESTIONS = [
  'What is Open Doors and how is it different from the quota?',
  'What are the Open Doors deadlines?',
  'Am I too old to apply?',
  'How should I write the motivation letter?',
  'How much money do I need per month?',
  'Do I need to speak Russian?',
  'What is migration registration?',
  'Can I work while studying?',
];
