import { useId } from 'react';

import { Label } from '@/components/ui/label';
import { RadioGroup as RadioGroupUI, RadioGroupItem } from '@/components/ui/radio-group';

import { ImportanceType, UrgencyType } from '@/types';

interface RadioGroupProps<T extends ImportanceType | UrgencyType> {
  defaultValue?: T;
  values: T[];
  onChange?: (value: T) => void;
}

export const RadioGroup = <T extends ImportanceType | UrgencyType>({
  defaultValue,
  values,
  onChange,
}: RadioGroupProps<T>) => {
  const id = useId();

  return (
    <RadioGroupUI
      defaultValue={defaultValue || ''}
      onValueChange={(value: string) => onChange?.(value as T)}
    >
      {values.map((value, index) => (
        <div className="flex items-center gap-2" key={index}>
          <RadioGroupItem value={value || ''} id={`${value}-${id}`} />
          <Label htmlFor={`${value}-${id}`} className="cursor-pointer">
            {value}
          </Label>
        </div>
      ))}
    </RadioGroupUI>
  );
};
