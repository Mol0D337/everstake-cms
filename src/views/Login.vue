<template>
  <div class="sign-in">

    <a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
        <h1 class="mb-15 text-center">Sign In</h1>
        <h5 class="font-regular text-muted text-center mb-4">Sign in with firebase auth</h5>


        <a-button type="primary" block class="login-form-button mb-3" :disabled="isUserLoading" @click="LOGIN_VIA_SOCIAL_MEDIA('google')">SIGN IN WITH GOOGLE</a-button>
        <a-button type="primary" block class="login-form-button mb-3" :disabled="isUserLoading" @click="LOGIN_VIA_SOCIAL_MEDIA('google')">SIGN IN WITH FACEBOOK</a-button>
        <a-button type="primary" block class="login-form-button mb-3" :disabled="isUserLoading" @click="LOGIN_VIA_SOCIAL_MEDIA('google')">SIGN IN WITH TWITTER</a-button>

      </a-col>
      <!-- / Sign In Form Column -->

      <!-- Sign In Image Column -->
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
        <img src="images/img-signin.jpg" alt="">
      </a-col>
      <!-- Sign In Image Column -->

    </a-row>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { LOGIN_VIA_SOCIAL_MEDIA } from '@/store/action-types';

  export default ({
    name: 'Login',
    computed: {
      ...mapState('auth', ['user', 'isUserLoading']),
    },
    methods: {
      ...mapActions('auth', [LOGIN_VIA_SOCIAL_MEDIA]),
    },
  })

</script>

<style lang="scss">
  .sign-in {
    overflow: hidden
  }
  body {
    background-color: #ffffff;
  }
</style>
