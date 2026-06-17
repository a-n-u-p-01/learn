import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../components/Toast.jsx';
import { useApplications } from '../hooks/useApplications.js';
import {
  addApplication,
  updateApplication,
  deleteApplication,
} from '../services/applications.js';
import StatusBadge, { STATUSES, STATUS_DOT } from '../components/StatusBadge.jsx';
import ApplicationModal from '../components/ApplicationModal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Spinner from '../components/Spinner.jsx';
import {
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  ExternalIcon,
  BriefcaseIcon,
} from '../components/Icons.jsx';

function fmtDate(d) {
  if (!d) return '—';
  const p = String(d).split('-');
  if (p.length !== 3) return d;
  return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const STAT_CARDS = [
  { key: 'Total', label: 'Total' },
  { key: 'Applied', label: 'Applied' },
  { key: 'Interviewing', label: 'Interviewing' },
  { key: 'Offer', label: 'Offers' },
  { key: 'Rejected', label: 'Rejected' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const toast = useToast();
  const { applications, loading } = useApplications();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const stats = useMemo(() => {
    const c = { Total: applications.length, Wishlist: 0, Applied: 0, Interviewing: 0, Offer: 0, Rejected: 0 };
    applications.forEach((a) => {
      if (c[a.status] != null) c[a.status] += 1;
    });
    return c;
  }, [applications]);

  const visible = useMemo(() => {
    const q = search.toLowerCase().trim();
    const list = applications.filter((a) => {
      const mq = !q || `${a.company} ${a.role || ''}`.toLowerCase().includes(q);
      const ms = !statusFilter || a.status === statusFilter;
      return mq && ms;
    });
    return [...list].sort((a, b) => {
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      const da = a.date || '';
      const db = b.date || '';
      return sortBy === 'date-asc' ? da.localeCompare(db) : db.localeCompare(da);
    });
  }, [applications, search, statusFilter, sortBy]);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (a) => {
    setEditing(a);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSave = async (data) => {
    if (editing) {
      await updateApplication(user.uid, editing.id, data);
      toast('Application updated');
    } else {
      await addApplication(user.uid, data);
      toast('Application added');
    }
    closeModal();
  };

  const handleDelete = async () => {
    if (!deleting) return;
    await deleteApplication(user.uid, deleting.id);
    toast('Application deleted');
    setDeleting(null);
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h2>Your applications</h2>
          <p>Every company you&apos;ve applied to, in one place.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <PlusIcon size={16} /> Add application
        </button>
      </div>

      <div className="stats">
        {STAT_CARDS.map((s) => (
          <div className="stat" key={s.key}>
            <div className="num">{stats[s.key] ?? 0}</div>
            <div className="lbl">
              {STATUS_DOT[s.key] && <span className="dot" style={{ background: STATUS_DOT[s.key] }} />}
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="toolbar">
        <div className="search">
          <SearchIcon size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or role…"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="company">Company A–Z</option>
        </select>
      </div>

      <div className="panel">
        {loading ? (
          <Spinner label="Loading applications…" />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<BriefcaseIcon size={40} />}
            title={applications.length ? 'No matches' : 'Nothing here yet'}
          >
            {applications.length
              ? 'Try a different search or filter.'
              : 'Add an application or browse the Companies tab.'}
          </EmptyState>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Applied</th>
                <th>Salary</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {visible.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div className="c-name">
                      {a.company}
                      {a.url && (
                        <a href={a.url} target="_blank" rel="noopener noreferrer" title="Open link">
                          <ExternalIcon />
                        </a>
                      )}
                    </div>
                    {a.location && <div className="sub">{a.location}</div>}
                  </td>
                  <td>{a.role || '—'}</td>
                  <td>
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="date">{fmtDate(a.date)}</td>
                  <td className="salary">{a.salary || '—'}</td>
                  <td>
                    <div className="row-actions">
                      <button className="act" onClick={() => openEdit(a)} title="Edit">
                        <EditIcon size={16} />
                      </button>
                      <button className="act del" onClick={() => setDeleting(a)} title="Delete">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ApplicationModal open={modalOpen} initial={editing} onSave={handleSave} onClose={closeModal} />
      <ConfirmDialog
        open={!!deleting}
        title="Delete application"
        message={
          deleting ? (
            <>
              Remove <b>{deleting.company}</b>
              {deleting.role ? ` — ${deleting.role}` : ''}? This can&apos;t be undone.
            </>
          ) : (
            ''
          )
        }
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </>
  );
}
