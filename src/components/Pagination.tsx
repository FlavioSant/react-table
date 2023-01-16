import {
  CaretLeft as PreviousPage,
  CaretDoubleLeft as FirstPage,
  CaretRight as NextPage,
  CaretDoubleRight as LastPage,
} from 'phosphor-react';

import styles from './Pagination.module.scss';

interface PaginationProps {
  page: number;
  perPage: number;
  totalCount: number;
  onChangePage: (page: number) => void;
  onChangePerPage: (perPage: number) => void;
}

export const Pagination = ({
  page,
  perPage,
  totalCount,
  onChangePage,
  onChangePerPage,
}: PaginationProps) => {
  const rangeStart = (page - 1) * perPage + 1;
  const rangeEnd = rangeStart + perPage - 1;
  const lastPage = Math.ceil(totalCount / perPage);

  return (
    <div className={styles['pagination-container']}>
      <div className={styles['pagination-per-page-container']}>
        <span className="paragraph2 text-gray-900">Linhas por página</span>
        <select
          className="paragraph2"
          value={perPage}
          onChange={({ target }) => onChangePerPage(+target.value)}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
        </select>
      </div>
      <span className="paragraph2 text-gray-900">
        {rangeStart}-{rangeEnd} de {totalCount}
      </span>
      <div className={styles['pagination-buttons-container']}>
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onChangePage(1)}
        >
          <FirstPage size={20} weight="bold" />
        </button>
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onChangePage(page - 1)}
        >
          <PreviousPage size={20} weight="bold" />
        </button>
        <button
          type="button"
          disabled={page === lastPage}
          onClick={() => onChangePage(page + 1)}
        >
          <NextPage size={20} weight="bold" />
        </button>
        <button
          type="button"
          disabled={page === lastPage}
          onClick={() => onChangePage(lastPage)}
        >
          <LastPage size={20} weight="bold" />
        </button>
      </div>
    </div>
  );
};
