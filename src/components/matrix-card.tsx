import { Card, CardTitle } from './ui/card';

interface MatrixCardProps {
  title: string;
}

export const MatrixCard = ({ title }: MatrixCardProps) => {
  return (
    <Card className="mx-auto flex w-full cursor-grab flex-col justify-between p-4 transition-transform hover:shadow-md active:scale-[1.01] active:cursor-grabbing active:shadow-lg">
      <CardTitle className="select-none truncate text-lg font-medium">{title}</CardTitle>
    </Card>
  );
};
