import { useBoardStore } from '@/Store';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z.object({
  x: z
    .string()
    .min(1, 'Width must be a number')
    .regex(/^[0-9]*$/, 'NaN'),
  y: z
    .string()
    .min(1, 'Height must be a number')
    .regex(/^[0-9]*$/, 'NaN'),
});

type Form = z.infer<typeof formSchema>;

export const NewMap = () => {
  const setBoard = useBoardStore((state) => state.setBoard);
  const navigate = useNavigate();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      x: '10',
      y: '10',
    },
  });

  const onSubmit = (values: Form) => {
    const x = Number(values.x);
    const y = Number(values.y);
    const newBoard = Array(y)
      .fill(0)
      .map(() => Array(x).fill(0));
    setBoard(newBoard);
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="x"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input placeholder="width" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="y"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder="height" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
