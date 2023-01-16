import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { CaretDown, CaretUp } from 'phosphor-react';
import { Column, Sort } from './Table';

import styles from './THead.module.scss';

interface THeadProps<T> {
  columns: Column<T>[];
  sort?: Sort | null;
  onSort?: (sort: Sort | null) => void;
}

interface CurrentOrder {
  field: string;
  icon: () => JSX.Element;
}

export const THead = <T,>({ columns, sort, onSort }: THeadProps<T>) => {
  const [currentOrder, setCurrentOrder] = useState<CurrentOrder | null>(null);

  useEffect(() => {
    if (sort) {
      setCurrentOrder({
        field: sort.field,
        icon:
          sort.order === 'asc'
            ? () => <CaretUp size={18} weight="bold" />
            : () => <CaretDown size={18} weight="bold" />,
      });
    } else {
      setCurrentOrder(null);
    }
  }, [sort]);

  const handleSort = (sort: Sort | null | undefined, column: Column<T>) => {
    if (!column.sortable || !onSort) {
      return;
    }

    if (sort && sort.field === column.key) {
      switch (sort.order) {
        case 'asc':
          setCurrentOrder({
            field: column.key,
            icon: () => <CaretUp size={18} weight="bold" />,
          });
          onSort(null);
          break;
        case 'desc':
          setCurrentOrder({
            field: column.key,
            icon: () => <CaretDown size={18} weight="bold" />,
          });
          onSort({ field: column.key, order: 'asc' });
          break;
      }
    } else {
      setCurrentOrder(null);
      onSort({ field: column.key, order: 'desc' });
    }
  };

  return (
    <thead className={styles['table-head']}>
      <tr>
        {columns.map(column => {
          if (column.renderHeadColumn) {
            return (
              <th
                key={`th-${column.key}`}
                scope="col"
                className={
                  column.textAlign ? `text-${column.textAlign}` : 'text-left'
                }
              >
                {column.renderHeadColumn(column)}
              </th>
            );
          }

          return (
            <th
              key={`th-${column.key}`}
              scope="col"
              onClick={() => handleSort(sort, column)}
              title={column.sortable ? 'Clique para ordenar' : ''}
              className={classNames(
                column.sortable ? `${styles.sortable}` : '',
                column.textAlign ? `text-${column.textAlign}` : 'text-left',
              )}
            >
              {column.label}

              {currentOrder &&
                currentOrder.field === column.key &&
                currentOrder.icon()}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
