import { useEffect, useState } from 'react';
import { buildApiUrl, extractCollection } from '../lib/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'));
        if (!response.ok) {
          throw new Error(`Failed to fetch workouts (${response.status})`);
        }
        const payload = await response.json();
        if (mounted) {
          setWorkouts(extractCollection(payload));
        }
      } catch (requestError) {
        if (mounted) {
          setError(requestError instanceof Error ? requestError.message : 'Unknown workouts error');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadWorkouts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="panel card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        {loading && <p className="text-muted">Loading workouts...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-12 col-md-6" key={workout._id ?? workout.id ?? workout.title}>
                <article className="workout-card h-100 p-3 rounded-3 border">
                  <h3 className="h6 mb-2">{workout.title ?? 'Untitled workout'}</h3>
                  <p className="mb-1"><strong>Level:</strong> {workout.level ?? 'N/A'}</p>
                  <p className="mb-1"><strong>Focus:</strong> {workout.focusArea ?? 'N/A'}</p>
                  <p className="mb-0"><strong>Duration:</strong> {workout.suggestedDurationMinutes ?? 0} min</p>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
