// WelcomeMessage.jsx
import React from 'react';
import { useUser } from '@clerk/clerk-react';

function WelcomeMessage() {
  const { user } = useUser();
  const username = user?.firstName || 'Customer';

  return (
    <div className="bg-green-200 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold">Hello {username}, welcome to the shop!</h2>
      <p>What would you like to order?</p>
    </div>
  );
}

export default WelcomeMessage;
