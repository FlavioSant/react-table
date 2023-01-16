import { Column, Sort } from './Table';
import { THead } from './THead';
import { TBody } from './TBody';

import styles from './TableWrapper.module.scss';

export interface TableWrapperProps<T> {
  columns: Column<T>[];
  items: T[];
  getRowId: (item: T) => string;
  sort?: Sort | null;
  onSort?: (sort: Sort | null) => void;
  tFootComponent?: () => JSX.Element;
}

export const TableWrapper = <T,>({
  columns,
  items,
  getRowId,
  sort,
  onSort,
  tFootComponent,
}: TableWrapperProps<T>) => {
  return (
    <div className={styles['table-wrapper-container']}>
      <table className={styles['table-container']}>
        <THead columns={columns} sort={sort} onSort={onSort} />
        <TBody columns={columns} items={items} getRowId={getRowId} />
        {tFootComponent && tFootComponent()}
      </table>
    </div>
  );
};
