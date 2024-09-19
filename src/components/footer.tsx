import { useContext } from 'react';

import { AppContext } from '@/context/app-context';

import { Button } from './ui/button';

export const Footer = () => {
  const { view, setView, setTasks } = useContext(AppContext);

  const toggleView = () => {
    setView((prev) => (prev === 1 ? 0 : 1));
  };

  const resetAppState = () => {
    setView(0);
    setTasks([]);
  };

  return (
    <div className="flex justify-between gap-2">
      <Button onClick={() => resetAppState()} variant="destructive">
        Reset
      </Button>

      <div className="space-x-2">
        <Button onClick={() => toggleView()}>{!view ? 'Next' : 'Back'}</Button>
        {view ? <Button onClick={() => {}}>Export to PDF</Button> : null}
      </div>
    </div>
  );
};
