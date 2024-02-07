import { ReactNode, createContext, useState } from 'react';
import { PaginationConfig } from '@/components/commons/ui-table/types';

const PaginationConfigContext = createContext<PaginationConfig | undefined>(
  undefined,
);

type PaginationConfigProviderProps = {
  children: ReactNode;
};

export default function PaginationConfigProvider({
  children,
}: PaginationConfigProviderProps) {
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    type: 'none',
  });

  <PaginationConfigContext.Provider value={paginationConfig}>
    {children}
  </PaginationConfigContext.Provider>;
}
