<template>
  <section class="container">
    <el-row>
      <el-col :span="24" class="header">
        <h1 class="title-project">User Manager State</h1>
        <el-button class="btn-add-custom" @click="redirectToAdduser">Add user</el-button>
        <div class="list-user">
          <el-table
            :data="fakes"
            border
            style="width: 100%">
            <el-table-column
              prop="id"
              label="ID"
              width="50"
              align="center">
              <template slot-scope="{row}">
                <p>{{ row.id | toUpperCase }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="Name"
              width="280"
              align="center">
              <template slot-scope="{row}">
                <p>{{ row.name | toUpperCase }}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              label="Email"
              align="center"/>
            <el-table-column
              prop="age"
              label="Age"
              align="center"/>
            <el-table-column
              prop="gender"
              label="Gender"
              align="center">
              <template slot-scope="{row}">
                <p>{{ row.gender | filterGender }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="Action"
              width="120"
              align="center">
              <template slot-scope="{row}">
                <span><i class="el-icon-edit hover-icon" @click="redirectEdit(row)"/></span>
                <span><i class="el-icon-delete-solid hover-icon" @click="removeUser(row.id)"/></span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.baseUrl + this.$route.path,
      showHeader: false,
      showFooter: false,
      dataFromChild: '',
      titleFooter: ' This is H1',
      header: 'Hello',
      userFake: [
        {
          id: 1,
          name: 'Tom',
          email: 'Tom@mail.com',
          age: 18,
          gender: 1
        }
      ]
    }
  },
  head() {
    return {
      title: 'User-Manager List User Fake',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'List user fake description'
        }
      ],
      link: [
        { rel: 'canonical', href: process.env.baseURL + this.$router.currentRoute.path }
      ]
    }
  },
  async fetch({ store, params }) {
    await store.getters['fakes/fakes']
  },
  computed: {
    fakes() {
      console.log(process.env.baseURL)
      return this.$store.state.fakes.listsFake
    }
  },
  methods: {
    redirectToAdduser() {
      this.$router.push('/user/fake/add')
    },
    sendToParent(parents) {
      this.dataFromChild = parents
    },
    sendToChild() {
      this.$refs.header.getDataFromParent('1234')
    },
    setMessage(value) {
      console.log(value)
    },
    redirectEdit(row) {
      this.$router.push('/user/fake/' + row.id)
    },
    removeUser(id) {
      this.$confirm('You are delete?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('fakes/removeFake', id)
        console.log('11111')
        console.log(this.$store.state.fakes.listsFake)
        this.$message({
          type: 'success',
          message: 'Delete completed'
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 24px;
}
.header{
  margin-top: 20px;
  .title-project{
    text-align: center;
    font-size: 32px;
  }
}
.list-user{
  margin-top: 30px;
  .hover-icon{
    zoom: 2;
  }
  i {
    &:hover {
     cursor: pointer;
    }
  }
}
.btn-add-custom{
  font-size: 18px;
  border-color: #41B883;
  background: #41B883;
  color: #ffffff;
  &:hover, &:focus {
    background-color: #41B883;
    color: #ffffff;
  }
}
</style>

