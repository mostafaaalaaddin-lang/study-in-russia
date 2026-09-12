/**
 * Single place to edit who made this and how to reach them.
 * Change these values and every page that credits the author updates.
 */
export const SITE = {
  name: 'Study in Russia',
  author: 'Mostafa Darwish',
  role: 'Prospective international applicant and the builder of this site',
  /** Leave a field empty to hide it from the About page and the footer. */
  email: 'mostafaa.alaaddin@gmail.com',
  github: '',
  linkedin: '',
  location: '',
  year: 2026,
};

export const ABOUT = {
  why: [
    'I built this while preparing my own application to study in Russia. Every guide I found stopped at the phrase "fully funded" and left the expensive questions unanswered: what the award actually pays for, what it quietly leaves with you, and what a month in the city you end up in really costs.',
    'So I collected the official rules from the programme sites themselves, turned the cost of living in eight university cities into numbers you can compare, and built the three tools I wanted while applying: something that matches a profile to a route, something that answers a question with its source attached, and something that tells you honestly whether your motivation letter is doing any work.',
  ],
  principles: [
    {
      title: 'Every claim carries its source',
      detail:
        'Deadlines, age limits, coverage and rules come from the official programme sites, and each record links back to the page it came from. Nothing here is repeated from a third-party blog.',
    },
    {
      title: 'Cost figures are labelled as estimates',
      detail:
        'Rents and prices move. The cost bands are planning figures, clearly marked as such on every page that uses them, and never presented as quotes.',
    },
    {
      title: 'Nothing you type leaves your browser',
      detail:
        'The letter you paste, the profile you build, the budget you set and the checklist you tick are stored in your own browser and are never uploaded, tracked or shared.',
    },
    {
      title: 'The assistant will not invent an answer',
      detail:
        'It matches your question against written, sourced entries. When nothing matches, it says nothing matched instead of guessing a deadline you might act on.',
    },
  ],
  build: [
    { label: 'Framework', value: 'Next.js with the App Router' },
    { label: 'Language', value: 'TypeScript throughout, no untyped data' },
    { label: 'Styling', value: 'Tailwind CSS with a token-driven light and dark palette' },
    { label: 'Data', value: 'Typed records in a data layer, separate from every component' },
    { label: 'Assistant', value: 'Three rules engines running locally, no external API' },
    { label: 'Hosting', value: 'Exports to static files, so it runs anywhere' },
  ],
};
