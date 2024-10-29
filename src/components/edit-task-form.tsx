import { forwardRef, useContext, useImperativeHandle } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
    const { tasks, setTasks } = useContext(AppContext);
    const task = tasks.find((task) => task.id === taskId);

    const form = useForm<z.infer<typeof TaskFormSchema>>({
      resolver: zodResolver(TaskFormSchema),
      defaultValues: {
        title: task?.title || '',
      },
    });

    function onSubmit(values: z.infer<typeof TaskFormSchema>) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, title: values.title } : task,
        ),
      );
      form.reset();
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
