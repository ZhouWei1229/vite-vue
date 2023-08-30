<template>
  <div class="card">
    <h2 class="title">Meal Time Selector</h2>
    <div>
      <h3 class="current-schedule-title">Current Schedule</h3>
      <pre class="current-schedule">{{ mealSchedule }}</pre>
    </div>
    <div
      v-for="(schedule, day) in mealSchedule"
      :key="day"
      class="day-container"
    >
      <h3 class="day-title">Day {{ day }}</h3>
      <div class="group">
        <div :class="[`${switchValues[day] ? 'time-selectors' : 'time-wall'}`]">
          <v-select
              v-model="startTimes[day]"
              label="Start Time"
              :items="getTimeOptions(day, 'start')"
              outlined
          />
          <v-select
              v-model="endTimes[day]"
              label="End Time"
              :items="getTimeOptions(day, 'end')"
              outlined
          />
        </div>
        <div class="switch-container">
          <v-switch v-model="switchValues[day]" color="info" />
        </div>
        <v-alert
            :text="warningText[day]" type="error"  v-if="warningText[day]"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mealSchedule: {
        week_day0: "000000000000000000000000000000000000000000000000",
        week_day1: "011111111000000000000000000000000000000000000000",
        week_day2: "111111111111111111111111111111111111111111111111",
        week_day3: "000000000000111111000000000000000000000000000000",
        week_day4: "000000000000000000000000111111111111000000000000",
        week_day5: "000000000000000000000000000000000000111111111111",
        week_day6: "111111111111111111111111111111111111111111111111",
      },
      startTimes: {},
      endTimes: {},
      switchValues: {},
      warningText:{},
      isValid:{},
      timeOptions: [],
    };
  },
  watch:{
    switchValues:{
      deep: true,
      handler() {
        this.updateMealSchedule();
      }
    },
    startTimes: {
      deep: true,
      handler() {
        this.updateMealSchedule();
      }
    },
    endTimes: {
      deep: true,
      handler() {
        this.updateMealSchedule();
      }
    }
  },
  mounted() {
    this.generateTimeOptions();
    this.setDefaultTimes();
    this.setDefaultSwitchValues();
  },
  methods: {
    getTimeOptions(day, type) {
      if (this.switchValues[day]) {
        const validOptions = this.timeOptions.filter((time) => {
          if (type === 'start') {
            return time < this.endTimes[day];
          } else if (type === 'end') {
            return time > this.startTimes[day];
          }
          return false;
        });

        return validOptions;
      } else {
        return this.timeOptions;
      }
    },
    updateMealSchedule() {
      for (const day in this.mealSchedule) {
          this.setMealTime(day);
      }
    },
    setDefaultSwitchValues() {
      for (const day in this.mealSchedule) {
        this.switchValues[day] = true;
      }
    },
    setDefaultTimes() {
      for (const day in this.mealSchedule) {
        const daySchedule = this.mealSchedule[day];

        const startTimeIndex = daySchedule.indexOf("1");
        const endTimeIndex = daySchedule.lastIndexOf("1");

        this.startTimes[day] = this.timeOptions[startTimeIndex + 1];
        this.endTimes[day] = this.timeOptions[endTimeIndex - 1];
      }
    },
    generateTimeOptions() {
      for (let hours = 0; hours < 24; hours++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
          const time = this.formatTime(hours, minutes);
          this.timeOptions.push(time);
        }
      }
    },
    setMealTime(day) {
      if (!this.switchValues[day]) {
        this.mealSchedule[day] =
          "000000000000000000000000000000000000000000000000";
        return;
      }

      const startTime = this.startTimes[day];
      const endTime = this.endTimes[day];
      if (this.isValidTime(startTime) && this.isValidTime(endTime)) {
        if (startTime === endTime) {
          this.warningText[day] = "開始時間不可與結束時間相同"
          this.isValid[day] = false
          return;
        }
        if (startTime >= endTime) {
          this.warningText[day] = "開始時間必須比結束時間早"
          this.isValid[day] = false
          return;
        }
        const startIdx = this.timeOptions.indexOf(startTime);
        const endIdx = this.timeOptions.indexOf(endTime) + 1;
        if (startIdx < endIdx) {
          const newSchedule = Array(48).fill("0");
          for (let i = startIdx; i < endIdx; i++) {
            newSchedule[i] = "1";
          }
          this.mealSchedule[day] = newSchedule.join("");
          this.isValid[day] = true
        } else {
          this.warningText[day] = "錯誤的時間區間"
          this.isValid[day] = false
        }
        this.warningText[day] = ""
        this.isValid[day] = true
      }
    },
    formatTime(hours, minutes) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    },
    isValidTime(time) {
      const pattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
      return pattern.test(time);
    },
  },
};
</script>

<style scoped>
.time-wall {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-basis: calc(50% - 20px);
  pointer-events: none;
  position: relative;
}

.time-wall::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(255 255 255 / 60%);
  pointer-events: none;
  z-index: 1;
}
.card {
  max-width: 100%;
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

.day-container {
  padding: 15px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.day-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.time-selectors {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-basis: calc(50% - 20px);
}

.switch-container {
  display: flex;
  align-items: center;
  flex-basis: calc(50% - 20px);
}

.set-button {
  min-width: 100px;
  flex-basis: 100%;
}

.current-schedule-title {
  font-size: 20px;
  margin-top: 30px;
  color: #333;
  text-align: center;
}

.current-schedule {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 12px 0;
  border-radius: 5px;
  overflow-x: auto;
  font-size: 14px;
  color: #333;
}

@media (max-width: 768px) {
  .group {
    flex-direction: column;
  }
}
</style>
