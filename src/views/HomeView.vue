<script setup lang="ts">
import InputText from 'primevue/inputtext'
</script>

<template>
  <main>
    <form class="max-w-xs mx-auto">
      <div class="flex flex-col gap-2">
        <label for="orgname">Organization Name</label>
        <InputText id="orgname" aria-describedby="orgname-help" />
        <small id="orgname-help">Enter your organization name to sign in your account.</small>
      </div>
    </form>
  </main>
</template>
