import { useEffect, useState } from 'react';
import { buildApiUrl, extractCollection } from '../lib/api';

function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard (${response.status})`);
        }
        const payload = await response.json();
        if (mounted) {
          setRows(extractCollection(payload));
        }
      } catch (requestError) {
        if (mounted) {
          setError(requestError instanceof Error ? requestError.message : 'Unknown leaderboard error');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadLeaderboard();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="panel card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {loading && <p className="text-muted">Loading leaderboard...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User ID</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row._id ?? row.id ?? `${row.user}-${row.rank}`}>
                    <td>{row.rank ?? '-'}</td>
                    <td>{row.user ?? 'N/A'}</td>
                    <td>{row.points ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
