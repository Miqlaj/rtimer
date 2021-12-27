<template>
  <div class="input-box">
    <input
        v-model="query"
        type="text"
        class="form-control"
        id="search"
        placeholder="Task title or #ID and press ENTER"
        @keyup.enter="searchForTask"
    />
  </div>
  <div class="list-group" v-if="tasks.length">
    <button
        v-for="(task) in tasks"
        v-bind:key="task.id"
        type="button"
        @click="selectTask(task)"
        class="list-group-item list-group-item-action"
    >
      {{ task.title }}
    </button>
  </div>
  <div
      v-show="tasksNotFound === true"
      class="alert alert-warning text-center mt-3"
      role="alert"
  >
    Task not found... Try again!
  </div>
  <div
      v-show="connectionError === true"
      class="alert alert-danger text-center mt-3"
      role="alert"
  >
    There is connection error!
  </div>
  <h4 class="mt-2" v-if="timeEntries.length">Time entries:</h4>
  <ol class="list-group list-group-numbered" v-if="timeEntries.length">
    <TimeEntry
        v-for="(timeEntry) in timeEntries"
        v-bind:key="timeEntry"
        :title="timeEntry.title"
        :time="timeEntry.seconds"
        :id="timeEntry.id"
    />
  </ol>
</template>

<script>
import axios from "axios";
import TimeEntry from "@/components/TimeEntry.vue";

export default {
  name: "Timer",
  data() {
    return {
      query: "",
      tasks: [],
      timeEntries: [],
      tasksNotFound: false,
      connectionError: false
    };
  },
  components: {
    TimeEntry
  },
  methods: {
    searchForTask: function () {
      let self = this;
      self.tasks = [];
      self.tasksNotFound = false;
      self.connectionError = false;
      if (self.query.charAt(0) === "#") {
        if (/\d/.test(self.query.slice(1))) {
          axios({
            method: "GET",
            headers: {
              "X-Redmine-API-Key": localStorage.getItem("auth.apiKey"),
              "Content-Type":
                  "application/x-www-form-urlencoded; charset=utf-8",
            },
            url: `${localStorage.getItem("auth.apiUrl")}/issues.json?issue_id=${encodeURIComponent(self.query.slice(1))}`,
          })
              .then(function (response) {
                if (response.data.total_count > 0) {
                  self.selectTask({
                    id: response.data.issues[0].id,
                    title:
                        response.data.issues[0].tracker.name +
                        " #" +
                        response.data.issues[0].id +
                        " (" +
                        response.data.issues[0].status.name +
                        "): " +
                        response.data.issues[0].subject,
                  });
                } else {
                  self.tasksNotFound = true;
                }
              })
              .catch(function () {
                self.connectionError = true;
              });
        } else {
          self.tasksNotFound = true;
        }
      } else {
        axios({
          method: "GET",
          headers: {
            "X-Redmine-API-Key": localStorage.getItem("auth.apiKey"),
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          url: `${localStorage.getItem("auth.apiUrl")}/search.json?q=${encodeURIComponent(self.query)}&titles_only=1&open_issues=1&issues=1&projects=0&messages=0`,
        })
            .then(function (response) {
              console.log(response);
              if (response.data.total_count > 0) {
                response.data.results.forEach((element) => {
                  self.tasks.push({
                    id: element.id,
                    title: element.title,
                  });
                });
              } else {
                self.tasksNotFound = true;
              }
            })
            .catch(function () {
              self.connectionError = true;
            });
      }
    },
    selectTask: function (task) {
      this.tasks = [];
      this.query = "";
      let date = new Date();
      this.timeEntries.push({
        title: task.title,
        id: task.id,
        seconds: 0,
        date: date.getDay() + '.' + date.getMonth() + '.' +date.getFullYear()
      })
    },
  },
};
</script>
<style>
ol {
  font-size: 11px;
}
</style>