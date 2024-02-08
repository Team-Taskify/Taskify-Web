import PaginationConfigProvider from '@/contexts/PaginationProvider';
import { DefaultRowProps } from './CustomRowWithData';
import DefaultTable, { DefaultTableProps } from './DefaultTable';

export default function DynamicTable<P extends DefaultRowProps>(
  props: DefaultTableProps<P>,
) {
  return (
    <PaginationConfigProvider>
      <DefaultTable {...props} />
    </PaginationConfigProvider>
  );
}
