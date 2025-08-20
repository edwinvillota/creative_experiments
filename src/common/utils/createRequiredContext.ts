import React from 'react';

export const createRequiredContext = <TType>(defaultValues?: TType) => {
  const context = React.createContext<TType | null>(defaultValues ?? null);

  const useContext = () => {
    const contextValue = React.useContext(context);

    if (contextValue === null) {
      throw new Error('Context value is null');
    }

    return contextValue;
  };

  return [useContext, context.Provider] as const;
};
