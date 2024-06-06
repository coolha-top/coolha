import { useFollow, useUnfollow } from '@lens-protocol/react-web';
import React from 'react';

const FollowButton = ({ profile }) => {
  const { execute: follow, error: followError, loading: followLoading } = useFollow();
  const { execute: unfollow, error: unfollowError, loading: unfollowLoading } = useUnfollow();

  const handleFollow = async () => {
    if (!profile || !profile.operations.canFollow) {
      console.error("You can't follow this profile. Check the `profile.operations.canFollow` beforehand.");
      return;
    }

    const result = await follow({ profile });

    if (result.isFailure()) {
      switch (result.error.name) {
        case 'BroadcastingError':
          console.log('There was an error broadcasting the transaction', result.error.message);
          break;
        case 'PendingSigningRequestError':
          console.log('There is a pending signing request in your wallet. Approve it or discard it and try again.');
          break;
        case 'InsufficientAllowanceError':
          const requestedAmount = result.error.requestedAmount;
          console.log('You must approve the contract to spend at least: ' + `${requestedAmount.asset.symbol} ${requestedAmount.toSignificantDigits(6)}`);
          break;
        case 'InsufficientFundsError':
          const requestedAmountFunds = result.error.requestedAmount;
          console.log('You do not have enough funds to pay for this follow fee: ' + `${requestedAmountFunds.asset.symbol} ${requestedAmountFunds.toSignificantDigits(6)}`);
          break;
        case 'WalletConnectionError':
          console.log('There was an error connecting to your wallet', result.error.message);
          break;
        case 'PrematureFollowError':
          console.log('There is a pending unfollow request for this profile.');
          break;
        case 'UserRejectedError':
          // the user decided to not sign, usually this is silently ignored by UIs
          break;
        default:
          console.log('An unknown error occurred', result.error.message);
      }
      return;
    }

    // 等待完成
    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      console.log('There was an error processing the transaction', completion.error.message);
      return;
    }

    console.log('Follow executed successfully');
  };

  const handleUnfollow = async () => {
    if (!profile) {
      console.error("Profile is not defined.");
      return;
    }

    const result = await unfollow({ profile });

    if (result.isFailure()) {
      switch (result.error.name) {
        case 'BroadcastingError':
          console.log('There was an error broadcasting the transaction', result.error.message);
          break;
        case 'PendingSigningRequestError':
          console.log('There is a pending signing request in your wallet. Approve it or discard it and try again.');
          break;
        case 'WalletConnectionError':
          console.log('There was an error connecting to your wallet', result.error.message);
          break;
        case 'UserRejectedError':
          // the user decided to not sign, usually this is silently ignored by UIs
          break;
        default:
          console.log('An unknown error occurred', result.error.message);
      }
      return;
    }

    // 等待完成
    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      console.log('There was an error processing the transaction', completion.error.message);
      return;
    }

    console.log('Unfollow executed successfully');
  };

  const handleClick = () => {
    if (profile.operations.canFollow) {
      handleFollow();
    } else {
      handleUnfollow();
    }
  };

  return (
    <div>
      <button
        className={`btn-primary btn text-black ${profile?.operations?.canFollow ? 'btn-md text-xl' : 'btn-md text-xl'}`}
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
