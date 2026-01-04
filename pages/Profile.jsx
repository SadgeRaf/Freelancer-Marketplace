import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import api from '../src/api';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    // Profile state
    const [profile, setProfile] = useState({
        displayName: '',
        email: '',
        photoURL: '',
        phone: '',
        bio: ''
    });

    // Initialize with user data
    useEffect(() => {
        if (user) {
            setProfile({
                displayName: user.displayName || '',
                email: user.email || '',
                photoURL: user.photoURL || '',
                phone: '',
                bio: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Here you would typically call your backend API to update the profile
            // For now, we'll just show a success message
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500">Please login to view your profile</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] p-4 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Manage your personal information and preferences
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        {/* Profile Header */}
                        <div className="flex items-center mb-8">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500">
                                <img
                                    src={profile.photoURL || `https://ui-avatars.com/api/?name=${profile.displayName || 'User'}&background=3B82F6&color=fff`}
                                    alt={profile.displayName || 'User'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {profile.displayName || 'User'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">{profile.email}</p>
                            </div>
                        </div>

                        {/* Profile Fields */}
                        <div className="space-y-6">
                            {/* Display Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Display Name
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={profile.displayName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your name"
                                    />
                                ) : (
                                    <p className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                                        {profile.displayName || 'Not set'}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <p className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                                    {profile.email}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Email cannot be changed
                                </p>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Phone Number
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your phone number"
                                    />
                                ) : (
                                    <p className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                                        {profile.phone || 'Not set'}
                                    </p>
                                )}
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Bio
                                </label>
                                {isEditing ? (
                                    <textarea
                                        name="bio"
                                        value={profile.bio}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Tell us about yourself..."
                                    />
                                ) : (
                                    <p className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white min-h-[60px]">
                                        {profile.bio || 'No bio added yet.'}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex justify-end space-x-4">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            // Reset to original user data
                                            setProfile({
                                                displayName: user.displayName || '',
                                                email: user.email || '',
                                                photoURL: user.photoURL || '',
                                                phone: '',
                                                bio: ''
                                            });
                                        }}
                                        className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;