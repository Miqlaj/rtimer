<template>
  <div class="container-fluid">
    <div class="col-12 mt-3">
      <Timer />
    </div>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";

export default {
  components: {
    Timer: Timer,
  },
};
</script>

