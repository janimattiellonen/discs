import React from 'react';

function AppLayout( { children } ) {
  return (
    <div className="container">
      <div>
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
