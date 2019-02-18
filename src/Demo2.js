import React, { useState, useEffect } from 'react';

// function FriendStatus(props) {
//   const [isOnline, setIsOnline] = useState(null);

//   function handleStatusChange(status) {
//     setIsOnline(status.isOnline);
//   }

//   useEffect(() => {
//     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

//     return () => {
//       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
//     }
//   })
// }

function Example() {
  const [count, Count] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => Count(count + 1)}>
        Click me
      </button>
    </div>
  )
}

export default Example;