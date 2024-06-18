<script setup lang="ts">
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/vue/20/solid";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();

let realtimeChannel: RealtimeChannel;

const user = useSupabaseUser();

const route = useRoute();

const { data: occurrence, refresh: refreshOccurrence } = await useAsyncData(
  `occurrence_details_${route.params.id}`,
  async () => {
    const { data } = await client
      .from("occurrences")
      .select(
        `
        id,
        starts_on,
        start_time,
        events (
          name,
          location_name,
          longitude,
          latitude
        ),
        participations (
          id,
          user_id,
          target_time,
          profiles (
            username
          )
        )`
      )
      .eq("id", route.params.id)
      .single();

    return data;
  }
);

if (!occurrence) {
  navigateTo("/404");
}

const isParticipating = computed(() =>
  occurrence.value
    ? occurrence.value.participations.some((p) => p.user_id === user.value?.id)
    : false
);

onMounted(() => {
  realtimeChannel = client.channel("public:participations").on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "participations",
      filter: `occurrence_id=eq.${route.params.id}`,
    },
    (payload) => {
      refreshOccurrence();
    }
  );

  realtimeChannel.subscribe();
});

onUnmounted(() => {
  client.removeChannel(realtimeChannel);
});
</script>

<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-2xl font-semibold leading-7 text-gray-900">
        {{ occurrence.events.name }}
      </h1>

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
          <dd>
            {{ occurrence.events.location_name }}
          </dd>
        </div>
        <div
          class="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5"
        >
          <dt class="mt-0.5">
            <span class="sr-only">Location</span>
            <UserGroupIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd>{{ occurrence.participations.length }} Teilnehmer*innen</dd>
        </div>
      </dl>
    </div>
    <div>
      <div v-if="isParticipating" class="my-auto">
        <SecondaryButton @click="() => useEventSignOut(occurrence.id)"
          >Abmelden</SecondaryButton
        >
      </div>
      <div v-else class="my-auto">
        <PrimaryButton
          v-if="!isParticipating"
          @click="() => useEventSignUp(occurrence.id)"
          >Anmelden</PrimaryButton
        >
      </div>
    </div>
  </div>
  <div class="flex flex-col sm:flex-row sm:space-x-4 mt-8">
    <div class="w-full sm:w-1/2 md:w-2/3">
      <ParticipantsList :participations="occurrence.participations" />
    </div>
    <div class="w-full sm:w-1/2 md:w-1/3">
      <EventMap :event="occurrence.events" />
    </div>
  </div>
</template>
