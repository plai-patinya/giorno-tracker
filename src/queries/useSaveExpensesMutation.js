import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import useExpenseStore
  from "../store/useExpenseStore";

import {
  saveUserData
} from "../services/firebaseService";

import {

  addMutation

} from "../database/mutationQueue";

const useSaveExpensesMutation = (
  user
) => {

  const queryClient =
    useQueryClient();

  const {
    expenses,
    setExpenses
  } = useExpenseStore();

  return useMutation({

    onMutate: async (
        newExpenses
    ) => {

    // cancel old fetches
    await queryClient.cancelQueries({
        queryKey: [
        "expenses",
        user?.uid
        ]
    });

    // snapshot
    const previousExpenses =
        expenses;

    // optimistic update
    setExpenses(newExpenses);

    return {
        previousExpenses
    };

    },

    mutationFn: async (
      expenses
    ) => {

      if (!user) {
        return;
      }

      await saveUserData(
        user.uid,
        {
          expenses
        }
      );

      return expenses;

    },

    onError: (
        err,
        newExpenses,
        context
        ) => {

        if (
            context?.previousExpenses
        ) {

            setExpenses(
            context.previousExpenses
            );

        }

        //
        // 📦 Queue failed mutation
        //

        addMutation({

        type: "SAVE_EXPENSES",

        payload: newExpenses

        });

    },

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          "expenses",
          user?.uid
        ]
      });

    },

    retry: 2

  });

};

export default useSaveExpensesMutation;