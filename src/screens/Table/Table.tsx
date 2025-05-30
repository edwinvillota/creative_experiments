import { Table } from '@/components/organisms';
import { ColDef } from '@/components/organisms/Table/Table';

const mockedData = [
  {
    id: 1,
    name: 'Edwin',
    email: 'edwinvillota@hotmail.com',
    address: { street: '80', line1: 'TestLine1' },
  },
  {
    id: 2,
    name: 'Jhon',
    email: 'jhon.doe@gmail.com',
    address: { street: '80', line1: 'TestLine1' },
  },
];

const COL_DEFS: ColDef<(typeof mockedData)[0]>[] = [
  {
    header: 'Id',
    field: 'id',
  },
  {
    header: 'Name',
    field: 'name',
  },
  {
    header: 'Email',
    field: 'email',
    render: (_, value) => <a href={`email:${value}`}>{value} </a>,
  },
  {
    header: 'Address street',
    field: 'address.street',
  },
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
        <Table columns={COL_DEFS} rows={mockedData}>
          <Table.Header />
          <Table.Body />
        </Table>
      </article>
    </section>
  );
};
