<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
</script>

<template>
  <main>
    <form
      class="max-w-xs mx-auto flex flex-col gap-2 p-3 bg-slate-100 rounded-xl shadow-md shadow-slate-300"
    >
      <label for="username" class="font-bold text-sm">Username/Email</label>
      <InputText id="username" aria-describedby="username-help" />
      <!-- <small id="username-help">Enter your organization name to sign in your account.</small> -->
      <label for="password" class="font-bold text-sm">Password</label>
      <Password id="password" :feedback="false" toggleMask class="[&>input]:w-full" />
      <!-- <small id="username-help">Enter your organization name to sign in your account.</small> -->
      <Button type="button" label="Search" icon="pi pi-search" />
    </form>
  </main>
</template>
