import { Component } from 'react';

/** Catches uncaught render errors so a single failure can't blank the app. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[JobTrack] Uncaught error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="notfound">
          <h1>Oops</h1>
          <p>Something went wrong. Reloading usually fixes it.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
