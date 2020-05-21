<template>
  <div class="switch-container">
    <label class="switch">
      <input type="checkbox" :checked="checked">
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'AppSwitch',
  props: {
    checked: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
  .switch-container {
    width: max-content;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 15px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #626262;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 9.67px;
    width: 9.67px;
    left: 2.5px;
    bottom: 1.75px;
    background-color: #626262;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    border: 1px solid #ffffff;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
    background-color: #ffffff;
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
