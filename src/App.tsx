import { useEffect, useState } from 'react';
import { Table, TFoot } from './components';
import { Sort } from './components/Table';

import './styles/global.scss';

const produtos = [
  {
    produtoId: '1',
    nome: 'Fogão 4 bocas',
    preco: 'R$ 999,90',
    quantidade: 7,
  },
  {
    produtoId: '2',
    nome: 'Microondas',
    preco: 'R$ 759,90',
    quantidade: 10,
  },
  {
    produtoId: '3',
    nome: 'Geladeira',
    preco: 'R$ 3499,99',
    quantidade: 5,
  },
  {
    produtoId: '4',
    nome: 'Armário completo',
    preco: 'R$ 2199,99',
    quantidade: 3,
  },
  {
    produtoId: '5',
    nome: 'Batedeira',
    preco: 'R$ 499,90',
    quantidade: 4,
  },
];

export const App = () => {
  const [sort, setSort] = useState<Sort | null>(null);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });

  const [state, setState] = useState<Map<string, string>>();

  const createState = () => {
    const items = new Map<string, string>();

    produtos.forEach(produto => {
      items.set(produto.produtoId, produto.preco);
    });

    setState(items);
  };

  useEffect(() => {
    createState();
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Table
        columns={[
          {
            key: 'produtoId',
            label: 'ID',
          },
          {
            key: 'nome',
            label: 'Nome',
            sortable: true,
          },
          {
            key: 'preco',
            label: 'Preço',
            render: ({ produtoId }) => (
              <input
                value={state?.get(produtoId)}
                onChange={e =>
                  setState(
                    state => new Map(state?.set(produtoId, e.target.value)),
                  )
                }
              />
            ),
          },
          {
            key: 'quantidade',
            label: 'Quantidade',
          },
        ]}
        items={produtos}
        getRowId={({ produtoId }) => `${produtoId}`}
        totalCount={produtos.length}
        sort={sort}
        onSort={setSort}
        pagination={pagination}
        onChangePage={page => setPagination({ ...pagination, page })}
        onChangePerPage={perPage => setPagination({ ...pagination, perPage })}
        tFootComponent={() => (
          <TFoot
            columns={[
              { value: '' },
              { value: '' },
              { value: 'R$ 7.959,68' },
              { value: '' },
            ]}
          />
        )}
      />
    </div>
  );
};
