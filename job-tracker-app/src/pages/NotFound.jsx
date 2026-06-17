import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>This page took a different career path.</p>
      <Link className="btn btn-primary" to="/">
        Back to tracker
      </Link>
    </div>
  );
}
