<script setup lang="ts">
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/vue/20/solid";
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const props = defineProps<{
  occurrence: Occurrence;
}>();

const participationsCount = ref<number>(props.occurrence.participations.length);
const hasSignedUp = ref<boolean>(
  props.occurrence.participations.some((p) => p.user_id === user.value?.id)
);

const showLoginModal = useState('showLoginModal', () => false);


const signUp = async () => {
  if (!user.value) {
    showLoginModal.value = true;
    return;
  }

  const { error } = await supabase.from("participations").insert([
    {
      user_id: user.value.id,
      occurrence_id: props.occurrence.id,
    },
  ]);

  if (error) {
    console.error("Error signing up:", error);
  } else {
    hasSignedUp.value = true;
    participationsCount.value = participationsCount.value + 1;
  }
};

const signOut = async () => {
  if (!user.value) {
    return;
  }

  const { error } = await supabase
    .from("participations")
    .delete()
    .eq("user_id", user.value.id)
    .eq("occurrence_id", props.occurrence.id);

  if (error) {
    console.error("Error signing out:", error);
  } else {
    hasSignedUp.value = false;
    participationsCount.value = participationsCount.value - 1;
  }
};
</script>

<template>
  <div v-if="occurrence.events" class="flex-auto">
    <h3 class="pr-10 font-semibold text-gray-900 xl:pr-0">
      {{ occurrence.events.name }}
    </h3>
    <dl class="mt-2 flex flex-col text-gray-500 xl:flex-row">
      <div class="flex items-start space-x-3">
        <dt class="mt-0.5">
          <span class="sr-only">Date</span>
          <CalendarIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </dt>
        <dd>
          <time :datetime="occurrence.starts_on"
            >{{ occurrence.starts_on }} at {{ occurrence.start_time }}</time
          >
        </dd>
      </div>
      <div
        class="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5"
      >
        <dt class="mt-0.5">
          <span class="sr-only">Location</span>
          <MapPinIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </dt>
        <dd class="underline cursor-pointer">
          <a
            target="_blank"
            :href="`https://www.openstreetmap.org/?mlat=${occurrence.events.latitude}&mlon=${occurrence.events.longitude}&zoom=20`"
            >{{ occurrence.events.location_name }}</a
          >
        </dd>
      </div>
      <div
        class="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5"
      >
        <dt class="mt-0.5">
          <span class="sr-only">Location</span>
          <UserGroupIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </dt>
        <dd>
          {{ participationsCount }}
        </dd>
      </div>
    </dl>
  </div>
  <div v-if="hasSignedUp" class="my-auto">
    <SecondaryButton @click="signOut">Abmelden</SecondaryButton>
  </div>
  <div v-else class="my-auto">
    <PrimaryButton v-if="!hasSignedUp" @click="signUp">Anmelden</PrimaryButton>
  </div>
</template>
