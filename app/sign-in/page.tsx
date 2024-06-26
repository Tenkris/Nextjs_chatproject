'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import Link from 'next/link';
import { GoogleIcon, GitHubIcon } from '@/components/ui/Icons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/\d/, { message: 'Password must contain at least one number' }),
});

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleGoogleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const result: any = await signIn('google', { callbackUrl: '/profile' });

      if (result.error) {
        console.error(result.error);
      } else router.push('/profile');
    } catch (error) {
      console.log('error', error);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result: any = signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (result.error) {
        console.error(result.error);
      } else {
        router.push('/profile');
      }
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className=" w-full max-w-md flex flex-col ">
        <div className=" mb-4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
            Welcome Back !
          </h4>
          <p className="leading-7 [&:not(:first-child)] text-center mt-3">
            We're so excited to see you again!
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" flex flex-col gap-5">
              <Link
                href={{
                  pathname: '/',
                }}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold"
              >
                Forgot password?
              </Link>
              <Button type="submit" className=" w-full">
                Log in
              </Button>
              <p className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-medium text-center">
                or continue with
              </p>
              <div className=" flex flex-row justify-center gap-3">
                <Button
                  size="lg"
                  className=" rounded-full p-2"
                  onClick={handleGoogleSignIn}
                >
                  <GoogleIcon />
                </Button>
                <Button size="lg" className=" rounded-full p-2" disabled>
                  <GitHubIcon />
                </Button>
              </div>
              <div className=" pt-10 ">
                <p className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-medium text-center">
                  Need an account?{' '}
                  <Link
                    href={{ pathname: '/sign-up' }}
                    className=" font-extrabold"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
