<template>
    <div class="container-scroller">
      <div>
        <div class="content-wrapper "  >
          <!-- <div class="row"> -->
            <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
            <div class="card-body">
              <p class="card-title float-left"><b>Data Pengaduan Masyarakat</b></p>
              <p class="card-description float-right">
                <b-button variant="success" v-b-modal.modalPengaduan v-on:click="Add"><i class="mdi mdi-plus btn-icon-prepend"></i> Tambah</b-button>
              </p>
              <div class="table-responsive">
                <b-table striped hover :items="pengaduan" :fields="fields">
                  <template v-slot:cell(status)="data">
                    <b-badge variant="info" v-if="data.item.status === 'terkirim'">{{ data.item.status }}</b-badge>
                    <b-badge variant="warning" v-if="data.item.status === 'proses'">{{ data.item.status }}</b-badge>
                    <b-badge variant="success" v-if="data.item.status === 'selesai'">{{ data.item.status }}</b-badge>
                    <b-badge variant="danger" v-if="data.item.status === 'tolak'">{{ data.item.status }}</b-badge>
                  </template>

                  <template v-slot:cell(tanggapan)="data">
                    {{ (data.item.tanggapan !== null) ? data.item.tanggapan.tanggapan :null}}
                  </template>

                  <template v-slot:cell(foto)="data">
                    <img
                      style="width: 150px; height: 120px; border-radius: 5%"
                      :src="'http://localhost:8000/uploads/' + data.item.foto"
                    />
                  </template>
                </b-table>

                
                <b-pagination
                  v-model="currentPage"
                  :per-page="perPage"
                  :total-rows="rows"
                  align="center"
                  v-on:input="pagination">
                </b-pagination>

                <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                  <b-spinner label="Spinning" variant="primary"></b-spinner>
                  <strong class="text-primary">Loading...</strong>
                </b-toast>

                <!-- toast untuk tampilan message box -->
                <b-toast id="message" title="Message">
                  <strong class="text-primary">{{ message }}</strong>
                </b-toast>

              <!-- </div> -->
            </div>
          </div>
            </div>
   
          </div>
        </div>
        </div>
        <!-- content-wrapper ends -->

          <b-modal 
      id="modalPengaduan"
      @ok="Save"
    >
      <template v-slot:modal-title>
        Form Pengaduan
      </template>
        <form ref="form-sample">
          <div class="form-group">
            <div class="form-group">
              <label for="nama" class="col-form-label">Tanggal Pengaduan</label>
              <input type="date" name="tgl_pengaduan" class="form-control" id="tgl_pengaduan" placeholder="Tgl Pengaduan" v-model="tgl_pengaduan">
            </div>
             <div class="form-group">
              <label for="nama" class="col-form-label">Isi Laporan</label>
              <input type="text" name="isi_laporan" class="form-control" id="isi_laporan" placeholder="Isi Laporan" v-model="isi_laporan">
            </div>
             <div class="form-group">
              <label for="nama" class="col-form-label">Kategori</label>
               <select class="form-control" name="id_kategori" id="id_kategori" v-model="id_kategori">
                <option value="1" checked>sosial dan kesejahteraan</option>
                <option value="2">agama</option>
                <option value="3">corona virus</option>
                <option value="4">kesehatan</option>
                <option value="5">ketenteraman dan ketertiban umum</option>
                <option value="6">pendidikan dan kebudayaan</option>
               </select>
            </div>
             <div class="form-group">
              <label for="nama" class="col-form-label">Foto</label>
              <input type="file" name="foto" class="form-control" id="foto" placeholder="foto">
            </div>
          </div>
  
        </form>
    </b-modal>
    

        <!-- partial -->
      </div>
      <!-- main-panel ends -->
    <!-- </div> -->
    <!-- page-body-wrapper ends -->
  <!-- </div> -->
</template>


<script>

module.exports = {
  data : function(){
    return {
      search: "",
      id_pengaduan:"",
      id_user:"",
      tgl_pengaduan: "",
      id_kategori: "",
      id_tanggapan:"",
      isi_laporan: "",
      foto: "",
      tanggapan:"",
      status:"",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      pengaduan: [],
      tanggapan:[],
      kategori:[],
      fields: ["id_pengaduan","tgl_pengaduan","id_kategori", "isi_laporan", "foto","status","tanggapan",],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/masyarakat/pengaduan/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.success == true){
          this.$bvToast.hide("loadingToast");
          this.pengaduan = response.data.data.pengaduan;
          this.tanggapan = response.data.data.tanggapan;
          this.rows = response.data.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data pengaduan."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },


    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },

    Add : function(){
      this.action = "insert";
      this.tgl_pengaduan = "";
      this.id_kategori = "";
      this.isi_laporan = "";
      this.foto = "";
      document.getElementById("foto").value = null;
    },



    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("tgl_pengaduan", this.tgl_pengaduan);
        form.append("id_kategori", this.id_kategori);
        form.append("isi_laporan", this.isi_laporan);
        form.append("foto", document.getElementById("foto").files[0]);
        form.append("status", this.status);
        form.append("tanggapan", this.tanggapan);

        this.axios.post("/masyarakat/pengaduan", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        let form = {
         id: this.id,
         tgl_pengaduan: this.tgl_pengaduan,
         id_kategori: this.id_kategori,
         isi_laporan: this.isi_laporan,
         foto: this.foto,
         status: this.status,
         tanggapan: this.tanggapan,
          
        }
      }
    },


  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>