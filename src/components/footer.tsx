import { toast } from 'sonner';
import { useContext, useEffect } from 'react';
import { usePDF } from '@react-pdf/renderer';

import { AppContext } from '@/context/app-context';
import { ModalContext } from '@/context/modal-context';

import { Pdf } from './pdf';
import { Button } from './ui/button';

import { Status } from '@/types';

export const Footer = () => {
  const { view, setView, setTasks, pdfData, storageContext } = useContext(AppContext);
  const { dispatch } = useContext(ModalContext);
  const [instance, updateInstance] = usePDF({ document: <Pdf pdfData={pdfData} /> });

  useEffect(() => {
    updateInstance(<Pdf pdfData={pdfData} />);
  }, [pdfData]);

  const toggleView = () => {
    setView((prev) => (prev === 1 ? 0 : 1));
  };

  const resetAppState = () => {
    dispatch({
      type: 'RESET_TASKS',
      payload: {
        action: async () => {
          try {
            const response = await storageContext.deleteAllTasks();

            if (response.status === Status.SUCCESS) {
              setTasks([]);
              setView(0);
              dispatch({ type: 'CLOSE_MODAL' });
              toast.success(response.message);
            }
          } catch (error: unknown) {
            const errorMessage = (error as Error).message || 'Failed to delete all tasks';
            toast.error(errorMessage);
          }
        },
      },
    });
  };

  return (
    <div className="flex justify-between gap-2">
      <Button onClick={resetAppState} variant="destructive">
        Reset
      </Button>

      <div className="space-x-2">
        <Button onClick={toggleView}>{!view ? 'Next' : 'Back'}</Button>
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
