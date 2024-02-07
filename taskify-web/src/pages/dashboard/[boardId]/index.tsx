import { useRouter } from 'next/router';

export default function DashBoard() {
  const router = useRouter();
  const { boardId } = router.query;
  return <div>{boardId} 번째 대시보드 페이지입니다.</div>;
}
