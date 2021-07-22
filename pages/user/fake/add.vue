<template>
  <section v-loading.fullscreen.lock="fullscreenLoading" class="container">
    <el-row>
      <el-col :span="24" class="header">
        <el-row>
          <h1>Add User State</h1>
          <el-col :span="24">
            <div class="add-user">
              <el-form ref="AddForm" :rules="rules" :model="formAddUser" label-width="100px" class="form-add-user">
                <el-form-item label="Name" prop="name">
                  <el-input v-model="formAddUser.name"/>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                  <el-input v-model="formAddUser.email"/>
                </el-form-item>
                <el-form-item
                  label="age"
                  prop="age"
                >
                  <el-input v-model.number="formAddUser.age" type="age" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="Gender" prop="gender">
                  <el-radio-group v-model="formAddUser.gender">
                    <el-radio v-for="item in genderCheckbox" :label="item.value" :key="item.value">{{ item.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button class="btn-add-custom btn-save" @click="submitForm('AddForm')">Add</el-button>
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
  name: 'Add',
  data() {
    return {
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
      fullscreenLoading: false,
      formAddUser: {
        name: '',
        email: '',
        age: '',
        gender: ''
      },
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
      title: 'Add User Fake',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Add user fake description'
        }
      ],
      link: [
        { rel: 'canonical', href: process.env.baseURL + this.$route.path }
      ]
    }
  },
  methods: {
    backToList() {
      this.$router.push('/user/fake')
    },
    submitForm(AddForm) {
      this.$refs[AddForm].validate((valid) => {
        if (valid) {
          this.$store.dispatch('fakes/addFake', this.formAddUser)
          Message({
            message: 'Add user successfully',
            type: 'success',
            duration: 2000
          })
          this.$router.push('/user/fake')
        } else {
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
.add-user {
  margin-top: 30px;

  .form-add-user {
    width: 50%;
    margin: 0 auto;
  }

  .btn-save {
    text-align: center;
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
}
</style>
