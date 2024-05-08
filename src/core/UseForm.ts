import { MutableRefObject, useRef, useState } from "react";

export type FormValues = {
  [key: string]: string;
};

export type ValidationError = {
  field: string;
  message: string;
  isValidated?: boolean;
};

export type UseFormReturn = {
  values: MutableRefObject<FormValues>;
  errors: MutableRefObject<ValidationError[]>;
  handleSubmit: () => void;
  handleTextChange: (field: string, value: string) => void;
};

export type ValidationRule = {
  regex: RegExp;
  message: string;
};

export type ValidationRules = {
  [key: string]: ValidationRule[];
};

const useForm = (
  initialValues: FormValues,
  validationRules: ValidationRules,
  onSubmit: (values: FormValues) => void,
): UseFormReturn => {
  const valuesRef = useRef<FormValues>(initialValues);
  const errorsRef = useRef<ValidationError[]>([]);
  const [showError,setShowErrorStatus]=useState<boolean>(false);
  const validateFields = (): boolean => {
    const validationErrors: ValidationError[] = [];
    for (const field in validationRules) {
      const fieldValue = valuesRef.current[field];
      for (const rule of validationRules[field]) {
        if (!rule.regex.test(fieldValue)) {
          validationErrors.push({
            field,
            message: rule.message,
            isValidated: false,
          });
          break;
        } 
      }
    }
    errorsRef.current = validationErrors.filter((error, index, array) => {
      return array.findIndex((item) => item.field === error.field) === index;
    });
    return errorsRef.current.length === 0;
  };

  const handleSubmit = (): void => {
    if (validateFields()) {
      onSubmit(valuesRef.current);
    }
    else{
       setShowErrorStatus(true);
    }
  };

  const handleTextChange = (field: string, value: string): void => {
    valuesRef.current[field] = value;
    errorsRef.current = [];
    if(showError){
      errorsRef.current=[];
      setShowErrorStatus(false);
    }
  };

  return {
    values: valuesRef,
    errors: errorsRef,
    handleSubmit,
    handleTextChange,
  };
};

export default useForm;



 