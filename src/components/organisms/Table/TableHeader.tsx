import { useTableContext } from './TableProvider';

export const TableHeader = <TData,>() => {
  const { columns } = useTableContext<TData>();

  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.header}>{col.header}</th>
        ))}
      </tr>
    </thead>
  );
};
