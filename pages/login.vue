<script setup lang="ts">
const supabase = useSupabaseClient();

const loading = ref(false);
const submitted = ref(false);
const email = defineModel<string>();
const loginError = ref("");

useHead({
  title: "LSF Hamburg West - Anmelden",
  meta: [
    {
      name: "description",
      content: "You have been logged out",
    },
  ],
});

const handleLogin = async () => {
  if (!email?.value) {
    loginError.value = "Bitte gib deine E-Mail Adresse ein.";
    return;
  }

  const emailRedirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`;

  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email?.value,
      options: { emailRedirectTo },
    });
    if (error) {
      loginError.value = error.message;
    } else {
      submitted.value = true;
    }
  } catch (error: any) {
    loginError.value = error?.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <Alert v-if="submitted" headline="E-Mail versendet" message="Du solltest in wenigen Sekunden eine E-Mail mit dem Login-Link bekommen." />
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="LSF Hamburg West Logo"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Melde dich mit deiner E-Mail Adresse an.
      </h2>
    </div>

    <div v-if="loginError">
      <Alert headline="Es ist ein Fehler aufgetreten" :message="loginError" />
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >E-Mail Adresse</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required="true"
              v-model="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            :disabled="loading || submitted"
            :value="loading ? 'Loading' : 'Send magic link'"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="{ 'bg-indigo-500 cursor-not-allowed': loading || submitted }"
            >
            Anmelden
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
