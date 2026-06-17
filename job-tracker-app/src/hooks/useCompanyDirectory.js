import { useEffect, useRef, useState } from 'react';
import { fetchTopCompanies, searchCompanies } from '../services/companies.js';

/**
 * Drives the Companies page:
 *  - browse: top companies for the selected country (cached, ranked)
 *  - search: debounced full-text search across all of Wikidata
 */
export function useCompanyDirectory() {
  const [countryQid, setCountryQid] = useState(null);
  const [browse, setBrowse] = useState({ list: [], loading: true, source: null });
  const [term, setTerm] = useState('');
  const [search, setSearch] = useState({ list: [], loading: false, active: false });
  const timer = useRef(null);

  // Browse list — reloads when the country changes.
  useEffect(() => {
    let cancelled = false;
    setBrowse((b) => ({ ...b, loading: true }));
    fetchTopCompanies({ countryQid }).then((res) => {
      if (!cancelled) setBrowse({ list: res.companies, loading: false, source: res.source });
    });
    return () => {
      cancelled = true;
    };
  }, [countryQid]);

  // Debounced search.
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    const q = term.trim();
    if (q.length < 2) {
      setSearch({ list: [], loading: false, active: false });
      return undefined;
    }
    setSearch((s) => ({ ...s, loading: true, active: true }));
    timer.current = setTimeout(async () => {
      const res = await searchCompanies(q);
      setSearch({ list: res.companies, loading: false, active: true });
    }, 350);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [term]);

  return { countryQid, setCountryQid, browse, term, setTerm, search };
}
