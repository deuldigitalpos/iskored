import React, { useState, useEffect } from 'react';
import { UserPlus, LogIn, CreditCard, Power, PowerOff, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface BusinessUser {
  id: string;
  profile_id: string;
  subscription_status: 'active' | 'inactive';
  subscription_plan: string | null;
  account_status: 'active' | 'deactivated';
  created_at: string;
  profile: {
    email: string;
    full_name: string | null;
  };
}

const BusinessManagement: React.FC = () => {
  const { profile } = useAuth();
  const [businessUsers, setBusinessUsers] = useState<BusinessUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<BusinessUser | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    subscriptionPlan: 'basic',
  });
  const [subscriptionData, setSubscriptionData] = useState({
    plan: '',
    status: 'active' as 'active' | 'inactive',
  });

  useEffect(() => {
    fetchBusinessUsers();
  }, []);

  const fetchBusinessUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('business_users')
        .select(`
          id,
          profile_id,
          subscription_status,
          subscription_plan,
          account_status,
          created_at,
          profile:profiles(email, full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBusinessUsers(data as any);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBusinessUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: 'user',
          },
        },
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        const { error: businessUserError } = await supabase
          .from('business_users')
          .insert({
            profile_id: authData.user.id,
            subscription_plan: formData.subscriptionPlan,
            subscription_status: 'active',
            account_status: 'active',
            created_by: profile?.id,
          });

        if (businessUserError) throw businessUserError;

        await logActivity('user_created', authData.user.id, {
          subscription_plan: formData.subscriptionPlan,
        });

        setSuccess('Business user added successfully');
        setShowAddModal(false);
        setFormData({
          email: '',
          password: '',
          fullName: '',
          subscriptionPlan: 'basic',
        });
        fetchBusinessUsers();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setError(null);
    setSuccess(null);

    try {
      const { error: updateError } = await supabase
        .from('business_users')
        .update({
          subscription_plan: subscriptionData.plan,
          subscription_status: subscriptionData.status,
        })
        .eq('id', selectedUser.id);

      if (updateError) throw updateError;

      await logActivity('subscription_change', selectedUser.profile_id, {
        old_plan: selectedUser.subscription_plan,
        new_plan: subscriptionData.plan,
        status: subscriptionData.status,
      });

      setSuccess('Subscription updated successfully');
      setShowSubscriptionModal(false);
      setSelectedUser(null);
      fetchBusinessUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleAccountStatus = async (user: BusinessUser) => {
    const newStatus = user.account_status === 'active' ? 'deactivated' : 'active';
    const confirmMessage = `Are you sure you want to ${
      newStatus === 'deactivated' ? 'deactivate' : 'reactivate'
    } this account?`;

    if (!confirm(confirmMessage)) return;

    setError(null);
    setSuccess(null);

    try {
      const { error: updateError } = await supabase
        .from('business_users')
        .update({ account_status: newStatus })
        .eq('id', user.id);

      if (updateError) throw updateError;

      await logActivity('account_status_change', user.profile_id, {
        old_status: user.account_status,
        new_status: newStatus,
      });

      setSuccess(`Account ${newStatus === 'deactivated' ? 'deactivated' : 'reactivated'} successfully`);
      fetchBusinessUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (user: BusinessUser) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    setError(null);
    setSuccess(null);

    try {
      const { error: deleteError } = await supabase
        .from('business_users')
        .delete()
        .eq('id', user.id);

      if (deleteError) throw deleteError;

      await logActivity('user_deleted', user.profile_id, {
        email: user.profile.email,
      });

      setSuccess('User deleted successfully');
      fetchBusinessUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleImpersonate = async (user: BusinessUser) => {
    setError(null);

    try {
      await logActivity('impersonate', user.profile_id, {
        email: user.profile.email,
      });

      alert(`Impersonation would log you in as: ${user.profile.email}\n\nNote: This is a demo. Full impersonation requires additional security setup.`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const logActivity = async (actionType: string, targetUserId: string, details: any) => {
    try {
      await supabase.from('admin_activity_log').insert({
        admin_id: profile?.id,
        action_type: actionType,
        target_user_id: targetUserId,
        details,
      });
    } catch (err) {
      console.error('Error logging activity:', err);
    }
  };

  const openSubscriptionModal = (user: BusinessUser) => {
    setSelectedUser(user);
    setSubscriptionData({
      plan: user.subscription_plan || '',
      status: user.subscription_status,
    });
    setShowSubscriptionModal(true);
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Business Management</h2>
          <p className="text-gray-600 mt-1">Manage application users and subscriptions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Add Business User
        </button>
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

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscription
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {businessUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No business users found. Click "Add Business User" to create one.
                </td>
              </tr>
            ) : (
              businessUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.profile.full_name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">{user.profile.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.subscription_plan || 'No plan'}
                      </div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          user.subscription_status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.subscription_status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.account_status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.account_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleImpersonate(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Impersonate user"
                      >
                        <LogIn className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openSubscriptionModal(user)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Manage subscription"
                      >
                        <CreditCard className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleAccountStatus(user)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.account_status === 'active'
                            ? 'text-orange-600 hover:bg-orange-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={user.account_status === 'active' ? 'Deactivate account' : 'Reactivate account'}
                      >
                        {user.account_status === 'active' ? (
                          <PowerOff className="w-4 h-4" />
                        ) : (
                          <Power className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Business User</h3>
            <form onSubmit={handleAddBusinessUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscription Plan
                </label>
                <select
                  value={formData.subscriptionPlan}
                  onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="basic">Basic</option>
                  <option value="professional">Professional</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({
                      email: '',
                      password: '',
                      fullName: '',
                      subscriptionPlan: 'basic',
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSubscriptionModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Manage Subscription</h3>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">User:</span> {selectedUser.profile.email}
              </p>
            </div>
            <form onSubmit={handleUpdateSubscription} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscription Plan
                </label>
                <select
                  value={subscriptionData.plan}
                  onChange={(e) => setSubscriptionData({ ...subscriptionData, plan: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="basic">Basic</option>
                  <option value="professional">Professional</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscription Status
                </label>
                <select
                  value={subscriptionData.status}
                  onChange={(e) =>
                    setSubscriptionData({
                      ...subscriptionData,
                      status: e.target.value as 'active' | 'inactive',
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowSubscriptionModal(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessManagement;
