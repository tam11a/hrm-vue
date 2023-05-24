<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { useForm } from 'vue-hooks-form'
import { useRouter } from 'vue-router'

const router = useRouter()

const { useField, handleSubmit } = useForm({
  defaultValues: {
    orgname: sessionStorage.getItem('org') || ''
  }
})

const orgname = useField('orgname', {
  rule: { required: true }
})

const onSubmit = (data: any) => {
  sessionStorage.setItem('org', data?.orgname)
  router.push('/sign')
}
const submitHandler = handleSubmit(onSubmit)
</script>

<template>
  <main class="flex flex-col items-center justify-center min-h-screen p-4">
    <form
      class="max-w-sm w-full mx-auto flex flex-col gap-2 p-5 bg-slate-100 rounded-md shadow-md shadow-slate-300"
      @submit="submitHandler"
    >
      <img src="/logo.png" class="max-w-xs mx-auto" />
      <p class="text-xs p-3 bg-slate-200 rounded-sm text-slate-500 font-medium">
        Manage the employee onboarding and offboarding processes, digitally with <b>BaniAdam</b>.
        <RouterLink to="/about" class="font-extrabold text-cyan-900 underline"
          >Learn More</RouterLink
        >
      </p>
      <hr class="border-t border-slate-300" />
      <div class="p-inputgroup flex-1">
        <span class="p-inputgroup-addon">
          <i class="pi pi-building"></i>
        </span>
        <InputText placeholder="Organization Name" v-model="orgname.value" :ref="orgname.ref" />
        <Button icon="pi pi-arrow-right" severity="primary" type="submit" />
      </div>
      <p
        class="text-xs text-red-600 font-semibold text-center p-4 bg-red-200 rounded-sm"
        v-if="orgname.error"
      >
        Enter your organization name to sign in.
      </p>
    </form>
  </main>
</template>
