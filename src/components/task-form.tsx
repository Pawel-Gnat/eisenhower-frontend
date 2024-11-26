import { useContext } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { TaskContext } from '@/context/task-context';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from './ui/loading-spinner';

import { TaskFormSchema } from '@/schemas';

import { Status } from '@/types';

export const TaskForm = () => {
  const { tasks, storageContext, isLoading, dispatch } = useContext(TaskContext);

  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: '',
    },
  });

  async function onSubmit(values: z.infer<typeof TaskFormSchema>) {
    const newTask = {
      _id: crypto.randomUUID(),
      title: values.title,
      urgency: null,
      importance: null,
    };

    try {
      const response = await storageContext.addTask(newTask);

      if (response.status === Status.SUCCESS) {
        dispatch({
          type: 'TASKS',
          payload: { tasks: [...tasks, response.object] },
        });
        form.reset();
        toast.success(response.message);
      }
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || 'Failed to create task';
      toast.error(errorMessage);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex min-h-16 flex-row justify-center gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 space-y-0">
              <FormLabel className="sr-only">Title</FormLabel>
              <FormControl>
                <Input className="min-w-52" placeholder="New task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="min-w-[5.5rem]" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : 'Add task'}
        </Button>
      </form>
    </Form>
  );
};
