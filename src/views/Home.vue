<template>
  <div>
    <ul>
      <li v-for="(item, key) in surveys" :key="key">
        <router-link class="link" :to="{ name: 'Survey', params: { id: item._id }}">{{item.statement}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { DB } from '../helpers/firebaseConf'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      surveys: []
    }
  },
  mounted() {
    DB.collection('surveys').onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          const docData = { _id: doc.id, ...doc.data() }
          this.surveys.push(docData)
        });
      })
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 20px;
}

.link {
  display: block;
  background-color: #FFF;
  border-radius: 4px;
  text-decoration: none;
  color: #444;
  padding: 20px;
  margin-top: 8px
}
</style>


