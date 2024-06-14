<script setup lang="ts">
const supabase = useSupabaseClient();
const occurrences = ref<Occurrence[]>([]);
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
        user_id
      )
    `
  )
  .limit(5)
  .gt("starts_on", new Date().toISOString())
  .order("starts_on");

if (error) {
  console.error("Error fetching occurrences:", error);
  occurrences.value = [];
}

occurrences.value = data as Occurrence[];
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
          <UpcomingOccurrence :occurrence="occurrence" />
        </li>
      </ol>
    </div>
  </div>
</template>
