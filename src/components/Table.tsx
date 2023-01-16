import { Pagination } from './Pagination';
import { TableWrapper } from './TableWrapper';

export interface Sort {
  field: string;
  order: 'asc' | 'desc';
}

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  render?: (item: T, index: number) => JSX.Element;
  renderHeadColumn?: (
    column: Omit<Column<T>, 'render' | 'renderHeadColumn'>,
  ) => JSX.Element;
}

export interface TableProps<T> {
  columns: Column<T>[];
  items: T[];
  totalCount: number;
  getRowId: (item: T) => string;
  pagination: { page: number; perPage: number };
  onChangePage: (page: number) => void;
  onChangePerPage: (perPage: number) => void;
  sort?: Sort | null;
  onSort?: (sort: Sort | null) => void;
  tableHeaderComponent?: () => JSX.Element;
  tFootComponent?: () => JSX.Element;
}

export const Table = <T,>({
  columns,
  items,
  totalCount,
  getRowId,
  pagination,
  onChangePage,
  onChangePerPage,
  sort,
  onSort,
  tableHeaderComponent: TableHeaderComponent,
  tFootComponent,
}: TableProps<T>) => {
  return (
    <div className="w-full">
      {TableHeaderComponent && <TableHeaderComponent />}
      <TableWrapper
        columns={columns}
        items={items}
        getRowId={getRowId}
        sort={sort}
        onSort={onSort}
        tFootComponent={tFootComponent}
      />
      <Pagination
        totalCount={totalCount}
        page={pagination.page}
        onChangePage={onChangePage}
        perPage={pagination.perPage}
        onChangePerPage={onChangePerPage}
      />
    </div>
  );
};
