
'use client';
import { useEffect, useState } from 'react';

export default function ClientWrapper({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return children;
}

<ClientWrapper>
  {/* Your component content */}
</ClientWrapper>
