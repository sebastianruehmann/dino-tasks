<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal-content">
        <slot name="content">
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal'
}
</script>

<style lang="sass">
  .modal
    background-color: #fff;
    box-sizing: border-box;
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    position: absolute;

  .modal-enter
    opacity: 0;


  .modal-leave-active
    opacity: 0;

</style>
