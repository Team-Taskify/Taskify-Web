export default function getRemainNumber(width: number, totalCount: number) {
  const subtract = width >= 1200 ? 4 : 2;
  const remainNumber = totalCount - subtract;
  return remainNumber;
}
