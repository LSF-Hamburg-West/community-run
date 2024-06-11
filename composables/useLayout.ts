export const useLayout = () => {
  const user = useSupabaseUser();

  if (!user.value) {
    return 'logged-out'
  }

  return 'default';
}