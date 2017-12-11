<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
  </div>
</template>

<script>
import request from 'superagent/superagent';
import HelloWorld from './components/HelloWorld';

const agent = request.agent();
agent.get('http://www.baidu.com')
  .end((err, res) => {
    /* eslint-disable no-console */
    console.log(res);
  });
export default {
  name: 'app',
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
