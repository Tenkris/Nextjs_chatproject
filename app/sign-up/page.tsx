'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formatDate } from '@/app/utils/dateUtils';

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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ReqData {
  email: string;
  password: string;
  name: string;
  dateofbirth: string; // format '1990-05-21' -> year-month-day (YYYY-MM-DD)
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email(),
  Month: z.string().min(1, { message: 'Month is required' }),
  Day: z.string().min(1, { message: 'Day is required' }),
  Year: z.string().min(1, { message: 'Year is required' }),
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

export default function SignUpPage() {
  const router = useRouter();

  const months = [
    { name: 'January', value: '01', days: 31 },
    { name: 'February', value: '02', days: 28 },
    { name: 'March', value: '03', days: 31 },
    { name: 'April', value: '04', days: 30 },
    { name: 'May', value: '05', days: 31 },
    { name: 'June', value: '06', days: 30 },
    { name: 'July', value: '07', days: 31 },
    { name: 'August', value: '08', days: 31 },
    { name: 'September', value: '09', days: 30 },
    { name: 'October', value: '10', days: 31 },
    { name: 'November', value: '11', days: 30 },
    { name: 'December', value: '12', days: 31 },
  ];

  const years = Array.from({ length: 2024 - 1900 + 1 }, (_, i) =>
    (1900 + i).toString(),
  ).sort((a, b) => parseInt(b) - parseInt(a));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      Month: '',
      Day: '',
      Year: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      name,
      email,
      password,
      Day,
      Month,
      Year,
    }: {
      name: string;
      email: string;
      password: string;
      Day: string;
      Month: string;
      Year: string;
    } = values;

    // Format the date of birth
    const formattedDateOfBirth = formatDate(Day, Month, Year);

    // Just name, email, password, and date of birth
    const signUpData: ReqData = {
      name,
      email,
      password,
      dateofbirth: formattedDateOfBirth,
    };
    // call api
    console.log(signUpData);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    router.push('/sign-in');

    // Proceed with signup data...
  }
  return (
    <div className="flex flex-col min-h-screen justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className=" w-full max-w-md">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center mb-7">
          Create an account
        </h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Date of Birth
            </p>
            <div className=" flex flex-row justify-between gap-3">
              <div className=" flex-1">
                <FormField
                  control={form.control}
                  name="Month"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={month.value} value={month.value}>
                                {month.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className=" flex-1">
                <FormField
                  control={form.control}
                  name="Day"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(
                              (day) => (
                                <SelectItem key={day} value={day.toString()}>
                                  {day}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className=" flex-1">
                <FormField
                  control={form.control}
                  name="Year"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-start">
          <Link
            href={{
              pathname: '/sign-in',
            }}
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
