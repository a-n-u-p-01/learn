import { useEffect, useState } from 'react';
import { STATUSES } from './StatusBadge.jsx';
import { CloseIcon } from './Icons.jsx';

const EMPTY = {
  company: '',
  role: '',
  status: 'Applied',
  date: '',
  location: '',
  salary: '',
  url: '',
  notes: '',
};

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

export default function ApplicationModal({ open, initial, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...EMPTY, ...initial } : { ...EMPTY, date: todayISO() });
      setSaving(false);
    }
  }, [open, initial]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.company.trim()) return;
    setSaving(true);
    try {
      await onSave({ ...form, company: form.company.trim() });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <h2>{initial ? 'Edit application' : 'Add application'}</h2>
          <button className="act" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="modal-body">
            <div className="field">
              <label>
                Company <span className="req">*</span>
              </label>
              <input autoFocus value={form.company} onChange={set('company')} placeholder="e.g. Stripe" required />
            </div>
            <div className="field">
              <label>Role / Position</label>
              <input value={form.role} onChange={set('role')} placeholder="e.g. Backend Engineer" />
            </div>
            <div className="grid2">
              <div className="field">
                <label>Status</label>
                <select value={form.status} onChange={set('status')}>
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Date applied</label>
                <input type="date" value={form.date} onChange={set('date')} />
              </div>
            </div>
            <div className="grid2">
              <div className="field">
                <label>Location</label>
                <input value={form.location} onChange={set('location')} placeholder="Remote · City" />
              </div>
              <div className="field">
                <label>Salary</label>
                <input value={form.salary} onChange={set('salary')} placeholder="e.g. $120k" />
              </div>
            </div>
            <div className="field">
              <label>Job link</label>
              <input type="url" value={form.url} onChange={set('url')} placeholder="https://…" />
            </div>
            <div className="field">
              <label>Notes</label>
              <textarea value={form.notes} onChange={set('notes')} placeholder="Contacts, next steps, reminders…" />
            </div>
          </div>
          <div className="modal-foot">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
