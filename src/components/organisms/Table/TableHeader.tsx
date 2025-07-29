import { useTableContext } from './TableProvider';

export const TableHeader = <TData,>() => {
  const { columns } = useTableContext<TData>();

  return (
    <thead
      style={{
        position: 'sticky',
        top: 0,
      }}
    >
      <tr>
        {columns.map((col) => (
          <th key={col.header}>{col.header}</th>
        ))}
      </tr>
    </thead>
  );
};
