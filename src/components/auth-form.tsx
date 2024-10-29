import { forwardRef, useContext, useImperativeHandle } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

import { AuthFormSchema } from '@/schemas';

export interface AuthFormRef {
  loginForm: () => void;
  registerForm: () => void;
}

export const AuthForm = forwardRef<AuthFormRef, {}>((props, ref) => {
  const { modalState, dispatch } = useContext(ModalContext);

  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onLoginSubmit = (values: z.infer<typeof AuthFormSchema>) => {
    form.reset();
  };

  const onRegisterSubmit = (values: z.infer<typeof AuthFormSchema>) => {
    form.reset();
  };

  const handleLoginState = () => {
    dispatch({ type: 'LOGIN' });
  };

  const handleRegisterState = () => {
    dispatch({ type: 'REGISTER' });
  };

  useImperativeHandle(ref, () => ({
    loginForm: form.handleSubmit(onLoginSubmit),
    registerForm: form.handleSubmit(onRegisterSubmit),
  }));

  return (
    <>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 space-y-0">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="example@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 space-y-0">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {modalState === 'login' && (
        <p className="text-sm">
          Don't have an account yet? Please{' '}
          <button className="font-medium underline" onClick={handleRegisterState}>
            register
          </button>
          .
        </p>
      )}

      {modalState === 'register' && (
        <p className="text-sm">
          Already have an account? Please{' '}
          <button className="font-medium underline" onClick={handleLoginState}>
            login
          </button>
          .
        </p>
      )}
    </>
  );
});
