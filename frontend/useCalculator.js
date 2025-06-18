

import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const useCalculator = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError } = useQuery(
    'calculatorData',
    async () => {
      try {
        const response = await axios.get('/api/calculator');
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        if (data) {
          queryClient.setQueryData('calculatorData', data);
        }
      },
      onError: (error) => {
        queryClient.setQueryData('calculatorData', null);
      },
    }
  );

  const { mutate, isLoading: isMutating } = useMutation(
    async (calculatorData) => {
      try {
        const response = await axios.post('/api/calculator', calculatorData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('calculatorData');
      },
      onError: (error) => {
        queryClient.setQueryData('calculatorData', null);
      },
    }
  );

  const updateCalculatorData = (calculatorData) => {
    mutate(calculatorData);
  };

  return {
    data,
    error,
    isLoading,
    isError,
    isMutating,
    updateCalculatorData,
  };
};

export default useCalculator;