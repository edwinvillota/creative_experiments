import { useTableContext } from './TableProvider';
import { TableRow } from './TableRow';

export const TableBody = <TData,>() => {
  const { rows } = useTableContext<TData>();
  return (
    <tbody>
      {rows.map((row) => (
        <TableRow row={row} />
      ))}
    </tbody>
  );
};
