import React, { Key } from 'react';

export type DefaultRowProps = {
  id: Key;
};

type CustomRowWithDataProps<P extends DefaultRowProps> = {
  RowComponent: React.ComponentType<P>;
  rowData: P;
};

export default function CustomRowWithData<P extends DefaultRowProps>({
  RowComponent,
  rowData,
}: CustomRowWithDataProps<P>) {
  return <RowComponent {...rowData} />;
}
