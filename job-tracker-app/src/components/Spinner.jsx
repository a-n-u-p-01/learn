export default function Spinner({ full = false, label }) {
  return (
    <div className={full ? 'spinner-full' : 'spinner-inline'}>
      <span className="spinner" />
      {label && <span className="spinner-label">{label}</span>}
    </div>
  );
}
