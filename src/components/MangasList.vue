<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="buscar por nombre"
          v-model="name"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchName"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de Mangas</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(manga, index) in mangas"
          :key="index"
          @click="setActiveManga(manga, index)"
        >
          {{ manga.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllMangas">
        Quitar todos
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentManga">
        <h4>Manga</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentManga.nombre }}
        </div>
        <div>
          <label><strong>Autor:</strong></label>
          {{ currentManga.autor }}
        </div>
        <div>
          <label><strong>en emision:</strong></label>
          {{ currentManga.onEmison ? "Yes" : "No" }}
        </div>

        <router-link
          :to="'/Mangas/' + currentManga.id"
          class="badge badge-warning"
          >Editar</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Por favor haga clic en un manga...</p>
      </div>
    </div>
  </div>
</template>

<script>
import MangaDataService from "../services/MangaDataService";

export default {
  name: "mangas-list",
  data() {
    return {
      mangas: [],
      currentManga: null,
      currentIndex: -1,
      name: "",
    };
  },
  methods: {
    retrieveMangas() {
      MangaDataService.getAll()
        .then((response) => {
          this.mangas = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveMangas();
      this.currentManga = null;
      this.currentIndex = -1;
    },

    setActiveManga(manga, index) {
      this.currentManga = manga;
      this.currentIndex = manga ? index : -1;
    },

    removeAllMangas() {
      MangaDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchName() {
      MangaDataService.findByName(this.name)
        .then((response) => {
          this.mangas = response.data;
          this.setActiveManga(null);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveMangas();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
