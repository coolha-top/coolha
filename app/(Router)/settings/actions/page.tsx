'use client'
import { useInfiniteScroll } from '@/components/lnes/DataUsers/hook/useInfiniteScroll';
import { formatDate } from '@/utils/formatDate';
import { truncateEthAddress } from '@/utils/truncateEthAddress';
import { useProfileActionHistory, LimitType } from '@lens-protocol/react-web';

export default function ActionHistory() {
  const { data, loading, error, hasMore, observeRef } = useInfiniteScroll(useProfileActionHistory());

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>txHash</th>
              <th>Id</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.actionType}</td>
                <td>{formatDate(item.actionedOn)}</td>
                <td>{item.txHash}</td>
                <td>{item.id}</td>
                <td>{truncateEthAddress(item.who)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        hasMore && (
          <div className="flex justify-center my-4">
            <span ref={observeRef} className="loading loading-spinner loading-lg"></span>
          </div>
        )
      }
    </div >
  );
}
enum ProfileActionHistoryType {
  // An Open Action was executed
  Acted = "ACTED",

  // A Profile was blocked
  Blocked = "BLOCKED",

  // A publication was collected
  Collected = "COLLECTED",

  // A comment was posted
  Comment = "COMMENT",

  // A Profile was followed
  Follow = "FOLLOW",

  // An Handle was linked to the Profile
  LinkHandle = "LINK_HANDLE",

  // The Profile logged in
  LoggedIn = "LOGGED_IN",

  // A publication was mirrored
  Mirror = "MIRROR",

  // A new post was created
  Post = "POST",

  // A publication was quoted
  Quote = "QUOTE",

  // The Profile refreshed their auth token
  RefreshAuthToken = "REFRESH_AUTH_TOKEN",

  // The Profile metadata was updated
  SetProfileMetadata = "SET_PROFILE_METADATA",

  // The Profile Follow Module was updated
  SetProfileModule = "SET_PROFILE_MODULE",

  // A Profile was unblocked
  Unblocked = "UNBLOCKED",

  // A Profile was unfollowed
  Unfollow = "UNFOLLOW",

  // An Handle was unlinked from the Profile
  UnlinkHandle = "UNLINK_HANDLE",
}