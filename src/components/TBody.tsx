import _ from 'lodash';
import { Column } from './Table';

import styles from './TBody.module.scss';

interface TBodyProps<T> {
  columns: Column<T>[];
  items: T[];
  getRowId: (item: T) => string;
}

export const TBody = <T,>({ columns, items, getRowId }: TBodyProps<T>) => {
  return (
    <tbody className={styles['table-body']}>
      {items.length > 0 ? (
        items.map((item, index) => {
          const key = getRowId(item);

          return (
            <tr key={`tr-${key}`}>
              {columns.map(column => {
                if (column.render) {
                  return (
                    <td
                      key={`tr-${key}-td-${column.key}`}
                      className={
                        column.textAlign ? `text-${column.textAlign}` : ''
                      }
                    >
                      {column.render(item, index)}
                    </td>
                  );
                }

                return (
                  <td
                    key={`tr-${key}-td-${column.key}`}
                    className={
                      column.textAlign ? `text-${column.textAlign}` : ''
                    }
                  >
                    {_.get(item, column.key)}
                  </td>
                );
              })}
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan={columns.length}>
            <p className="body1 text" style={{ textAlign: 'center' }}>
              Nenhum registro encontrado.
            </p>
          </td>
        </tr>
      )}
    </tbody>
  );
};
