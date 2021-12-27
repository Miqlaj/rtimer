
<template>
  <form v-on:submit.prevent="storeAndTestSettings">
    <div class="mb-3">
      <label for="apiUrl" class="form-label"> API url </label>
      <input
        type="text"
        class="form-control"
        id="apiUrl"
        v-model="apiUrl"
        placeholder="https://yourredminedomain.com"
      />
    </div>
    <div class="mb-3">
      <label for="apiKey" class="form-label"> API key </label>
      <input
        type="text"
        class="form-control"
        id="apiKey"
        v-model="apiKey"
        placeholder="XXXxxXXXXxxxXXxXXxXXXxXXXxXxXXXxxxXXXXXx"
      />
    </div>
    <div class="mb-3">
      <label for="apiJob" class="form-label"> Redmine Job (optional) </label>
      <select id="apiJob" v-model="apiJob" class="form-select">
        <option selected>-----</option>
        <option value="1">Developer</option>
        <option value="2">Project manager</option>
        <option value="11">Tester</option>
        <option value="9">UX/Design</option>
        <option value="12">TL support</option>
        <option value="7">CTO-CEO support</option>
        <option value="15">Infrastructure</option>
      </select>
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-dark">Submit and test</button>
    </div>
    <div v-if="dataValid === 1" class="alert alert-success mt-3" role="alert">
        Valid credentials, rTimer is ready to rock!
    </div>
    <div v-if="dataValid === 2" class="alert alert-danger mt-3 " role="alert">
        Check your credentials, there was a connection error.
    </div>
  </form>
</template>
<script>
import axios from "axios";

export default {
  name: "SettingsForm",
  data() {
    return {
      apiUrl: localStorage.getItem("auth.apiUrl") ?? "",
      apiKey: localStorage.getItem("auth.apiKey") ?? "",
      apiJob: localStorage.getItem("auth.apiJob") ?? "",
      dataValid: 0,
    };
  },
  created: function () {
    this.storeAndTestSettings();
  },
  methods: {
    storeAndTestSettings: function () {
      let self = this;
      localStorage.setItem("auth.apiUrl", this.apiUrl);
      localStorage.setItem("auth.apiKey", this.apiKey);
      localStorage.setItem("auth.apiJob", this.apiJob);
      axios({
        method: "GET",
        headers: {
          "X-Redmine-API-Key": this.apiKey,
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
        url: `${this.apiUrl}/issues.json?assigned_to_id=me`,
      })
        .then(function (response) {
          if(response.status === 200){
            self.dataValid = 1;
          }else{
            self.dataValid = 2;
          }
        })
        .catch(function () {
          self.dataValid = 2;
        });
    },
  },
};
</script>