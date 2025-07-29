import { PropsWithChildren } from 'react';

interface ITableCellProps extends PropsWithChildren {}

export const TableCell = ({ children }: ITableCellProps) => {
  return <td>{children}</td>;
};
