import { forwardRef, useContext, useImperativeHandle } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { TaskContext } from '@/context/task-context';
import { ModalContext } from '@/context/modal-context';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { TaskFormSchema } from '@/schemas';

import { Status } from '@/types';

interface EditTaskFormProps {
  taskId: string;
}

export interface EditTaskFormRef {
  submitForm: () => void;
}

export const EditTaskForm = forwardRef<EditTaskFormRef, EditTaskFormProps>(
  ({ taskId }, ref) => {
    const { tasks, setTasks, storageContext } = useContext(TaskContext);
    const { dispatch } = useContext(ModalContext);
    const task = tasks.find((task) => task._id === taskId);

    const form = useForm<z.infer<typeof TaskFormSchema>>({
      resolver: zodResolver(TaskFormSchema),
      defaultValues: {
        title: task?.title || '',
      },
    });

    async function onSubmit(values: z.infer<typeof TaskFormSchema>) {
      try {
        const response = await storageContext.editTask(taskId, {
          title: values.title,
        });

        if (response.status === Status.SUCCESS) {
          setTasks((prev) =>
            prev.map((task) => (task._id === taskId ? response.object : task)),
          );
          dispatch({ type: 'CLOSE_MODAL' });
          toast.success(response.message);
          form.reset();
        }
      } catch (error: unknown) {
        const errorMessage = (error as Error).message || 'Failed to edit task';
        toast.error(errorMessage);
      }
    }

    useImperativeHandle(ref, () => ({
      submitForm: form.handleSubmit(onSubmit),
    }));

    return (
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 space-y-0">
                <FormLabel>Task name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
);
