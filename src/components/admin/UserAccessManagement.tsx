import React, { useState, useEffect } from 'react';
import { Shield, CreditCard as Edit2, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AdminUser {
  id: string;
  profile_id: string;
  access_level: 'admin' | 'editor' | 'viewer';
  profile: {
    email: string;
    full_name: string | null;
  };
}

const UserAccessManagement: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select(`
          id,
          profile_id,
          access_level,
          profile:profiles(email, full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdminUsers(data as any);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAccessLevel = async (
    adminUserId: string,
    newAccessLevel: 'admin' | 'editor' | 'viewer'
  ) => {
    setError(null);
    setSuccess(null);

    try {
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({ access_level: newAccessLevel })
        .eq('id', adminUserId);

      if (updateError) throw updateError;

      setSuccess('Access level updated successfully');
      setEditingUser(null);
      fetchAdminUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const accessLevelInfo = {
    admin: {
      label: 'Admin',
      description: 'Full access to all features and settings',
      color: 'purple',
      permissions: [
        'Create, read, update, and delete admin users',
        'Modify access levels and permissions',
        'Full access to business user management',
        'Impersonate and manage user accounts',
        'View and manage all subscriptions',
        'Access all reports and analytics',
      ],
    },
    editor: {
      label: 'Editor',
      description: 'Limited access to modify content and users',
      color: 'blue',
      permissions: [
        'View admin users (no modifications)',
        'Add and edit business users',
        'View and update subscriptions',
        'Access reports (read-only)',
        'Cannot delete users or modify permissions',
      ],
    },
    viewer: {
      label: 'Viewer',
      description: 'View-only access to all data',
      color: 'gray',
      permissions: [
        'View admin users',
        'View business users',
        'View subscription information',
        'Access reports and analytics',
        'Cannot create, update, or delete any data',
      ],
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Access Management</h2>
        <p className="text-gray-600 mt-1">Define admin types and access levels</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {Object.entries(accessLevelInfo).map(([level, info]) => (
          <div key={level} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Shield
                className={`w-6 h-6 mr-3 ${
                  info.color === 'purple'
                    ? 'text-purple-600'
                    : info.color === 'blue'
                    ? 'text-blue-600'
                    : 'text-gray-600'
                }`}
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{info.label}</h3>
                <p className="text-sm text-gray-500">{info.description}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
              <ul className="space-y-1">
                {info.permissions.map((permission, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="mr-2 mt-1">•</span>
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Current Admin Users</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Access Level
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {adminUsers.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No admin users found.
                </td>
              </tr>
            ) : (
              adminUsers.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {admin.profile.full_name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">{admin.profile.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {editingUser === admin.id ? (
                      <select
                        value={admin.access_level}
                        onChange={(e) =>
                          handleUpdateAccessLevel(
                            admin.id,
                            e.target.value as 'admin' | 'editor' | 'viewer'
                          )
                        }
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="viewer">Viewer - View only</option>
                        <option value="editor">Editor - Limited access</option>
                        <option value="admin">Admin - Full access</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          admin.access_level === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : admin.access_level === 'editor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {accessLevelInfo[admin.access_level].label}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() =>
                        setEditingUser(editingUser === admin.id ? null : admin.id)
                      }
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      {editingUser === admin.id ? 'Cancel' : 'Edit'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAccessManagement;
