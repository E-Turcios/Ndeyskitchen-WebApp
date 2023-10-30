import React from 'react';
import ReactDOM from 'react-dom';

export default function SearchModal({ open, children }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById('portal')
  );
}
