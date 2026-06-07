import { useEffect, useState } from 'react';
import { buildApiUrl, extractCollection } from '../lib/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'));
        if (!response.ok) {
          throw new Error(`Failed to fetch teams (${response.status})`);
        }
        const payload = await response.json();
        if (mounted) {
          setTeams(extractCollection(payload));
        }
      } catch (requestError) {
        if (mounted) {
          setError(requestError instanceof Error ? requestError.message : 'Unknown teams error');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadTeams();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="panel card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        {loading && <p className="text-muted">Loading teams...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush">
            {teams.map((team) => (
              <li className="list-group-item px-0" key={team._id ?? team.id ?? team.name}>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <strong>{team.name ?? 'Unnamed Team'}</strong>
                  <span className="badge text-bg-dark rounded-pill">
                    Members: {Array.isArray(team.members) ? team.members.length : 0}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Teams;
