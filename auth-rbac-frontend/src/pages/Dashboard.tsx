import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/authApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [publicContent, setPublicContent] = useState<string>('');
  const [userContent, setUserContent] = useState<string>('');
  const [adminContent, setAdminContent] = useState<string>('');
  const [loading, setLoading] = useState({
    public: false,
    user: false,
    admin: false
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublicContent();
    
    if (user) {
      fetchUserContent();
      
      if (user.role === 'ADMIN') {
        fetchAdminContent();
      }
    }
  }, [user]);

  const fetchPublicContent = async () => {
    setLoading(prev => ({ ...prev, public: true }));
    try {
      const content = await authApi.getPublicContent();
      setPublicContent(content);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch public content');
    } finally {
      setLoading(prev => ({ ...prev, public: false }));
    }
  };

  const fetchUserContent = async () => {
    setLoading(prev => ({ ...prev, user: true }));
    try {
      const content = await authApi.getUserContent();
      setUserContent(content);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user content');
    } finally {
      setLoading(prev => ({ ...prev, user: false }));
    }
  };

  const fetchAdminContent = async () => {
    setLoading(prev => ({ ...prev, admin: true }));
    try {
      const content = await authApi.getAdminContent();
      setAdminContent(content);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch admin content');
    } finally {
      setLoading(prev => ({ ...prev, admin: false }));
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Dashboard
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Welcome back, {user.name}! You are logged in as {user.role}.
          </p>
        </div>
      </div>

      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Public Content Card - Always visible */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Public Content</h3>
            <div className="mt-2 text-sm text-gray-600">
              {loading.public ? (
                <LoadingSpinner />
              ) : (
                <p>{publicContent || 'This is public content available to everyone'}</p>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
              Public Access
            </span>
          </div>
        </div>

        {/* User Content Card - Visible to USER and ADMIN */}
        <div className={`bg-white overflow-hidden shadow rounded-lg ${user.role !== 'USER' && user.role !== 'ADMIN' ? 'opacity-50' : ''}`}>
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">User Content</h3>
            <div className="mt-2 text-sm text-gray-600">
              {loading.user ? (
                <LoadingSpinner />
              ) : (
                <p>{userContent || 'This is user-specific content'}</p>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              user.role === 'USER' || user.role === 'ADMIN'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {user.role === 'USER' || user.role === 'ADMIN' ? 'Access Granted' : 'USER Role Required'}
            </span>
          </div>
        </div>

        {/* Admin Content Card - Visible only to ADMIN */}
        <div className={`bg-white overflow-hidden shadow rounded-lg ${user.role !== 'ADMIN' ? 'opacity-50' : ''}`}>
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Admin Content</h3>
            <div className="mt-2 text-sm text-gray-600">
              {loading.admin ? (
                <LoadingSpinner />
              ) : (
                <p>{adminContent || 'This is admin-only content'}</p>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              user.role === 'ADMIN'
                ? 'bg-purple-100 text-purple-600'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {user.role === 'ADMIN' ? 'Access Granted' : 'ADMIN Role Required'}
            </span>
          </div>
        </div>
      </div>

      {/* Role Information */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Your Access Level
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>
              Based on your role ({user.role}), you have access to:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li className="text-green-600">✓ Public content (always accessible)</li>
              <li className={user.role === 'USER' || user.role === 'ADMIN' ? 'text-green-600' : 'text-gray-400'}>
                {user.role === 'USER' || user.role === 'ADMIN' ? '✓' : '✗'} User content
              </li>
              <li className={user.role === 'ADMIN' ? 'text-green-600' : 'text-gray-400'}>
                {user.role === 'ADMIN' ? '✓' : '✗'} Admin content
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;