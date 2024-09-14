import { Label } from '@/components/ui/label';
import { RadioGroup as RadioGroupUI, RadioGroupItem } from '@/components/ui/radio-group';
import { Task } from '@/types';

interface RadioGroupProps<T> {
  //   defaultValue?: Task['urgency'] | Task['importance'];
  //   defaultValue?: keyof Pick<Task, 'urgency'> | keyof Pick<Task, 'importance'>;
  defaultValue?: T;
  values?: T[];
}

export const RadioGroup = <T extends string>({
  defaultValue,
  values,
}: RadioGroupProps<T>) => {
  <RadioGroupUI defaultValue={defaultValue}>
    {values?.map((value) => (
      <div className="flex items-center space-x-2" key={value}>
        <RadioGroupItem value={value} id={value} />
        <Label htmlFor={value}>{value}</Label>
      </div>
    ))}
  </RadioGroupUI>;
};
