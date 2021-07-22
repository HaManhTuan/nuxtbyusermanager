<template>
  <section v-loading.fullscreen.lock="fullscreenLoading" class="container">
    <el-row>
      <el-col :span="24" class="header">
        <el-row>
          <h1>Edit User ID: </h1>
          <el-col :span="24">
            <div class="add-user">
              <el-form ref="AddForm" :rules="rules" :model="user" label-width="100px" class="form-add-user">
                <el-form-item label="Name" prop="name">
                  <el-input v-model="user.name"/>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                  <el-input v-model="user.email"/>
                </el-form-item>
                <el-form-item
                  label="age"
                  prop="age"
                >
                  <el-input v-model.number="user.age" type="age" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="Gender">
                  <el-radio v-for="item in genderCheckbox" :label="item.value" :key="item.value" v-model="user.gender">{{ item.label }}</el-radio>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="btn-save" @click="submitForm('AddForm')">Edit</el-button>
                  <el-button type="danger" @click="backToList">Back to list</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { Message } from 'element-ui'
export default {
  // middleware: 'checkRouterReal',
  name: 'Add',
  data() {
    return {
      title: '',
      fullscreenLoading: false,
      user: { ...this.$store.state.users.user },
      genderCheckbox: [
        {
          label: 'Male',
          value: 1
        },
        {
          label: 'Female',
          value: 2
        },
        {
          label: 'Other genders',
          value: 3
        }
      ],
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: 'Please input Activity email', trigger: 'blur' }
        ],
        age: [
          { required: true, message: 'age is required' },
          { type: 'number', message: 'age must be a number' }
        ],
        gender: [
          { required: true, message: 'Please input Activity gender', trigger: 'blur' }
        ]
      }
    }
  },
  head() {
    return {
      title: 'Edit-User-' + this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Edit user ' + this.title
        }
      ],
      link: [
        { rel: 'canonical', href: process.env.baseURL + this.$route.path }
      ]
    }
  },
  async fetch({ store, params, route }) {
    await store.dispatch('users/showUser', route.params.id)
  },
  // computed: {
  //   user() {
  //     return Object.assign({}, )
  //   }
  // },
  created() {
    this.title = this.user.name
    if (Object.keys(this.user).length === 0) {
      this.$router.push('/user/real')
    }
  },
  methods: {
    backToList() {
      this.$router.push('/user/real')
    },
    submitForm(AddForm) {
      this.$refs[AddForm].validate((valid) => {
        if (valid) {
          this.user.id = this.$route.params.id
          this.$store.dispatch('users/editUser', this.user)
            .then(result => {
              Message({
                message: 'Edit user successfully',
                type: 'success',
                duration: 2000
              })
              this.$router.push('/user/real')
            }).catch(({ response: err }) => {
              Message({
                message: err.data.error,
                type: 'error',
                duration: 2000
              })
              this.$router.push('/user/real')
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
h1{
  text-align: center;
}
.header{
  margin-top: 40px;
}
.add-user{
  margin-top: 30px;
  .form-add-user{
    width: 50%;
    margin: 0 auto;
  }
  .btn-save{
    text-align: center;
  }
}
</style>
