import { useContext } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { AppContext } from '@/context/app-context';

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

import { TaskFormSchema } from '@/schemas';

export const TaskForm = () => {
  const { setTasks, storageContext } = useContext(AppContext);

  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: '',
    },
  });

  async function onSubmit(values: z.infer<typeof TaskFormSchema>) {
    const newTask = {
      id: self.crypto.randomUUID(),
      title: values.title,
      urgency: undefined,
      importance: undefined,
    };

    try {
      const addedTask = await storageContext.addTask(newTask);
      setTasks((prev) => [...prev, addedTask]);
      form.reset();
      toast('Task has been created');
    } catch (error) {
      toast.error('Failed to create task');
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
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
};
