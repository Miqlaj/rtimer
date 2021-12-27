<template>
  <div class="container-fluid">
    <div class="col-12 mt-3">
      <div class="card">
        <h1 class="text-center">Settings</h1>
        <SettingsForm />
      </div>
    </div>
  </div>
</template>

<script>
import SettingsForm from "@/components/SettingsForm.vue";

export default {
  components: {
    SettingsForm: SettingsForm,
  },
};
</script>