// stores/scenarioStore.js
import { defineStore } from 'pinia';

export const useScenarioStore = defineStore('scenario', {
  state: () => ({
    scenarios: [
      "https://i.pinimg.com/originals/36/09/a5/3609a58f09f1c9c87fea4cf875b564b7.gif",
      "https://cdna.artstation.com/p/assets/images/images/025/965/386/original/lennart-butz-idea5anim4.gif?1587480606",
      "https://cdna.artstation.com/p/assets/images/images/015/690/214/original/daniel-gianino-fairy-forest1.gif?1549276717",
      "https://i.pinimg.com/originals/f5/bb/fa/f5bbfaf72ab0587d6408748418d948bb.gif"
    ],
    selectedScenario: null,
    background: '',
  }),
  actions: {
    setSelectedScenario(scenarioId) {
      this.selectedScenario = this.scenarios[scenarioId - 1];
      this.background = this.selectedScenario;
    },
  },
});
