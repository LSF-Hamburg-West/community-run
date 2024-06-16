<script setup lang="ts">
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/vue/20/solid";
import { ref } from "vue";
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const route = useRoute();

const { data, error } = await supabase
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
          profiles (
            username
          )
        )`
  )
  .eq("id", route.params.id)
  .single();

const hasSignedUp = ref<boolean>(
  data.participations.some((p) => p.user_id === user.value?.id)
);

const signOut = () => {};
const signUp = () => {};
</script>

<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-2xl font-semibold leading-7 text-gray-900">
        {{ data.events.name }}
      </h1>

      <dl class="mt-2 flex flex-col text-gray-500 xl:flex-row">
        <div class="flex items-start space-x-3">
          <dt class="mt-0.5">
            <span class="sr-only">Date</span>
            <CalendarIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd>
            <time :datetime="data.starts_on"
              >{{ data.starts_on }} um {{ data.start_time }}</time
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
            {{ data.events.location_name }}
          </dd>
        </div>
        <div
          class="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5"
        >
          <dt class="mt-0.5">
            <span class="sr-only">Location</span>
            <UserGroupIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd>{{ data.participations.length }} Teilnehmer*innen</dd>
        </div>
      </dl>
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
  <div>
    <EventMap :event="data.events" />
  </div>
</template>
