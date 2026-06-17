import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../components/Toast.jsx';
import { addApplication } from '../services/applications.js';
import { COMPANIES, countryOptions, stackOptions } from '../data/companies.js';
import { searchWiderDirectory } from '../services/companies.js';
import CompanyCard from '../components/CompanyCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Spinner from '../components/Spinner.jsx';
import { SearchIcon } from '../components/Icons.jsx';

const PAGE_SIZE = 12;

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

// Page-number list with ellipses, e.g. 1 … 4 5 [6] 7 8 … 20
function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push('…');
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push('…');
  out.push(total);
  return out;
}

export default function Companies() {
  const { user } = useAuth();
  const toast = useToast();
  const countries = useMemo(() => countryOptions(), []);
  const stacks = useMemo(() => stackOptions(), []);

  const [country, setCountry] = useState('All');
  const [stack, setStack] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Optional live "wider directory" results.
  const [wide, setWide] = useState(null); // { list, source } | null
  const [wideLoading, setWideLoading] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return COMPANIES.filter((c) => {
      const mc = country === 'All' || c.country === country;
      const ms = stack === 'All' || (c.tags || []).includes(stack);
      const mq =
        !q || `${c.name} ${c.industry} ${c.country} ${(c.tags || []).join(' ')}`.toLowerCase().includes(q);
      return mc && ms && mq;
    });
  }, [country, stack, search]);

  // Reset to page 1 whenever the filter/search changes.
  useEffect(() => {
    setPage(1);
    setWide(null);
  }, [country, stack, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const goto = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToTracker = async (c) => {
    try {
      await addApplication(user.uid, {
        company: c.name,
        role: 'Backend Engineer — Java/Spring Boot',
        status: 'Wishlist',
        date: todayISO(),
        location: c.country || '',
        salary: '',
        url: c.website || '',
        notes: 'Added from the Companies directory.',
      });
      toast(`Added ${c.name} to your tracker`);
    } catch (e) {
      toast('Could not add — please try again');
    }
  };

  const runWiderSearch = async () => {
    setWideLoading(true);
    const res = await searchWiderDirectory(search.trim());
    // Hide companies already in the curated results.
    const known = new Set(filtered.map((c) => c.name.toLowerCase()));
    setWide({
      list: res.companies.filter((c) => !known.has(c.name.toLowerCase())),
      source: res.source,
    });
    setWideLoading(false);
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h2>Companies</h2>
          <p>{COMPANIES.length} verified companies worldwide — browse, filter by country, or search.</p>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <SearchIcon size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies, industry, stack…"
          />
        </div>
        <select value={stack} onChange={(e) => setStack(e.target.value)} aria-label="Filter by stack">
          {stacks.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All stacks' : s}
            </option>
          ))}
        </select>
      </div>

      <div className="chips">
        {countries.map((c) => (
          <button
            key={c}
            className={'chip' + (c === country ? ' active' : '')}
            onClick={() => setCountry(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No companies found">Try a different country or search term.</EmptyState>
      ) : (
        <>
          <div className="result-count">
            {filtered.length} {filtered.length === 1 ? 'company' : 'companies'}
            {country !== 'All' ? ` in ${country}` : ''} · page {page} of {totalPages}
          </div>
          <div className="grid">
            {pageItems.map((c) => (
              <CompanyCard key={c.name} company={c} onAdd={addToTracker} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" disabled={page === 1} onClick={() => goto(page - 1)}>
                ‹ Prev
              </button>
              {pageList(page, totalPages).map((p, i) =>
                p === '…' ? (
                  <span key={`e${i}`} className="page-ellipsis">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    className={'page-btn' + (p === page ? ' active' : '')}
                    onClick={() => goto(p)}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                className="page-btn"
                disabled={page === totalPages}
                onClick={() => goto(page + 1)}
              >
                Next ›
              </button>
            </div>
          )}
        </>
      )}

      {/* Optional: reach the long tail live, only when the user asks. */}
      {search.trim().length >= 2 && (
        <div className="wider">
          {!wide && !wideLoading && (
            <button className="btn btn-ghost" onClick={runWiderSearch}>
              Can&apos;t find it? Search the worldwide directory →
            </button>
          )}
          {wideLoading && <Spinner label={`Searching the worldwide directory…`} />}
          {wide && (
            <>
              <div className="result-count">
                {wide.list.length} more from the worldwide directory
                {wide.source === 'fallback' ? ' (offline match)' : ''}
              </div>
              {wide.list.length > 0 && (
                <div className="grid">
                  {wide.list.map((c) => (
                    <CompanyCard key={c.id || c.name} company={c} onAdd={addToTracker} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
