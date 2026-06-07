import { useEffect, useState } from 'react';
import { buildApiUrl, extractCollection } from '../lib/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));
        if (!response.ok) {
          throw new Error(`Failed to fetch activities (${response.status})`);
        }
        const payload = await response.json();
        if (mounted) {
          setActivities(extractCollection(payload));
        }
      } catch (requestError) {
        if (mounted) {
          setError(requestError instanceof Error ? requestError.message : 'Unknown activities error');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadActivities();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="panel card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        {loading && <p className="text-muted">Loading activities...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id ?? activity.id ?? `${activity.activityType}-${activity.completedAt}`}>
                    <td>{activity.activityType ?? 'N/A'}</td>
                    <td>{activity.durationMinutes ?? 0} min</td>
                    <td>{activity.caloriesBurned ?? 0}</td>
                    <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleString() : 'N/A'}</td>
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

export default Activities;
