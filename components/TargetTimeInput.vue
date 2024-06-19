<script setup lang="ts">
import { CheckIcon, PencilIcon } from "@heroicons/vue/20/solid";
import type { Database } from "~/types/database.types";

const props = defineProps<{
  participation: Participation;
}>();

const user = useSupabaseUser();

const client = useSupabaseClient<Database>();

const convertFromSeconds = computed(() => {
  let totalSeconds = props.participation.target_time;

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
});

const hours = convertFromSeconds.value.hours;
const minutes = convertFromSeconds.value.minutes;
const seconds = convertFromSeconds.value.seconds;

const target_time_hours = ref(hours);
const target_time_minutes = ref(minutes);
const target_time_seconds = ref(seconds);

const updateTargetTime = async () => {
  await client
    .from("participations")
    .update({
      target_time: convertToSeconds.value,
    })
    .eq("id", props.participation.id);
};

const convertToSeconds = computed(() => {
  return (
    target_time_hours.value * 3600 +
    target_time_minutes.value * 60 +
    target_time_seconds.value
  );
});

const save = async () => {
  await updateTargetTime();
  edit.value = false;
};

const edit = ref(false);

const formattedTargetTime = computed(() => {
  const { hours, minutes, seconds } = convertFromSeconds.value;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
});

const isParticipant = computed(
  () => props.participation.user_id === user.value?.id
);

const canEdit = computed(() => {
  return isParticipant.value && edit.value;
});
</script>

<template>
  <div>
    <div v-if="canEdit" class="flex items-center">
      <input
        v-model="target_time_hours"
        type="number"
        min="0"
        max="23"
        class="w-16"
      />
      <span class="mx-2">:</span>
      <input
        v-model="target_time_minutes"
        type="number"
        min="0"
        max="59"
        class="w-16"
      />
      <span class="mx-2">:</span>
      <input
        v-model="target_time_seconds"
        type="number"
        min="0"
        max="59"
        class="w-16"
      />
      <button @click="save">Speichern</button>
    </div>
    <div v-else class="flex space-x-2">
      <span>{{ formattedTargetTime }}</span>
      <button v-if="isParticipant" @click="edit = true">Bearbeiten</button>
    </div>
  </div>
</template>
