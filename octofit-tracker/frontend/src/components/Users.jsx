import { useEffect, useState } from 'react';
import { buildApiUrl, extractCollection } from '../lib/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));
        if (!response.ok) {
          throw new Error(`Failed to fetch users (${response.status})`);
        }
        const payload = await response.json();
        if (mounted) {
          setUsers(extractCollection(payload));
        }
      } catch (requestError) {
        if (mounted) {
          setError(requestError instanceof Error ? requestError.message : 'Unknown users error');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="panel card border-0 shadow-sm">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        {loading && <p className="text-muted">Loading users...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Display Name</th>
                  <th>Email</th>
                  <th>Fitness Level</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id ?? user.id ?? user.username}>
                    <td>{user.username ?? 'N/A'}</td>
                    <td>{user.profile?.displayName ?? 'N/A'}</td>
                    <td>{user.email ?? 'N/A'}</td>
                    <td>{user.profile?.fitnessLevel ?? 'N/A'}</td>
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

export default Users;
