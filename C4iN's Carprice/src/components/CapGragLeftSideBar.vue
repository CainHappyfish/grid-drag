<script setup lang="ts">
import {onMounted, ref} from "vue";
import ClearLogo from "../assets/clear.svg"
import Cross from "../assets/off.svg"
import CapGridCard from "./CapGridCard.vue";

const handleMenuClick = () => {
  const MenuButton = document.querySelector(".left-menu-button")
  const MenuLogo = document.querySelector(".menu-logo")
  const MenuContent = document.querySelectorAll(".menu-content")
  const MenuButtonChildren = document.querySelectorAll(".menu-logo span")
  // console.log(MenuButton)
  if (MenuButton && MenuLogo && MenuContent) {
    MenuButton.classList.toggle("menu-active")
    MenuLogo.classList.toggle("is-active")

    MenuButtonChildren.forEach((span) => {
      span.classList.toggle("is-active")
    })

    MenuContent.forEach((ctn) => {
      ctn.classList.toggle("inactive")
    })
  }
}

const AddGridCard = () => {

}

</script>

<template>
  <div class="left-container">
    <div class="left-menu-container">
      <div class="left-menu-button">
        <div class="menu-logo" @click="handleMenuClick">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="left-menu-content">
          <div class="param-form" id="CardParam">
            <div class="input-container">
              <input class="input-area" title="行">
              <img :src="Cross" alt="" style="width: 20px; height:20px" />
              <input class="input-area">
            </div>
            <button class="add-button">插入方块</button>
          </div>

        </div>
      </div>
    </div>

    <div class="clear-button">
      <img :src="ClearLogo" alt="clear" style="height: 50px; width: 50px"/>
    </div>
  </div>
</template>

<style scoped>
.grid-test {
  width: 100px;
  height: 50px;
  z-index: 3;
  margin: 5px;
  border-radius: 10px;
  background: rgba(166, 174, 174, 0.6);
  opacity: 0.6;
  cursor: pointer;
}
.left-menu-button {
  margin: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.7;
  background: #3c3f41;

  transition: all 0.5s ease;
  overflow: hidden;
}

.menu-active {
  margin: 10px;
  width: 200px;
  height: 400px;
  border-radius: 20px;

  background: #3c3f41;
  opacity: 0.7;
}

.left-container {
  height: 40%;
  position: sticky;
  top: 20px
}

.menu-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  z-index: 3;

}

.menu-logo span {
  margin: 5px;
  display: block;
  width: 50px;
  height: 5px;
  border-radius: 5px;
  background: azure;

  transform-origin: 4px 0;


  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              all 0.5s ease,
              opacity 0.55s ease;

}

.menu-logo.is-active span:nth-child(1) {
  width: 30px;
  transform-origin: 0 0;
  transform: rotate(45deg);
}
.menu-logo.is-active span:nth-child(2) {
  width: 30px;
  transform: rotate(0deg) scale(0.2, 0.2);
  opacity: 0;
}
.menu-logo.is-active span:nth-child(3) {
  width: 30px;
  transform-origin: 0 0;
  transform: rotate(-45deg) translate(3px, -9px);
}

.inactive {
  display: none;
}

.clear-button {
  margin: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.7;
  background: #3c3f41;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  cursor: pointer;
}

.param-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  margin: 0 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  & .input-area {
    text-align: center;
    width: 30px;
    height: 30px;
  }

}

.add-button {
  border: solid 2px #b3bebe;
  background: #303232;
  border-radius: 5px;
  width: 100px;
  height: 30px;

  &:hover {
    background: #b3bebe;
  }

  &:active {
    background: #b3bebe;

  }
}







</style>