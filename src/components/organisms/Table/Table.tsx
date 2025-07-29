import './table.css';

import { PropsWithChildren, ReactNode } from 'react';

import { TNestedKeyOf } from '@/common/types';

import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TableProvider } from './TableProvider';

export interface IColDef<TData> {
  header: string;
  field: TNestedKeyOf<TData>;
  render?: (
    row: TData,
    value: string | boolean | number | null | undefined
  ) => ReactNode;
}

export interface ITableProps<TData> extends PropsWithChildren {
  rows: TData[];
  columns: IColDef<TData>[];
}

const Table = <TData,>({ columns, rows, children }: ITableProps<TData>) => {
  if (!columns || !columns.length) return null;

  return (
    <TableProvider columns={columns} rows={rows}>
      <div className="custom-table-wrapper">
        <table className="custom-table">{children}</table>
      </div>
    </TableProvider>
  );
};

// eslint-disable-next-line unused-imports/no-unused-vars
Table.Header = TableHeader;
// eslint-disable-next-line unused-imports/no-unused-vars
Table.Body = TableBody;

export default Table;
