<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { RouterLink } from 'vue-router'
import { getOrgDP, useLogin } from '../helpers/queries/auth/index'
import { useRouter } from 'vue-router'
import { useForm } from '@evilkiwi/form'
import { handler } from '@/helpers/service/response'

const router = useRouter()

var org = sessionStorage.getItem('org') || ''
if (!org) router.replace('/')

const { useField, handle: handleSubmit } = useForm<{ username: string; password: string }>({
  defaults: {
    username: '',
    password: ''
  }
})

const username = useField('username', {
  required: true
})

const password = useField('password', {
  required: true
})

const { mutateAsync, isLoading } = useLogin()

const onSubmit = handleSubmit(async (data: any) => {
  const res = await handler(() =>
    mutateAsync({
      client_secret: import.meta.env.VITE_CLIENT_SECRET,
      client_id: import.meta.env.VITE_CLIENT_ID,
      grant_type: 'password',
      ...data
    })
  )
  console.log(res)
})
</script>

<template>
  <main class="flex flex-col items-center justify-center min-h-screen p-4">
    <form
      class="max-w-sm w-full mx-auto flex flex-col gap-2 p-3 bg-slate-100 rounded-md shadow-md shadow-slate-300"
      @submit.prevent="onSubmit"
    >
      <div class="flex flex-col gap-2 items-center justify-center">
        <img src="/logo.png" class="w-2/3" />
        <hr class="border-slate-300 w-full" />
        <img :src="getOrgDP(org)" class="w-1/3 mt-3 rounded-lg" />
      </div>
      <div class="text-center text-xs font-medium">
        <p class="my-1">
          Signing in as the Organization <b class="capitalize">{{ org }}.</b>
        </p>
        <RouterLink to="/"
          >Not Your Org?
          <b class="font-extrabold text-cyan-900 underline">Change Now.</b></RouterLink
        >
      </div>

      <hr class="border-slate-300" />

      <label for="username" class="font-bold text-sm">Email</label>
      <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
          <i class="pi pi-user"></i>
        </span>
        <InputText
          id="username"
          aria-describedby="username-help"
          placeholder="Email"
          name="username"
          v-model="username.value"
        />
      </div>
      <!-- <small id="username-help">Enter your organization name to sign in your account.</small> -->
      <label for="password" class="font-bold text-sm">Password</label>
      <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
          <i class="pi pi-key"></i>
        </span>
        <Password
          id="password"
          :feedback="false"
          toggleMask
          class="[&>input]:w-full"
          placeholder="Password"
          name="password"
          v-model="password.value"
        />
      </div>
      <!-- <small id="username-help">Enter your organization name to sign in your account.</small> -->
      <Button type="submit" label="Sign in" icon="pi" size="small" :disabled="isLoading" />
    </form>
  </main>
</template>
