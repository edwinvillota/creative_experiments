import { get } from '@/common/utils';

import { TableCell } from './TableCell';
import { useTableContext } from './TableProvider';

interface ITableRowProps<TData> {
  row: TData;
}

export const TableRow = <TData,>({ row }: ITableRowProps<TData>) => {
  const { columns } = useTableContext<TData>();
  return (
    <tr>
      {columns.map((col) => (
        <TableCell>
          {col.render
            ? col.render(row, get(row, col.field))
            : get(row, col.field)}
        </TableCell>
      ))}
    </tr>
  );
};
