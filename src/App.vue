<template>
    <div id="nav">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        |
        <router-link to="/chart">Chart Test</router-link>
        |
        <router-link to="/breadcrumb">Breadcrumb</router-link>
        |
        <router-link to="/loadingBar">Loading Bar</router-link>
        |
        <router-link to="/virtualScroll">Virtual Scroll</router-link>
        |
        <button @click='routerClick'>router</button>
    </div>
    <router-view/>
</template>

<script lang='ts'>
export default {
    methods: {
        routerClick() {
            // console.log(this.$router)
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
