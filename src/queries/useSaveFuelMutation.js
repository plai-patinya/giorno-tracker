import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";

import useFuelStore
  from "../store/useFuelStore";

import {
  saveUserData
} from "../services/firebaseService";

const useSaveFuelMutation = (
  user
) => {

  const queryClient =
    useQueryClient();

  const {
  fuelRecords,
  setFuelRecords
  } = useFuelStore();

  return useMutation({

    onMutate: async (
    newFuelRecords
    ) => {

    // cancel old fetches
    await queryClient.cancelQueries({
        queryKey: [
        "fuelRecords",
        user?.uid
        ]
    });

    // snapshot
    const previousFuelRecords =
        fuelRecords;

    // optimistic update
    setFuelRecords(
        newFuelRecords
    );

    return {
        previousFuelRecords
    };

    },

    mutationFn: async (
      fuelRecords
    ) => {

      if (!user) {
        return;
      }

      await saveUserData(
        user.uid,
        {
          fuelRecords
        }
      );

      return fuelRecords;

    },

    onError: (
    err,
    newFuelRecords,
    context
    ) => {

    if (
        context?.previousFuelRecords
    ) {

        setFuelRecords(
        context.previousFuelRecords
        );

    }

    },

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          "fuelRecords",
          user?.uid
        ]
      });

    },

    retry: 2

  });

};

export default useSaveFuelMutation;