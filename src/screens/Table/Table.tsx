import { Table } from '@/components/organisms';
import { IColDef } from '@/components/organisms/Table/Table';
import { IProduct, PRODUCTS } from '@/mocks/products';

const COL_DEFS: IColDef<IProduct>[] = [
  { header: 'Id', field: 'id' },
  { header: 'Name', field: 'name' },
  { header: 'Category', field: 'category.name' },
  { header: 'Price', field: 'price', render: (_, value) => `$ ${value}` },
];

export const TableScreen = () => {
  return (
    <section className="container mx-auto flex flex-col gap-8 py-4">
      <article>
        <h1 className="text-2xl">Table experiment</h1>
        <p className="text-base">
          This is a React table component that uses the Criteria pattern for
          filtering and viewTransition for animations.
        </p>
      </article>
      <article>
        <Table columns={COL_DEFS} rows={PRODUCTS}>
          <Table.Header />
          <Table.Body />
        </Table>
      </article>
    </section>
  );
};
