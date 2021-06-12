<template>
    <!-- <div class="container-scroller"> -->
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                <img src="assets/images/logo3.png" alt="logo">
              </div>
              <h4>APLIKASI PELAPORAN PENGADUAN MASYARAKAT</h4>
              <h6 class="font-weight-light"><b>Register Masyarakat</b></h6>
              <form v-on:submit.prevent="Register" class="pt-3" method="post">
                <div class="form-group">
                  <input v-model="nik" type="nik" class="form-control form-control-lg" id="nik" placeholder="NIK" required>
                </div>
                <div class="form-group">
                  <input v-model="nama" type="nama" class="form-control form-control-lg" id="nama" placeholder="Nama" required>
                </div>
                <div class="form-group">
                  <input v-model="username" type="username" class="form-control form-control-lg" id="username" placeholder="Username" required>
                </div>
                <div class="form-group">
                  <input v-model="telp" type="telp" class="form-control form-control-lg" id="telp" placeholder="Telp" required>
                </div>
                <div class="form-group">
                  <input v-model="password" type="password" class="form-control form-control-lg" id="password" placeholder="Password" required>
                </div>
                <div class="mt-3">
                    <input type="submit" name="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" value="SIGN UP">
                  <!-- <a class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="/login">SIGN UP</a> -->
        
                </div>
                <div class="text-center mt-4 font-weight-light">
                  Sudah punya akun ? Yuk Klik <a href="/login" class="text-dark"><b>LOGIN</b></a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  <!-- </div> -->
</template>


<script>
export default {
    data() {
      return {
        nik: '',
        nama: '',
        username: '',
        telp: '',
        password: '',
        level: '',
      }
    },
    methods: {
     Register: function(){
            this.$bvToast.show("loadingToast")
            let nik = this.nik 
            let nama = this.nama
            let username = this.username 
            let password = this.password
            let telp = this.telp 
      
            this.$store.dispatch('register', { nik, nama, username, password, telp })
            .then((response) => {
                this.message = response.data.message
                this.$bvToast.hide("loadingToast")
                this.$bvToast.show("message")
                this.$router.push('/login').catch(() => {});
            })
            .catch(err => console.log(err))
    }
}
}
</script>