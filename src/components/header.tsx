import { HeadingH1 } from './typography';
import { Button } from './ui/button';

export const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between gap-4">
      <HeadingH1 text="Eisenhower Matrix" />
      <Button>Login</Button>
    </header>
  );
};
