import React, { useState } from 'react';

interface UseRadioGroupOptions<T> {
  name: string;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

interface RadioGroupProps<T> {
  value: T;
  checked: boolean;
  onChange: () => void;
}

interface UseRadioGroupResult<T> {
  getRadioProps: (props: { value: T }) => RadioGroupProps<T>;
}

function useRadioGroup<T>({
  name,
  defaultValue,
  onChange,
}: UseRadioGroupOptions<T>): UseRadioGroupResult<T> {
  const [selectedValue, setSelectedValue] = useState<T | undefined>(defaultValue);

  const getRadioProps = ({ value }: { value: T }): RadioGroupProps<T> => {
    return {
      value,
      checked: selectedValue === value,
      onChange: () => setSelectedValue(value),
    };
  };

  return { getRadioProps };
}

export default useRadioGroup;
