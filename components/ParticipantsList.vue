<script setup lang="ts">
defineProps<{
  participations: Participation[];
}>();
</script>

<template>
  <div v-if="participations.length === 0" class="text-center text-gray-500">
    Sei die erste Person, die sich anmeldet!
  </div>
  <div v-else class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Zielzeit
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="participation in participations" :key="participation.id">
            <td
              class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
            >
              {{ participation?.profiles?.username || "Anonym" }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ participation.target_time }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
