<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="body-left">
        <div class="profile text-center">
          <h1 class="text-center">Hi</h1>
          <h3 class="text-center">This is Manager User Project</h3>
          <img src="~/assets/none-avatar.jpeg" class="img-none-avatar" alt="avatar" width="215" height="215">
        </div>
        <div class="group-button text-center">
          <NuxtLink to="/user/real"><el-button class="btn-user-real">User API</el-button></NuxtLink>
          <NuxtLink to="/user/fake"><el-button class="btn-user-fake">User Store</el-button></NuxtLink>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" class="body-right">
        <NuxtChild/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('users/logout')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
a.nuxt-link-active {
  button {
    background-color: #41B883;
    color: white;
  }
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  button {
    background-color: #41B883;
    color: white;
  }
}
@media only screen and (min-width: 992px) {
  .body-left{
    .group-button{
      button {
        margin-bottom: 20px;
      }
    }
  }
}
.body-left{
  .profile{
    margin: 60px 0;
    .img-none-avatar{
      margin-top: 30px;
    }
  }
  .group-button{
    button {
      width: 130px;
      height: 130px;
      font-size: 18px;
      border-color: #41B883;
      &:hover, &:focus {
        background-color: #41B883;
        color: #35495E;
      }
    }
  }
}

</style>
