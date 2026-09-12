/**
 * A rubric-based reviewer for Open Doors motivation letters.
 *
 * This is a rules engine, not a language model. It measures things that can be
 * counted reliably - length, structure, specificity, evidence, cliche density -
 * and reports what it found. It cannot judge whether your argument is true or
 * whether your research idea is any good.
 */

export type Severity = 'good' | 'warning' | 'problem';

export type Finding = {
  id: string;
  label: string;
  severity: Severity;
  message: string;
  /** Phrases lifted from the letter that triggered the finding. */
  evidence: string[];
  fix?: string;
};

export type Review = {
  score: number;
  band: 'Needs rewriting' | 'Workable draft' | 'Competitive' | 'Strong';
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  avgSentenceWords: number;
  findings: Finding[];
};

const CLICHES = [
  'since childhood',
  'from a young age',
  'i have always been fascinated',
  'i have always been passionate',
  'i have always dreamed',
  'my dream',
  'lifelong dream',
  'world-class',
  'world class',
  'prestigious university',
  'one of the best universities in the world',
  'great country',
  'rich culture',
  'i am writing to express my interest',
  'it would be an honour',
  'it would be an honor',
  'i believe that education is',
  'knowledge is power',
  'make the world a better place',
  'i am a hard worker',
  'i am a fast learner',
  'think outside the box',
];

const VAGUE = [
  'many',
  'various',
  'several',
  'a lot of',
  'lots of',
  'some things',
  'different things',
  'good',
  'very good',
  'nice',
  'great experience',
  'a number of',
  'etc',
  'and so on',
];

const EVIDENCE_VERBS = [
  'published',
  'co-authored',
  'presented',
  'led',
  'built',
  'designed',
  'developed',
  'implemented',
  'won',
  'awarded',
  'ranked',
  'supervised',
  'taught',
  'founded',
  'measured',
  'analysed',
  'analyzed',
  'trained',
  'deployed',
  'patented',
];

const FUTURE_MARKERS = [
  'after graduation',
  'after completing',
  'i intend to',
  'i plan to',
  'my goal is',
  'i aim to',
  'on returning',
  'when i return',
  'i will then',
  'long term',
  'long-term',
];

/**
 * Deliberately excludes bare words like "course" and "programme". Every
 * applicant writes those, so they say nothing about whether the writer has
 * looked at the destination.
 */
const FIT_MARKERS = [
  'laboratory',
  'lab ',
  'supervisor',
  'professor',
  'research group',
  'research centre',
  'research center',
  'department of',
  'faculty of',
  'school of',
  'centre for',
  'center for',
  'institute of',
  'under the supervision',
  'taught by',
];

const HEDGES = ['maybe', 'perhaps', 'somewhat', 'kind of', 'sort of', 'i think that', 'i guess'];

function countOccurrences(haystack: string, needles: string[]): string[] {
  const hits: string[] = [];
  for (const n of needles) {
    if (haystack.includes(n)) hits.push(n);
  }
  return hits;
}

