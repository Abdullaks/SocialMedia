export default function Friends({ friends }) {
  return (
    <div className="profile_card">
      <div className="profile_card_header">
        Suggestions
        <div className="profile_header_link">See all</div>
      </div>
      {friends && (
        <div className="profile_card_count">
          {friends.length === 0
            ? "" 
            : friends.length === 1
            ? "1 friend"
            : `${friends.length} friends`}
        </div>
      )}
      <div className="profile_card_grid">
        {friends &&
          friends
            .slice(0, 9)
            .map((friend) => <div className="profile_photo_card"></div>)}
      </div>
    </div>
  );
}



