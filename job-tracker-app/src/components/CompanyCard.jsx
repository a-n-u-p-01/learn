import { useState } from 'react';
import { PinIcon, ExternalIcon, PlusIcon } from './Icons.jsx';
import { formatEmployees } from '../services/companies.js';

function monogram(name) {
  return name
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function hueFromName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return `hsl(${h}, 52%, 42%)`;
}

// Two-level TLDs so we keep e.g. sbi.co.in / ifood.com.br intact.
const TLD2 = new Set(['co.in', 'co.uk', 'com.br', 'co.jp', 'com.au', 'co.kr', 'com.sg', 'com.cn']);
const SUBS = new Set([
  'www', 'careers', 'career', 'jobs', 'job', 'work', 'works', 'recruit', 'talent',
  'about', 'global', 'group', 'corporate', 'en', 'life', 'home', 'international', 'carreiras',
]);
const NAME_SUFFIX = ['careers', 'career', 'jobs', 'job'];

// Derive the brand root domain from a (possibly careers) URL, for logo lookup.
// e.g. careers.swiggy.com → swiggy.com, flipkartcareers.com → flipkart.com
function logoDomain(website) {
  if (!website) return null;
  try {
    let parts = new URL(website).hostname.toLowerCase().split('.');
    while (parts.length > 2 && SUBS.has(parts[0])) parts.shift();
    let tld, sld;
    if (parts.length >= 3 && TLD2.has(parts.slice(-2).join('.'))) {
      tld = parts.slice(-2).join('.');
      sld = parts[parts.length - 3];
    } else {
      tld = parts[parts.length - 1];
      sld = parts[parts.length - 2];
    }
    for (const suf of NAME_SUFFIX) {
      if (sld.length > suf.length && sld.endsWith(suf)) {
        sld = sld.slice(0, -suf.length);
        break;
      }
    }
    return `${sld}.${tld}`;
  } catch (e) {
    return null;
  }
}

export default function CompanyCard({ company, onAdd }) {
  const domain = logoDomain(company.website);
  // Fallback chain: explicit logo → DuckDuckGo → Google favicons → monogram.
  // Both icon services 404 on a miss, so onError advances to the next source.
  const sources = [];
  if (company.logo) sources.push(company.logo);
  if (domain) {
    sources.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);
    sources.push(`https://www.google.com/s2/favicons?sz=128&domain=${domain}`);
  }
  const [srcIdx, setSrcIdx] = useState(0);
  const logoSrc = srcIdx < sources.length ? sources[srcIdx] : null;

  const emp = formatEmployees(company.employees);
  const bg = company.color || hueFromName(company.name);

  return (
    <div className="ccard">
      <div className="ccard-top">
        {company.rank ? <span className="rank">#{company.rank}</span> : null}
        {logoSrc ? (
          <span className="mark logo-mark">
            <img src={logoSrc} alt="" loading="lazy" onError={() => setSrcIdx((i) => i + 1)} />
          </span>
        ) : (
          <span className="mark" style={{ background: bg }}>
            {monogram(company.name)}
          </span>
        )}
        <div className="ccard-id">
          <h3 title={company.name}>{company.name}</h3>
          <div className="ctype">{company.industry || '—'}</div>
        </div>
      </div>

      {company.note && <p className="note">{company.note}</p>}

      {company.tags && company.tags.length ? (
        <div className="tags">
          {company.tags.slice(0, 4).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      ) : null}

      <div className="cfoot">
        <span className="region">
          <PinIcon />
          {company.country}
          {emp ? ` · ${emp} staff` : ''}
        </span>
        <span className="spacer" />
        {company.website && (
          <a className="link-btn" href={company.website} target="_blank" rel="noopener noreferrer">
            Site <ExternalIcon />
          </a>
        )}
        <button className="add-mini" onClick={() => onAdd(company)} title="Add to tracker">
          <PlusIcon size={14} /> Track
        </button>
      </div>
    </div>
  );
}
