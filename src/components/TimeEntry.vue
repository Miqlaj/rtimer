<template>
  <li
      class="list-group-item d-flex justify-content-between align-items-start"
  >
    <div class="ms-2 me-auto pe-2">
      <div class="fw-bold">
        {{ title }}
      </div>
      {{ date }}
    </div>
    <div class="flex-column-sb">
      <span class="badge bg-primary rounded-pill mt-1 mb-1">{{ secondsToHms(seconds) }}</span>
      <div
          class="btn-group btn-group-sm"
      >
        <button type="button" class="btn btn-sm btn-outline-success">
          <font-awesome-icon icon="play"/>
        </button>
        <button type="button" class="btn btn-sm btn-outline-primary">
          <font-awesome-icon icon="edit"/>
        </button>
        <button type="button" class="btn btn-sm btn-outline-danger">
          <font-awesome-icon icon="trash-alt"/>
        </button>
      </div>
    </div>
  </li>

</template>
<script>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

export default {
  name: "TimeEntry",
  components: {
    FontAwesomeIcon,
  },
  props: {
    title: String,
    id: Number,
    date: String,
    seconds: Number
  },
  methods: {
    secondsToHms(d) {
      d = Number(d);
      let h = Math.floor(d / 3600);
      let m = Math.floor(d % 3600 / 60);
      let s = Math.floor(d % 3600 % 60);

      let hDisplay = h > 0 ? h + (h === 1 ? "" : "") : "";
      let mDisplay = m > 0 ? m + (m === 1 ? "" : "") : "";
      let sDisplay = s > 0 ? s + (s === 1 ? "" : "") : "";
      if (hDisplay !== "") {
        return (hDisplay.length > 1 ? hDisplay : '0' + hDisplay) + ":" + (mDisplay.length > 1 ? mDisplay : '0' + mDisplay) + ":" + (sDisplay.length > 1 ? sDisplay : '0' + sDisplay);
      }
      else if (mDisplay !== "") {
        return (mDisplay.length > 1 ? mDisplay : '0' + mDisplay) + ":" + (sDisplay.length > 1 ? sDisplay : '0' + sDisplay);
      }
      else if (sDisplay !== "") {
        return "00:" + (sDisplay.length > 1 ? sDisplay : '0' + sDisplay);
      }
      return "00:00:00"
    }
  }
}
</script>
<style>
.flex-column-sb {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>