<template>
  <div v-if="currentManga" class="edit-form">
    <h4>Manga</h4>
    <form>
      <div class="form-group">
        <label for="manga_name">Nombre del manga</label>
        <input
          type="text"
          class="form-control"
          id="manga_name"
          v-model="currentManga.name"
        />
      </div>
      <div class="form-group">
        <label for="manga_autor">Autor del Manga</label>
        <input
          type="text"
          class="form-control"
          id="manga_autor"
          v-model="currentManga.autor"
        />
      </div>

      <div class="form-group">
        <label><strong>En emision:</strong></label>
        {{ currentManga.onEmision ? "Yes" : "No" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentManga.onEmision"
      @click="updateOnEmision(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updateOnEmision(true)"
    >
      En emision
    </button>

    <button class="badge badge-danger mr-2" @click="deleteManga">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateManga">
      Editar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Por favor seleccione un manga...</p>
  </div>
</template>

<script>
import MangaDataService from "../services/MangaDataService";

export default {
  name: "manga",
  data() {
    return {
      currentManga: null,
      message: "",
    };
  },
  methods: {
    getManga(id) {
      MangaDataService.get(id)
        .then((response) => {
          this.currentManga = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateOnEmision(status) {
      var data = {
        id: this.currentManga.id,
        title: this.currentManga.name,
        autor: this.currentManga.autor,
        onEmision: status,
      };

      MangaDataService.update(this.currentManga.id, data)
        .then((response) => {
          console.log(response.data);
          this.currentManga.onEmision = status;
          this.message = "la emision fue cambiada con exito!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateManga() {
      MangaDataService.update(this.currentManga.id, this.currentManga)
        .then((response) => {
          console.log(response.data);
          this.message = "el manga fue actualizado con exito";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteManga() {
      MangaDataService.delete(this.currentManga.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "mangas" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getManga(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
