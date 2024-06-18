<script setup lang="ts">
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();

let realtimeChannel: RealtimeChannel;

const { data: occurrences, refresh: refreshOccurrences } = await useAsyncData(
  "occurrences",
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
        user_id
      )
    `
      )
      .limit(5)
      .gt("starts_on", new Date().toISOString())
      .order("starts_on");

    return data;
  }
);

onMounted(() => {
  realtimeChannel = client
    .channel("public:participations")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "participations" },
      () => {
        console.log(
          "refreshing",
          occurrences.value?.map((o) => o.participations.length)
        );
        refreshOccurrences();
      }
    );

  realtimeChannel.subscribe();
});

onUnmounted(() => {
  client.removeChannel(realtimeChannel);
});
</script>

<template>
  <div>
    <h2 class="text-base font-semibold leading-6 text-gray-900">
      Die nächsten Läufe
    </h2>
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-16">
      <ol
        class="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8"
      >
        <li
          v-for="occurrence in occurrences"
          :key="occurrence.id"
          class="relative flex space-x-6 py-6 xl:static"
        >
          <UpcomingEvent :occurrence="occurrence" />
        </li>
      </ol>
    </div>
  </div>
</template>
