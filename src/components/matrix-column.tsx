import { useContext, useEffect, useState } from 'react';
import {
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DndContext,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { AppContext } from '@/context/app-context';

import { MatrixCard } from './matrix-card';

import { SortedTask, Task } from '@/types';

interface MatrixColumnProps {
  title: string;
  description: string;
  tasks: Task[];
}

export const MatrixColumn = ({ title, description, tasks }: MatrixColumnProps) => {
  const [sortedTasks, setSortedTasks] = useState<SortedTask[]>(
    tasks.map((task, index) => ({
      ...task,
      order: index + 1,
    })),
  );
  const [activeItem, setActiveItem] = useState<SortedTask | undefined>(undefined);
  const { setPdfData } = useContext(AppContext);
  const sensors = useSensors(useSensor(TouchSensor), useSensor(PointerSensor));

  useEffect(() => {
    setPdfData((prev) => ({
      ...prev,
      [title.toLowerCase()]: sortedTasks.map((task) => ({
        ...task,
      })),
    }));
  }, [sortedTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(sortedTasks.find((task) => task.order === active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = sortedTasks.find((task) => task.order === active.id);
    const overTask = sortedTasks.find((task) => task.order === over.id);

    if (!activeTask || !overTask) {
      return;
    }

    const activeIndex = sortedTasks.findIndex((task) => task.order === active.id);
    const overIndex = sortedTasks.findIndex((task) => task.order === over.id);

    if (activeIndex !== overIndex) {
      setSortedTasks((prev) => {
        const updatedTasks = arrayMove(prev, activeIndex, overIndex).map((task, i) => ({
          ...task,
          order: i + 1,
        }));

        return updatedTasks;
      });
    }

    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  return (
    <div className="p-4">
      <h2 className="select-none text-center text-2xl font-bold">{title}</h2>
      <p className="mb-2 select-none text-center text-sm">{description}</p>
      <div className="space-y-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext
            items={sortedTasks.map((item) => item.order)}
            strategy={verticalListSortingStrategy}
          >
            {sortedTasks.map((task) => (
              <MatrixCard key={task._id} order={task.order} title={task.title} />
            ))}
          </SortableContext>

          <DragOverlay
            adjustScale
            style={{
              transformOrigin: '0 0 ',
            }}
          >
            {activeItem ? (
              <MatrixCard
                title={activeItem.title}
                order={activeItem.order}
                forceDragging={true}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};
