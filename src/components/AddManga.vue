<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="manga_name">Manga</label>
        <input
          type="text"
          class="form-control"
          id="manga_name"
          required
          v-model="manga.name"
          name="manga_name"
        />
      </div>

      <div class="form-group">
        <label for="manga_autor">Autor</label>
        <input
          class="form-control"
          id="manga_autor"
          required
          v-model="manga.autor"
          name="manga_autor"
        />
      </div>

      <button @click="saveManga" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newManga">Add</button>
    </div>
  </div>
</template>

<script>
import MangaDataService from "../services/MangaDataService";

export default {
  name: "add-manga",
  data() {
    return {
      manga: {
        id: null,
        name: "",
        onEmision: false,
        currentChapter: 0,
        lastChapter: 0,
        autor: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveManga() {
      var data = {
        name: this.manga.name,
        autor: this.manga.autor,
      };

      MangaDataService.create(data)
        .then((response) => {
          this.manga.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newManga() {
      this.submitted = false;
      this.manga = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
