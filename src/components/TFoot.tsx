import styles from './TFoot.module.scss';

interface TFootProps {
  columns: {
    value: string | number | undefined;
    textAlign?: 'center' | 'left' | 'right';
  }[];
}

export const TFoot = ({ columns }: TFootProps) => {
  return (
    <tfoot className={styles['table-footer']}>
      <tr>
        {columns.map((column, index) => (
          <td
            key={`tfoot-col-${index}`}
            className={column.textAlign ? `text-align-${column.textAlign}` : ''}
          >
            {column.value || '---'}
          </td>
        ))}
      </tr>
    </tfoot>
  );
};
