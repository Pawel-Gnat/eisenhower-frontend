import { TaskFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { useContext } from 'react';
import { AppContext } from '@/context/app-context';

export const TaskForm = () => {
  const { setTasks } = useContext(AppContext);

  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(values: z.infer<typeof TaskFormSchema>) {
    setTasks((prev) => [
      ...prev,
      {
        id: self.crypto.randomUUID(),
        title: values.title,
        urgency: '',
        importance: '',
      },
    ]);
    form.reset();
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
