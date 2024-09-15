import { Label } from '@/components/ui/label';
import { RadioGroup as RadioGroupUI, RadioGroupItem } from '@/components/ui/radio-group';
import { useId } from 'react';

interface RadioGroupProps {
  defaultValue?: string;
  values: string[];
}

export const RadioGroup = ({ defaultValue, values }: RadioGroupProps) => {
  const id = useId();

  return (
    <RadioGroupUI defaultValue={defaultValue}>
      {values.map((value, index) => (
        <div className="flex items-center gap-2" key={index}>
          <RadioGroupItem value={value} id={`${value}-${id}`} />
          <Label htmlFor={`${value}-${id}`} className="cursor-pointer">
            {value}
          </Label>
        </div>
      ))}
    </RadioGroupUI>
  );
};
