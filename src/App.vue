<template>
  <ul class="nav nav-tabs nav-justified">
    <li class="nav-item">
      <router-link class="nav-link" active-class="active" to="/"
        >Timer</router-link
      >
    </li>
    <li class="nav-item">
      <router-link class="nav-link" active-class="active" to="/settings"
        >Settings</router-link
      >
    </li>
  </ul>
  <router-view />
</template>

<style>
body {
    background-color: #eee
}

.card {
    background-color: #fff;
    padding: 15px;
    border: none
}

.input-box {
    position: relative
}

.input-box i {
    position: absolute;
    right: 13px;
    top: 15px;
    color: #ced4da
}

.form-control {
    height: 50px;
    background-color: #eeeeee69
}

.form-control:focus {
    background-color: #eeeeee69;
    box-shadow: none;
    border-color: #eee
}

.list {
    padding-top: 20px;
    padding-bottom: 10px;
    display: flex;
    align-items: center
}

.border-bottom {
    border-bottom: 2px solid #eee
}

.list i {
    font-size: 19px;
    color: red
}

.list small {
    color: #dedddd
}
</style>