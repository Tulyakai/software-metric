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
    handleSubmit() {
      console.log("submit");
    },
  },
};
</script>
