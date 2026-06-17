export const STATUSES = ['Wishlist', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

export const STATUS_DOT = {
  Wishlist: '#94a3b8',
  Applied: '#3b82f6',
  Interviewing: '#f59e0b',
  Offer: '#10b981',
  Rejected: '#ef4444',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`badge s-${status}`}>
      <span className="d" />
      {status}
    </span>
  );
}
