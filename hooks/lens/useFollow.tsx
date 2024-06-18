
import { useFollow, useUnfollow } from '@lens-protocol/react-web';
import React from 'react';

const FollowButton = ({ profile }) => {


  const { execute: follow, error: followError, loading: followLoading } = useFollow();
  const { execute: unfollow, error: unfollowError, loading: unfollowLoading } = useUnfollow();


  const handleFollow = async ({profile}) => {
    if (!profile || !profile.operations.canFollow) {
      console.error("You can't follow this profile. Check the `profile.operations.canFollow` beforehand.");
      return;
    }
    const result = await follow(profile);
  };



  const handleUnfollow = async ({profile}) => {
    if (!profile) {
      console.error("Profile is not defined.");
      return;
    }
    const result = await unfollow(profile);
  }


  const handleClick = () => {
    if (profile.operations.canFollow) {
      handleFollow({ profile });
    } else {
      handleUnfollow({ profile });
    }
  };

  return (
    <div>
      <button
        className={` btn btn-sm btn-primary text-black ${profile?.operations?.canFollow ? 'btn-md  text-lg' : 'btn-md text-lg'}`}
        onClick={handleClick}
        disabled={followLoading || unfollowLoading || !profile}
      >
        {followLoading || unfollowLoading ? '处理中...' : profile?.operations?.canFollow ? '关注' : '取关'}
      </button>
      {(followError || unfollowError) && <p className="error-message">Error: {followError?.message || unfollowError?.message}</p>}
    </div>
  );
};

export default FollowButton;
