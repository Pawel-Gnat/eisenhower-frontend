import { forwardRef, useContext, useImperativeHandle } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { AppContext } from '@/context/app-context';

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

interface EditTaskFormProps {
  taskId: string;
}

export interface EditTaskFormRef {
  submitForm: () => void;
}

export const EditTaskForm = forwardRef<EditTaskFormRef, EditTaskFormProps>(
  ({ taskId }, ref) => {
    const { tasks, setTasks, storageContext } = useContext(AppContext);
    const task = tasks.find((task) => task.id === taskId);

    const form = useForm<z.infer<typeof TaskFormSchema>>({
      resolver: zodResolver(TaskFormSchema),
      defaultValues: {
        title: task?.title || '',
      },
    });

    async function onSubmit(values: z.infer<typeof TaskFormSchema>) {
      try {
        const updatedTask = await storageContext.editTask(taskId, {
          title: values.title,
        });
        setTasks((prev) => prev.map((task) => (task.id === taskId ? updatedTask : task)));
        form.reset();
        toast('Task has been edited');
      } catch (error) {
        toast.error('Failed to edit task');
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
