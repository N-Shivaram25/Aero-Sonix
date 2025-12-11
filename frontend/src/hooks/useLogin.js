import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login } from "../lib/api";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      // Invalidate and refetch the auth user query
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // Refetch to get updated user data
      await queryClient.refetchQueries({ queryKey: ["authUser"] });
      // Navigate to home or onboarding based on onboarding status
      // The App component will handle the redirect based on isOnboarded status
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;
