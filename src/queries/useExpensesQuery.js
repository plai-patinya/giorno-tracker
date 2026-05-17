import { useQuery } from "@tanstack/react-query";

import {
  getUserData
} from "../services/firebaseService";

const useExpensesQuery = (user) => {

  return useQuery({

    queryKey: [
      "expenses",
      user?.uid
    ],

    enabled: !!user,

    queryFn: async () => {

      if (!user) {

        return {
          expenses: [],
          fuelRecords: []
        };

      }

      return await getUserData(
        user.uid
      );

    },

    staleTime: 1000 * 60 * 5,

    retry: 2

  });

};

export default useExpensesQuery;