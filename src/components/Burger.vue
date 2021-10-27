<template>
    <div class="burger" :class="{open: isOpen}">
        <span />
        <span />
        <span />
    </div>
</template>

<script>
    export default {
        props: {
            isOpen: {
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style scoped>
.burger {
    width: 35px;
    height: 25px;
    position: relative;
    margin: auto 0.5rem;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
    cursor: pointer;
}

.burger span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: #dec3b2;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
}

.burger span:nth-child(1) {
  top: 0px;
}

.burger span:nth-child(2) {
  top: 12px;
}

.burger span:nth-child(3) {
  top: 24px;
}

.burger.open span:nth-child(1) {
  top: 12px;
  transform: rotate(135deg);
}

.burger.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.burger.open span:nth-child(3) {
  top: 12px;
  transform: rotate(-135deg);
}
</style>
