import { toast } from 'sonner';
import { useContext, useEffect } from 'react';
import { usePDF } from '@react-pdf/renderer';

import { TaskContext } from '@/context/task-context';
import { ModalContext } from '@/context/modal-context';

import { Pdf } from './pdf';
import { Button } from './ui/button';

import { Status } from '@/types';

export const Footer = () => {
  const {
    view,
    pdfData,
    storageContext,
    dispatch: taskDispatch,
  } = useContext(TaskContext);
  const { dispatch: modalDispatch } = useContext(ModalContext);
  const [instance, update] = usePDF({ document: <Pdf pdfData={pdfData} /> });

  useEffect(() => {
    update(<Pdf pdfData={pdfData} />);
  }, [pdfData]);

  const toggleView = () => {
    taskDispatch({
      type: 'VIEW',
      payload: { view: view === 'create' ? 'render' : 'create' },
    });
  };

  const resetAppState = () => {
    modalDispatch({
      type: 'RESET_TASKS',
      payload: {
        action: async () => {
          try {
            const response = await storageContext.deleteAllTasks();

            if (response.status === Status.SUCCESS) {
              taskDispatch({
                type: 'RESET_TASKS',
              });
              modalDispatch({ type: 'CLOSE_MODAL' });
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
        <Button onClick={toggleView}>{view === 'create' ? 'Next' : 'Back'}</Button>
        {view === 'render' && instance.url ? (
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
