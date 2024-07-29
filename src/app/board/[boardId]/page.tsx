import { Canvas } from "@/components/board/canvas";
import { Loading } from "@/components/loader/Loading";
// import { Canvas } from "./_components/canvas";
import { Room } from "@/components/global/room";

interface BoardIdPageProps {
  params: { boardId: string };
}

const BoardIdPage = ({ params }: BoardIdPageProps) => (
  <Room roomId={params.boardId} fallback={<Loading />}>
    <Canvas boardId={params.boardId} />
  </Room>
);

export default BoardIdPage;
