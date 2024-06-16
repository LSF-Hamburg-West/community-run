<script setup lang="ts">
import {
  CalendarIcon,
  EyeIcon,
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

const showLoginModal = useState("showLoginModal", () => false);

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
    <div class="pr-10 font-semibold text-gray-900 xl:pr-0">
      {{ occurrence.events.name }}
    </div>
    <dl class="mt-2 flex flex-col text-gray-500 xl:flex-row">
      <div class="flex items-start space-x-3">
        <dt class="mt-0.5">
          <span class="sr-only">Date</span>
          <CalendarIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </dt>
        <dd>
          <time :datetime="occurrence.starts_on"
            >{{ occurrence.starts_on }} um {{ occurrence.start_time }}</time
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
  <div class="flex flex-col justify-around sm:flex-row sm:space-x-2">
    <div class="sm:order-last sm:ml-2">
      <NuxtLink
        :to="`/events/${occurrence.id}`"
        class="text-sm font-normal text-blue-600"
      >
        <span class="sr-only">Details</span>
        <SecondaryButton>
          <div class="flex items-center space-x-1">
            <EyeIcon class="h-4 w-4" aria-hidden="true" />
            <span>Details</span>
          </div>
        </SecondaryButton>
      </NuxtLink>
    </div>
    <div>
      <div v-if="hasSignedUp" class="my-auto">
        <SecondaryButton @click="signOut">Abmelden</SecondaryButton>
      </div>
      <div v-else class="my-auto">
        <PrimaryButton v-if="!hasSignedUp" @click="signUp"
          >Anmelden</PrimaryButton
        >
      </div>
    </div>
  </div>
</template>
