import React from 'react';
import { Link } from 'react-router-dom';

export default function index() {
  const messageText = () => (
    <div className="text-md">
      Login to track your existing support requests. If you have not created a
      support ticket then you would need to <Link to="/login">login</Link> or
      <Link to="/help/createticket"> create a new ticket</Link> to begin.
    </div>
  );

  return <div>{messageText()}</div>;
}