export function reviewLetter(raw: string): Review {
  const text = raw.trim();
  const lower = text.toLowerCase();

  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
  const sentenceCount = sentences.length;
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const paragraphCount = paragraphs.length;
  const avgSentenceWords = sentenceCount ? Math.round(wordCount / sentenceCount) : 0;

  const findings: Finding[] = [];
  let score = 100;

  const add = (f: Finding, penalty: number) => {
    findings.push(f);
    score -= penalty;
  };

  // ------------------------------------------------------------------ length
  if (wordCount < 150) {
    add(
      {
        id: 'length-short',
        label: 'Too short',
        severity: 'problem',
        message: `Your letter is ${wordCount} words. A letter this short cannot carry an argument, and reviewers read it as a lack of effort.`,
        evidence: [],
        fix: 'Aim for roughly 350 to 600 words: what you want to work on, what you have already done, why this place, what comes next.',
      },
      25
    );
  } else if (wordCount < 280) {
    add(
      {
        id: 'length-thin',
        label: 'On the thin side',
        severity: 'warning',
        message: `At ${wordCount} words you probably have room for one more concrete example.`,
        evidence: [],
        fix: 'Add the specific project or result that best supports your stated direction.',
      },
      8
    );
  } else if (wordCount > 900) {
    add(
      {
        id: 'length-long',
        label: 'Too long',
        severity: 'warning',
        message: `At ${wordCount} words, the strongest parts of your letter are competing with the weakest ones.`,
        evidence: [],
        fix: 'Cut to roughly 600 words. Remove background that any applicant could have written.',
      },
      10
    );
  } else {
    findings.push({
      id: 'length-ok',
      label: 'Length is right',
      severity: 'good',
      message: `${wordCount} words sits in the range reviewers expect.`,
      evidence: [],
    });
  }

  // --------------------------------------------------------------- structure
  if (paragraphCount < 3 && wordCount > 200) {
    add(
      {
        id: 'structure',
        label: 'Not broken into paragraphs',
        severity: 'warning',
        message: `The letter has ${paragraphCount === 1 ? 'one block of text' : `${paragraphCount} paragraphs`}. A reviewer scanning dozens of letters will not dig through a wall of text.`,
        evidence: [],
        fix: 'Use four paragraphs: your direction, your evidence, the fit with this place, your plan afterwards.',
      },
      10
    );
  } else if (paragraphCount >= 3) {
    findings.push({
      id: 'structure-ok',
      label: 'Clear paragraph structure',
      severity: 'good',
      message: `${paragraphCount} paragraphs, which reads cleanly.`,
      evidence: [],
    });
  }

  if (avgSentenceWords > 32) {
    add(
      {
        id: 'sentence-length',
        label: 'Sentences run long',
        severity: 'warning',
        message: `Your sentences average ${avgSentenceWords} words. Long sentences hide the point, and reviewers are often reading in a second language.`,
        evidence: [],
        fix: 'Split anything over about 25 words into two sentences.',
      },
      6
    );
  }

  // ----------------------------------------------------------------- cliches
  const clicheHits = countOccurrences(lower, CLICHES);
  if (clicheHits.length >= 3) {
    add(
      {
        id: 'cliche',
        label: 'Heavy on stock phrases',
        severity: 'problem',
        message: `Found ${clicheHits.length} phrases that appear in a large share of applications. They take space and say nothing about you.`,
        evidence: clicheHits,
        fix: 'Replace each one with a specific fact: a result, a number, a named project.',
      },
      18
    );
  } else if (clicheHits.length > 0) {
    add(
      {
        id: 'cliche-few',
        label: 'A few stock phrases',
        severity: 'warning',
        message: 'These phrases are common enough that they read as filler.',
        evidence: clicheHits,
        fix: 'Cut them and use the space for evidence.',
      },
      7
    );
  } else {
    findings.push({
      id: 'cliche-none',
      label: 'No obvious stock phrases',
      severity: 'good',
      message: 'The letter avoids the openings reviewers see most often.',
      evidence: [],
    });
  }

  // -------------------------------------------------------------- specificity
  const numbers = text.match(/\d+(?:[.,]\d+)*x?%?/g) ?? [];

  // Only count capitalised words that are NOT opening a sentence. A word after
  // a full stop is capitalised by grammar, not because it names anything.
  const midSentenceProper = text.match(/(?<=[a-z,;:)]\s)[A-Z][a-zA-Z]{2,}\b/g) ?? [];
  const distinctProper = Array.from(new Set(midSentenceProper)).filter(
    (w) => !['The', 'This', 'That', 'These', 'Those', 'My', 'Russia', 'Russian', 'English'].includes(w)
  );

  if (numbers.length === 0) {
    add(
      {
        id: 'no-numbers',
        label: 'No concrete figures',
        severity: 'warning',
        message: 'There is not a single number in the letter. Numbers are the cheapest way to turn a claim into evidence.',
        evidence: [],
        fix: 'Add scale: how many users, what accuracy, which rank, how many months, how many students.',
      },
      10
    );
  } else {
    findings.push({
      id: 'numbers-ok',
      label: 'Uses concrete figures',
      severity: 'good',
      message: `Found ${numbers.length} numeric detail${numbers.length === 1 ? '' : 's'}, which makes claims checkable.`,
      evidence: numbers.slice(0, 6),
    });
  }

  if (distinctProper.length < 4) {
    add(
      {
        id: 'no-names',
        label: 'Nothing is named',
        severity: 'problem',
        message: 'The letter names almost no specific institutions, tools, projects or people. It could have been written by any applicant in any field.',
        evidence: [],
        fix: 'Name the laboratory, the supervisor, the course, the software, the dataset, the competition.',
      },
      16
    );
  }

  // ------------------------------------------------------------------ evidence
  const evidenceHits = countOccurrences(lower, EVIDENCE_VERBS);
  if (evidenceHits.length === 0) {
    add(
      {
        id: 'no-evidence',
        label: 'Claims without evidence',
        severity: 'problem',
        message: 'The letter describes interest rather than work done. Portfolio reviewers score what you have actually produced.',
        evidence: [],
        fix: 'Use verbs that describe output: built, published, led, won, deployed, measured.',
      },
      18
    );
  } else if (evidenceHits.length < 3) {
    add(
      {
        id: 'thin-evidence',
        label: 'Thin evidence',
        severity: 'warning',
        message: 'Only a little of the letter describes work you have actually completed.',
        evidence: evidenceHits,
        fix: 'Swap one paragraph of ambition for one paragraph of results.',
      },
      8
    );
  } else {
    findings.push({
      id: 'evidence-ok',
      label: 'Describes real work',
      severity: 'good',
      message: 'The letter reports things you have done rather than only things you want.',
      evidence: evidenceHits.slice(0, 6),
    });
  }

  // ------------------------------------------------------------------- vague
  const vagueHits = countOccurrences(lower, VAGUE);
  if (vagueHits.length >= 4) {
    add(
      {
        id: 'vague',
        label: 'Vague quantifiers',
        severity: 'warning',
        message: `Words like these stand in for facts you could give instead.`,
        evidence: vagueHits,
        fix: 'Replace each with the actual number or the actual name.',
      },
      8
    );
  }

  const hedgeHits = countOccurrences(lower, HEDGES);
  if (hedgeHits.length >= 2) {
    add(
      {
        id: 'hedging',
        label: 'Hedged language',
        severity: 'warning',
        message: 'Hedging weakens claims you are entitled to make directly.',
        evidence: hedgeHits,
        fix: 'State the claim, or cut it.',
      },
      5
    );
  }

  // --------------------------------------------------------------------- fit
  const fitHits = countOccurrences(lower, FIT_MARKERS);
  if (fitHits.length === 0) {
    add(
      {
        id: 'no-fit',
        label: 'No link to the programme',
        severity: 'problem',
        message: 'Nothing in the letter shows you have looked at what this university or subject area actually offers.',
        evidence: [],
        fix: 'Name a specific laboratory, supervisor, course or research group and say why it matches your direction.',
      },
      15
    );
  } else {
    findings.push({
      id: 'fit-ok',
      label: 'Shows programme fit',
      severity: 'good',
      message: 'The letter connects your direction to something concrete at the destination.',
      evidence: fitHits.slice(0, 5),
    });
  }

  // ------------------------------------------------------------------ future
  const futureHits = countOccurrences(lower, FUTURE_MARKERS);
  if (futureHits.length === 0) {
    add(
      {
        id: 'no-future',
        label: 'No plan after the degree',
        severity: 'warning',
        message: 'The letter stops at admission. Reviewers want to know what the scholarship buys in the long run.',
        evidence: [],
        fix: 'Close with what you intend to do with the degree and where.',
      },
      10
    );
  } else {
    findings.push({
      id: 'future-ok',
      label: 'States what comes next',
      severity: 'good',
      message: 'You set out a direction beyond graduation.',
      evidence: futureHits.slice(0, 4),
    });
  }

  // ------------------------------------------------------------------- I-count
  const iStarts = sentences.filter((s) => /^I\b/.test(s)).length;
  if (sentenceCount >= 6 && iStarts / sentenceCount > 0.6) {
    add(
      {
        id: 'i-heavy',
        label: 'Almost every sentence starts with I',
        severity: 'warning',
        message: `${iStarts} of ${sentenceCount} sentences open with the word I, which flattens the rhythm.`,
        evidence: [],
        fix: 'Open some sentences with the work, the problem or the result instead.',
      },
      5
    );
  }

  // -------------------------------------------------------------- flattery
  if (/\b(honou?red|privileged|humbly|kindly request|esteemed)\b/i.test(text)) {
    add(
      {
        id: 'flattery',
        label: 'Deferential tone',
        severity: 'warning',
        message: 'Formal deference reads as padding in an academic competition.',
        evidence: [],
        fix: 'Write as a colleague proposing work, not as a petitioner.',
      },
      5
    );
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  const band: Review['band'] =
    score >= 85 ? 'Strong' : score >= 68 ? 'Competitive' : score >= 45 ? 'Workable draft' : 'Needs rewriting';

  const order: Record<Severity, number> = { problem: 0, warning: 1, good: 2 };
  findings.sort((a, b) => order[a.severity] - order[b.severity]);

  return {
    score,
    band,
    wordCount,
    sentenceCount,
    paragraphCount,
    avgSentenceWords,
    findings,
  };
}

export const LETTER_STRUCTURE_GUIDE = [
  {
    title: 'Paragraph 1 - the direction',
    detail:
      'Name the specific problem you want to work on. Not the field, the problem. One or two sentences.',
  },
  {
    title: 'Paragraph 2 - the evidence',
    detail:
      'What you have already done towards it. Projects, publications, competitions, work. Use numbers, and make sure every claim has a document behind it in your portfolio.',
  },
  {
    title: 'Paragraph 3 - the fit',
    detail:
      'Why this subject area and these universities. Name a laboratory, a supervisor, a course. Show you read something.',
  },
  {
    title: 'Paragraph 4 - what comes after',
    detail:
      'What you intend to do with the degree, and where. Make the scholarship look like an investment with a return.',
  },
];
