import { useContext, useEffect, useState } from 'react';

import { TaskContext } from '@/context/task-context';

import { initializeSortedTasks } from '@/helpers/helpers';

import { MatrixColumn } from './matrix-column';

import { SortedTask } from '@/types';

export const MatrixContainer = () => {
  const { tasks, dispatch } = useContext(TaskContext);

  const [sortedDoTasks, setSortedDoTasks] = useState<SortedTask[]>(
    initializeSortedTasks(
      tasks.filter(
        (task) => task.urgency === 'urgent' && task.importance === 'important',
      ),
    ),
  );
  const [sortedScheduleTasks, setSortedScheduleTasks] = useState<SortedTask[]>(
    initializeSortedTasks(
      tasks.filter(
        (task) => task.urgency === 'not urgent' && task.importance === 'important',
      ),
    ),
  );
  const [sortedDelegateTasks, setSortedDelegateTasks] = useState<SortedTask[]>(
    initializeSortedTasks(
      tasks.filter(
        (task) => task.urgency === 'urgent' && task.importance === 'not important',
      ),
    ),
  );
  const [sortedDeleteTasks, setSortedDeleteTasks] = useState<SortedTask[]>(
    initializeSortedTasks(
      tasks.filter(
        (task) => task.urgency === 'not urgent' && task.importance === 'not important',
      ),
    ),
  );

  useEffect(() => {
    dispatch({
      type: 'PDF_DATA',
      payload: {
        pdfData: {
          do: sortedDoTasks,
          schedule: sortedScheduleTasks,
          delegate: sortedDelegateTasks,
          delete: sortedDeleteTasks,
        },
      },
    });
  }, [sortedDoTasks, sortedScheduleTasks, sortedDelegateTasks, sortedDeleteTasks]);

  const handleColumnUpdate = (column: string, updatedTasks: SortedTask[]) => {
    switch (column.toLowerCase()) {
      case 'do':
        setSortedDoTasks(updatedTasks);
        break;
      case 'schedule':
        setSortedScheduleTasks(updatedTasks);
        break;
      case 'delegate':
        setSortedDelegateTasks(updatedTasks);
        break;
      case 'delete':
        setSortedDeleteTasks(updatedTasks);
        break;
    }
  };

  return (
    <div className="scrollbar-custom mx-auto my-4 grid w-full max-w-screen-2xl flex-1 grid-cols-1 gap-4 overflow-y-auto rounded-xl border-2 border-dashed p-4 md:grid-cols-2">
      <MatrixColumn
        title="Do"
        description="(Urgent & Important)"
        tasks={sortedDoTasks}
        onTasksUpdate={(updatedTasks) => handleColumnUpdate('do', updatedTasks)}
      />
      <MatrixColumn
        title="Schedule"
        description="(Not Urgent & Important)"
        tasks={sortedScheduleTasks}
        onTasksUpdate={(updatedTasks) => handleColumnUpdate('schedule', updatedTasks)}
      />
      <MatrixColumn
        title="Delegate"
        description="(Urgent & Not Important)"
        tasks={sortedDelegateTasks}
        onTasksUpdate={(updatedTasks) => handleColumnUpdate('delegate', updatedTasks)}
      />
      <MatrixColumn
        title="Delete"
        description="(Not Urgent & Not Important)"
        tasks={sortedDeleteTasks}
        onTasksUpdate={(updatedTasks) => handleColumnUpdate('delete', updatedTasks)}
      />
    </div>
  );
};
