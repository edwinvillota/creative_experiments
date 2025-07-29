import { createContext, PropsWithChildren, useContext } from 'react';

import { IColDef } from './Table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ITableContextType<TData = any> {
  columns: IColDef<TData>[];
  rows: TData[];
}
const TableContext = createContext<ITableContextType | undefined>(undefined);

interface ITableProviderProps<TData> extends PropsWithChildren {
  columns: IColDef<TData>[];
  rows: TData[];
}

export const TableProvider = <TData,>({
  children,
  columns,
  rows,
}: ITableProviderProps<TData>) => {
  const contextValue: ITableContextType<TData> = {
    columns,
    rows,
  };

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = <TData,>() => {
  const context = useContext(TableContext) as ITableContextType<TData>;

  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }
  return context;
};
