<template>
  <div class="mx-4 mt-5 flex max-w-[1200px] flex-col md:mx-auto min-h-screen">
    <h1 class="text-4xl my-5 font-bold">Dashboard</h1>
    <div
      class="flex flex-row flex-wrap gap-4 justify-between"
      v-if="this.$store.getters.getRepos && this.$store.getters.getRepos.infos"
    >
      <div v-for="(v, k) in this.$store.getters.getRepos.infos" :key="k">
        <h2 class="text-xl font-bold">
          {{ v.name }}
        </h2>
        <p>has wiki: {{ v.info.has_wiki }}</p>
        <p>created at: {{ parseDate(v.info.created_at) }}</p>
        <p>last updated at: {{ parseDate(v.info.pushed_at) }}</p>
      </div>
    </div>
    <div
      class="flex flex-col md:flex-row gap-x-2 mt-4 h-full justify-center items-center"
    >
      <div class="flex flex-col">
        <h3 class="text-lg font-bold">Label Something</h3>
        <BarChart :data="chartData" />
      </div>
      <div class="flex flex-col">
        <h3 class="text-lg font-bold">LOC distribution</h3>
        <PieChart :data="pieData" />
      </div>
      <div class="flex flex-col">
        <h3 class="text-lg font-bold">Activeness of the developmentteam</h3>
        <LineChart :data="lineData" />
      </div>
    </div>
  </div>
</template>
<script>
import BarChart from "@/components/chart/BarChart.vue";
import PieChart from "@/components/chart/PieChart.vue";
import LineChart from "@/components/chart/LineChart.vue";
export default {
  name: "DashboardView",
  components: { BarChart, PieChart, LineChart },
  data() {
    return {
      chartData: {
        labels: this.$store.getters.getRepos.infos.map((info) => info.name),
        datasets: [
          {
            label: "Fork",
            data: this.$store.getters.getRepos.infos.map(
              (info) => info.info.forks_count
            ),
            borderColor: "#7F6EEA",
            backgroundColor: "#7F6EEA",
          },
          {
            label: "Watcher",
            data: this.$store.getters.getRepos.infos.map(
              (info) => info.info.watchers_count
            ),
            borderColor: "#E26EEA",
            backgroundColor: "#E26EEA",
          },
          {
            label: "Subscribers",
            data: this.$store.getters.getRepos.infos.map(
              (info) => info.info.subscribers_count
            ),
            borderColor: "#74EA6E",
            backgroundColor: "#74EA6E",
          },
          {
            label: "Issue",
            data: this.$store.getters.getRepos.infos.map(
              (info) => info.info.open_issues_count
            ),
            borderColor: "#EA6E6E",
            backgroundColor: "#EA6E6E",
          },
        ],
      },
      pieData: {
        labels: this.$store.getters.getRepos.locs.map((loc) => loc.name),
        datasets: [
          {
            backgroundColor: ["#41B883", "#00D8FF"],
            data: this.$store.getters.getRepos.locs.map((loc) => loc.loc),
          },
        ],
      },
      lineData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Repo One",
            backgroundColor: "#41B883",
            data: [40, 39, 10, 40, 39, 80, 40],
          },
          {
            label: "Repo Two",
            backgroundColor: "#00D8FF",
            data: [20, 19, 14, 4, 9, 81, 20],
          },
        ],
      },
    };
  },
  methods: {
    parseDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>
