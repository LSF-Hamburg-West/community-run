import type { Database } from "~/types/database.types";

export const useEventSignUp = async (occurrence_id: number) => {
  const client = useSupabaseClient<Database>();
  const user = useSupabaseUser();

  if (!user.value) {
    const showLoginModal = useState("showLoginModal", () => false);
    showLoginModal.value = true;
    return;
  }

  const { error } = await client.from("participations").insert([
    {
      user_id: user.value.id,
      occurrence_id,
    },
  ]);

  if (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};
