import { SCHOLARSHIPS, type Scholarship } from '@/data/scholarships';
import { UNIVERSITIES, type University } from '@/data/universities';
import { CITIES, CITY_BY_ID, type City } from '@/data/cities';
import { TRACKS, type TrackId } from '@/data/openDoors';

export type Profile = {
  level: TrackId;
  age: number;
  subjectArea: string;
  monthlyBudgetRub: number;
  language: 'english' | 'russian' | 'either';
  priority: 'cost' | 'reputation' | 'research' | 'english';
  achievements: 'none' | 'some' | 'strong';
  russianLevel: 'none' | 'basic' | 'working';
  climateTolerance: 'mild' | 'any';
};

export const DEFAULT_PROFILE: Profile = {
  level: 'master',
  age: 24,
  subjectArea: 'computer-science',
  monthlyBudgetRub: 35000,
  language: 'english',
  priority: 'reputation',
  achievements: 'some',
  russianLevel: 'none',
  climateTolerance: 'any',
};

export type Verdict = 'Eligible' | 'Check carefully' | 'Not eligible';

export type ScholarshipMatch = {
  scholarship: Scholarship;
  verdict: Verdict;
  score: number;
  reasons: string[];
  blockers: string[];
};

const LEVEL_TO_SCHOLARSHIP_LEVEL: Record<TrackId, string> = {
  bachelor: 'Bachelor',
  master: 'Master',
  doctoral: 'PhD',
  postdoc: 'Postdoctoral',
};

export function matchScholarships(p: Profile): ScholarshipMatch[] {
  return SCHOLARSHIPS.map((s) => {
    const reasons: string[] = [];
    const blockers: string[] = [];
    let score = 40;

    const wantedLevel = LEVEL_TO_SCHOLARSHIP_LEVEL[p.level];
    if (!s.levels.includes(wantedLevel as never)) {
      blockers.push(`No route at ${wantedLevel} level.`);
    } else {
      score += 20;
    }

    if (s.id === 'open-doors') {
      const track = TRACKS.find((t) => t.id === p.level);
      if (track) {
        if (p.age < track.minAge || p.age > track.maxAge) {
          blockers.push(
            `The ${track.name.toLowerCase()} accepts ages ${track.minAge} to ${track.maxAge}, and you entered ${p.age}.`
          );
        } else {
          reasons.push(`Your age fits the ${track.name.toLowerCase()} band of ${track.minAge} to ${track.maxAge}.`);
          score += 15;
        }
      }
      if (p.achievements === 'strong') {
        reasons.push('A documented achievement record is what the portfolio stage rewards most.');
        score += 20;
      } else if (p.achievements === 'some') {
        reasons.push('Some evidenced achievements will help, but the portfolio is where this is won or lost.');
        score += 8;
      } else {
        reasons.push('With no documented achievements yet, the entry test and motivation letter carry all the weight.');
        score -= 5;
      }
      if (p.language === 'english') {
        reasons.push('You may submit the portfolio in English, and most participating universities teach some programmes in English.');
        score += 5;
      }
      reasons.push('Free to enter, and judged on merit rather than a country allocation.');
      score += 10;
    }

    if (s.id === 'government-quota') {
      if (p.russianLevel === 'none') {
        reasons.push('A funded preparatory year of Russian is normally included, which suits you.');
        score += 8;
      } else {
        reasons.push('Existing Russian lets you skip or shorten the preparatory year.');
        score += 12;
      }
      if (p.language === 'english') {
        reasons.push('Most quota places lead to Russian-taught programmes, so check English availability carefully.');
        score -= 5;
      }
      reasons.push('The largest single source of funded places, at roughly 15,000 a year worldwide.');
      score += 12;
    }

    if (s.id === 'preparatory-year') {
      if (p.russianLevel === 'none' && p.language !== 'english') {
        reasons.push('You have no Russian and are open to Russian-taught study, which is exactly what this year is for.');
        score += 18;
      } else if (p.language === 'english') {
        reasons.push('Less relevant if you intend to study in English throughout.');
        score -= 12;
      }
    }

    if (s.id === 'university-scholarships') {
      if (p.monthlyBudgetRub >= 45000) {
        reasons.push('With a larger budget, a partial discount plus self-funding is a realistic fallback.');
        score += 12;
      } else {
        reasons.push('Only useful as a fallback if you can cover the remaining tuition yourself.');
        score -= 8;
      }
      if (p.language === 'english') {
        reasons.push('The universities with the biggest English catalogues also run the best discount schemes.');
        score += 6;
      }
    }

    if (s.id === 'academic-excellence') {
      reasons.push('Not an entry route. Worth knowing about once you are already enrolled.');
      score -= 15;
    }

    if (s.id === 'bilateral') {
      reasons.push('Often overlooked because it is announced by your own ministry, not by a Russian portal.');
      score += 4;
    }

    if (s.coverage.tuition === 'Full') score += 10;
    if (s.competitiveness === 'Very high') score -= 4;

    const verdict: Verdict = blockers.length
      ? 'Not eligible'
      : s.id === 'academic-excellence'
        ? 'Check carefully'
        : 'Eligible';

    return {
      scholarship: s,
      verdict,
      score: blockers.length ? Math.min(score, 20) : Math.max(0, Math.min(100, score)),
      reasons,
      blockers,
    };
  }).sort((a, b) => b.score - a.score);
}

