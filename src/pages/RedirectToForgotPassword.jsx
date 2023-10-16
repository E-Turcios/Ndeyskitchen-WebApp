import React from 'react';

export default function RedirectToForgotPassword() {
  return (
    <div className="link-expired">
      <p>The link has expired.</p>
      <p>
        Go back to the <a href="/forgot-password">forgot password</a> page to
        request another link.
      </p>
    </div>
  );
}
