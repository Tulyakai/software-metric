<template>
  <div class="mx-4 mt-5 flex max-w-[700px] flex-col md:mx-auto">
    <h1 class="text-4xl my-5 font-bold">Github Repository Compare</h1>
    <Form
      class="flex flex-col gap-y-6"
      v-slot="{ errors, isSubmitting }"
      :validation-schema="schema"
      @submit="handleSubmit"
    >
      <TextField
        type="text"
        name="repoOne"
        placeholder="https://github.com/owner/repo"
        label="Github repository url"
        required
      />
      <TextField
        type="text"
        name="repoTwo"
        placeholder="https://github.com/owner/repo"
        label="Github repository url"
        required
      />
      <PrimaryButton
        type="submit"
        :isLoading="isSubmitting"
        :click="
          () =>
            Object.keys(errors).length
              ? this.$swal.fire({
                  icon: 'error',
                  title: 'โปรดกรอกข้อมูลให้ครบถ้วน',
                  showConfirmButton: false,
                  timer: 2000,
                })
              : null
        "
        >Compare</PrimaryButton
      >
    </Form>
  </div>
</template>

<script>
import TextField from "@/components/field/TextField.vue";
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import LocService from "@/services/LocService";
import GitHubService from "@/services/GitHubService";

export default {
  name: "HomeView",
  components: {
    TextField,
    PrimaryButton,
    Form,
  },
  data() {
    const schema = yup.object().shape({
      repoOne: yup.string().url().required("Please enter a valid url"),
      repoTwo: yup.string().url().required("Please enter a valid url"),
    });
    return {
      schema,
    };
  },
  methods: {
    handleSubmit(values) {
      this.$swal.fire({
        icon: "success",
        title: "The process is running",
        showConfirmButton: false,
        timer: 2000,
      });
      const urls = [values.repoOne, values.repoTwo];
      let infos = [];
      let locs = [];
      urls.map((value) => {
        const { owner, repo } = this.extractUrl(value);
        axios
          .all([
            GitHubService.getRepositories(owner, repo),
            LocService.getLoc(owner, repo),
          ])
          .then(
            axios.spread((...responses) => {
              const responseOne = responses[0].data;
              const responseTwo =
                responses[1].data[responses[1].data.length - 1]["linesOfCode"];
              infos.push({ name: repo, info: responseOne });
              locs.push({ name: repo, loc: responseTwo });
              if (infos.length === 2 && locs.length === 2) {
                this.$swal.fire({
                  icon: "success",
                  title: "The process is done",
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.$store.commit("setRepos", { infos, locs });
                this.$router.push("/dashboard");
              }
            })
          );
      });
    },
    extractUrl(url) {
      const urlArr = url.split("/");
      const repo = urlArr.pop();
      const owner = urlArr.pop();
      return { owner, repo };
    },
  },
};
</script>
