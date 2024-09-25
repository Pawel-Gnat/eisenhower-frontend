import { useContext } from 'react';
import { usePDF } from '@react-pdf/renderer';

import { AppContext } from '@/context/app-context';

import { Pdf } from './pdf';
import { Button } from './ui/button';

export const Footer = () => {
  const { view, setView, setTasks } = useContext(AppContext);
  const [instance] = usePDF({ document: Pdf() });

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
        {view && instance.url ? (
          <Button asChild disabled={!!(instance.loading || instance.error)}>
            <a href={instance.url} download="eisenhower.pdf">
              Export to PDF
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
};
