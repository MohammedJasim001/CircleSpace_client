/* eslint-disable @next/next/no-img-element */
import React  from 'react';
import { FaUserCircle } from 'react-icons/fa';
import useUserSuggestion from '@/hooks/useUser';
import useFollow from '@/hooks/useFollow';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';

interface UserSuggessionProps {
  currentUserId: string; // Add currentUserId as a string prop
}

interface User {
  _id: string;
  userName: string;
  profileImage?: string; // Optional if it might be undefined
  followers: string[]; // Array of user IDs
}

const UserSuggession: React.FC<UserSuggessionProps> = ({ currentUserId }) => {
  const { data, isLoading, isError } = useUserSuggestion(currentUserId);
  const followMutation = useFollow();

  const router = useRouter()
 


  const handleFollow = (targetId: string) => {
    followMutation.mutate({ userId: currentUserId, targetId },);
};

if (isLoading) return <p className="text-white">Loading suggestions...</p>;
if (isError) return <p className="text-white">Failed to load suggestions.</p>;

const filteredUsers = data?.data || []; // Fallback to empty array if data is null/undefined}
  return (
    <div className="max-w-60 text-white rounded-lg p-4 gap-2">
      <h2 className="text-xl font-semibold mb-4">Suggested for you</h2>
      <div className="flex flex-col gap-4">
        {filteredUsers.length === 0 ? (
          <p className="text-gray-400">No suggestions available</p>
        ) : (
          filteredUsers?.map((user:User) => (
            <div key={user._id} className="flex justify-between">
              <div className="rounded-lg flex items-center gap-1 cursor-pointer" onClick={()=>router.push(`/${user._id}`)}>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-500" />
                  )}
                </div>
                <span className="text-sm font-semibold">{user.userName}</span>
              </div>
              <div>
                <Button
                  text={user.followers.includes(currentUserId) ? 'Unfollow' : 'Follow'}
                  size="small"
                  onClick={() => handleFollow(user._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserSuggession;
