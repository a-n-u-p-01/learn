import { COMPANIES } from '../data/companies.js';

/*
 * The default Companies view uses the bundled curated list (instant, verified —
 * see src/data/companies.js). This module only powers the OPTIONAL on-demand
 * "search the wider directory" action, which queries Wikidata's EntitySearch
 * (free, no API key) for the long tail of companies not in the curated list.
 */
const ENDPOINT = 'https://query.wikidata.org/sparql';

function thumb(url, width = 96) {
  if (!url) return null;
  let u = url.replace(/^http:\/\//, 'https://');
  if (u.includes('Special:FilePath')) u += (u.includes('?') ? '&' : '?') + 'width=' + width;
  return u;
}

function parseRows(bindings) {
  const seen = new Set();
  const out = [];
  for (const b of bindings) {
    const uri = b.company && b.company.value;
    const name = b.companyLabel && b.companyLabel.value;
    if (!uri || !name || /^Q\d+$/.test(name)) continue;
    if (seen.has(uri)) continue;
    seen.add(uri);
    out.push({
      id: uri.split('/').pop(),
      name,
      employees: b.employees ? Math.round(Number(b.employees.value)) : null,
      website: (b.website && b.website.value) || null,
      logo: thumb(b.logo && b.logo.value),
      country: (b.countryLabel && b.countryLabel.value) || '',
      industry: (b.industryLabel && b.industryLabel.value) || '',
      live: true,
    });
  }
  return out;
}

function searchSparql(term) {
  const safe = term.replace(/["\\]/g, ' ').slice(0, 60);
  return `SELECT DISTINCT ?company ?companyLabel ?employees ?website ?logo ?countryLabel ?industryLabel WHERE {
  SERVICE wikibase:mwapi {
    bd:serviceParam wikibase:api "EntitySearch" .
    bd:serviceParam wikibase:endpoint "www.wikidata.org" .
    bd:serviceParam mwapi:search "${safe}" .
    bd:serviceParam mwapi:language "en" .
    bd:serviceParam mwapi:limit "50" .
    ?company wikibase:apiOutputItem mwapi:item .
  }
  VALUES ?root { wd:Q4830453 wd:Q783794 wd:Q6881511 wd:Q891723 }
  ?company wdt:P31/wdt:P279* ?root .
  ?company rdfs:label ?companyLabel . FILTER(LANG(?companyLabel) = "en")
  OPTIONAL { ?company wdt:P1128 ?employees. }
  OPTIONAL { ?company wdt:P856 ?website. }
  OPTIONAL { ?company wdt:P154 ?logo. }
  OPTIONAL { ?company wdt:P17 ?c. ?c rdfs:label ?countryLabel. FILTER(LANG(?countryLabel) = "en") }
  OPTIONAL { ?company wdt:P452 ?i. ?i rdfs:label ?industryLabel. FILTER(LANG(?industryLabel) = "en") }
}
LIMIT 40`;
}

/** Live, on-demand search across Wikidata. Falls back to the curated list. */
export async function searchWiderDirectory(term) {
  try {
    const url = ENDPOINT + '?format=json&query=' + encodeURIComponent(searchSparql(term));
    const res = await fetch(url, { headers: { Accept: 'application/sparql-results+json' } });
    if (!res.ok) throw new Error('Wikidata HTTP ' + res.status);
    const json = await res.json();
    const companies = parseRows(json.results.bindings);
    companies.sort((a, b) => (b.employees || 0) - (a.employees || 0));
    return { companies, source: 'live' };
  } catch (err) {
    const q = term.toLowerCase();
    return {
      companies: COMPANIES.filter((c) => c.name.toLowerCase().includes(q)),
      source: 'fallback',
      error: err.message,
    };
  }
}

export function formatEmployees(n) {
  if (!n) return null;
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 ? 1 : 0) + 'M';
  if (n >= 1000) return Math.round(n / 1000) + 'K';
  return String(n);
}