export type UniversityMatch = {
  university: University;
  city: City;
  score: number;
  reasons: string[];
  cautions: string[];
  /** Estimated monthly living cost in this city on the cheapest realistic setup. */
  monthlyFloorRub: number;
};

function dormFloor(city: City): number {
  const c = city.costs;
  return c.dorm.min + c.food.min + c.transport + c.connectivity + c.misc.min;
}

export function matchUniversities(p: Profile, limit = 6): UniversityMatch[] {
  return UNIVERSITIES.map((u) => {
    const city = CITY_BY_ID[u.cityId];
    const reasons: string[] = [];
    const cautions: string[] = [];
    let score = 30;

    if (u.subjectAreas.includes(p.subjectArea)) {
      reasons.push('Teaches in your chosen subject area.');
      score += 25;
    } else {
      score -= 18;
    }

    if (u.openDoorsParticipant) {
      reasons.push('Participates in Open Doors, so a win can place you here.');
      score += 15;
    } else {
      cautions.push('Not an Open Doors participant, so reachable only through the quota or self-funding.');
      score -= 10;
    }

    if (p.language === 'english') {
      if (u.englishTaught === 'Extensive') {
        reasons.push('Large catalogue of English-taught programmes.');
        score += 20;
      } else if (u.englishTaught === 'Some') {
        score += 5;
        cautions.push('Only some programmes run in English. Confirm yours does.');
      } else {
        cautions.push('Teaching is almost entirely in Russian.');
        score -= 20;
      }
    }

    const floor = dormFloor(city);
    if (floor <= p.monthlyBudgetRub) {
      reasons.push('Dormitory living here fits inside your stated budget.');
      score += 15;
    } else {
      cautions.push('Even dormitory living here runs above your stated budget.');
      score -= 20;
    }

    if (p.priority === 'cost') {
      score += Math.round((60000 - floor) / 1200);
      if (floor < 25000) reasons.push('One of the cheapest cities in this dataset.');
    }
    if (p.priority === 'reputation') {
      if (u.reputation === 'Global') {
        score += 18;
        reasons.push('Globally recognised name.');
      } else if (u.reputation === 'National') score += 8;
    }
    if (p.priority === 'research') {
      if (['mipt', 'nsu', 'itmo', 'msu', 'spbu'].includes(u.id)) {
        score += 18;
        reasons.push('Strong research output and direct access to research groups.');
      }
    }
    if (p.priority === 'english' && u.englishTaught === 'Extensive') {
      score += 15;
    }

    if (p.climateTolerance === 'mild') {
      if (city.climate.winterLowC <= -15) {
        cautions.push(`Winter lows near ${city.climate.winterLowC} degrees.`);
        score -= 18;
      } else if (city.climate.winterLowC >= -8) {
        reasons.push('Comparatively mild winters.');
        score += 10;
      }
    }

    if (p.level === 'doctoral' || p.level === 'postdoc') {
      if (['mipt', 'nsu', 'msu', 'spbu', 'itmo', 'misis'].includes(u.id)) {
        score += 10;
        reasons.push('Established doctoral supervision in this field.');
      }
    }

    return {
      university: u,
      city,
      score: Math.max(0, Math.min(100, score)),
      reasons,
      cautions,
      monthlyFloorRub: floor,
    };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export type CityMatch = {
  city: City;
  score: number;
  monthlyFloorRub: number;
  reason: string;
};

export function matchCities(p: Profile, limit = 3): CityMatch[] {
  return CITIES.map((city) => {
    const floor = dormFloor(city);
    let score = 50;
    let reason = '';

    if (floor <= p.monthlyBudgetRub) {
      score += 25;
      reason = 'Fits your budget with room to spare.';
    } else {
      score -= 25;
      reason = 'Above your stated budget even in a dormitory.';
    }

    if (p.priority === 'cost') {
      score += Math.round((60000 - floor) / 1000);
      if (floor < 25000) reason = 'Among the lowest living costs in the country.';
    }

    if (p.climateTolerance === 'mild') {
      if (city.climate.winterLowC <= -15) score -= 25;
      else if (city.climate.winterLowC >= -8) {
        score += 15;
        reason = 'Mild winters and low costs.';
      }
    }

    const hasSubject = city.universities.some((id) => {
      const u = UNIVERSITIES.find((x) => x.id === id);
      return u?.subjectAreas.includes(p.subjectArea);
    });
    if (hasSubject) score += 20;
    else score -= 15;

    return { city, score: Math.max(0, Math.min(100, score)), monthlyFloorRub: floor, reason };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
