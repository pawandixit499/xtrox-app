import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext<any>({});

export const FormProvider = ({ children }:{children:any}) => {
  const [formData, setFormData] = useState({
    step_1: {},
    step_2: {},
    step_3: {},
  });

  const updateStepData = (stepKey:any, data:any) => {
    setFormData((prev:any) => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...data },
    }));
  };

  return (
    <FormContext.Provider value={{ formData, updateStepData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
