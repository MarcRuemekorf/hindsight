import {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  ReactElement,
} from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";

import { Field, FieldRootProps, Input } from "@chakra-ui/react";

type TextInputProps<TFieldValues extends FieldValues = FieldValues> = {
  title: string;
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  options?: RegisterOptions<TFieldValues>;
  type?: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  inputMode?: HTMLInputElement["inputMode"];
  placeholder?: string;
  required?: boolean;
} & FieldRootProps;

const TextInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  title,
  control,
  type = "text",
  autoComplete,
  options = {},
  inputMode,
  placeholder,
  required = false,
  ...fieldProps
}: TextInputProps<TFieldValues>): ReactElement => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: options,
  });

  return (
    <Field.Root invalid={!!error} required={required} {...fieldProps}>
      <Field.Label>
        {title} <Field.RequiredIndicator />
      </Field.Label>
      <Input
        {...field}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
      {error && (
        <Field.ErrorText>{error.message || error.type}</Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default TextInput;
