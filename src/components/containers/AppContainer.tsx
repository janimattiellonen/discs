import React, { ReactNode } from 'react';

interface AppProps {
  children: ReactNode;
}

function App({ children }: AppProps): React.JSX.Element {
  return <div>{children}</div>;
}

export default App;
