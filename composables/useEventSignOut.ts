import type { Database } from "~/types/database.types";

export const useEventSignOut = async (occurrence_id: number) => {
  const client = useSupabaseClient<Database>();
  const user = useSupabaseUser();

  if (!user.value) {
    return;
  }

  const { error } = await client
    .from("participations")
    .delete()
    .eq("user_id", user.value.id)
    .eq("occurrence_id", occurrence_id);

  if (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};
