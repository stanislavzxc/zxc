<script>
export default {
  name: "NewCompany",
  components: {},
  data() {
    return {
      type: "",
      name: "",
      fullName: "",
      corporateType: "",
      registrationNumber: "",
      residenceCountry: "",
      vatNumber: "",
      officeAddress: "",
      zipCode: "",
      postalOfficeAddress: "",
      zipCodePostal: "",
      phone: "",
      email: "",
    };
  },
  methods: {
    goBack() {
      try {
        this.$router.go(-1);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <div class="wrapper">
    <h1>New company</h1>
    <div class="wrap-back" @click="goBack()">
      <img src="../assets/arrow-left.svg" alt="" />
      <span>Back</span>
    </div>
    <div class="card">
      <h2>Company Information</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="name" class="group-value">Type of Company</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="fullname"
            class="group-item"
            placeholder="Enter your full name"
          />
        </div>
        <div class="group">
          <label for="name" class="group-value">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            class="group-item"
            placeholder="Enter the Name"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
}

h1 {
  font-size: 24px;
  line-height: 29px;
  font-weight: 400;
  color: #14171f;
}

.wrap-back {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.wrap-back img {
  height: 20px;
  width: 20px;
}

.wrap-back span {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: #8c93a6;
}

.card {
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border: 1px solid rgba(115, 122, 140, 0.1);
  border-radius: 10px;
}

h2 {
  font-weight: 400;
  font-size: 16px;
  line-height: 19.84px;
  color: #8c93a6;
}

.wrap-group {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 20px;
}

.group {
  position: relative;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item {
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #dfe3ec;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item::placeholder {
  color: #8c93a6;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}
.wrap-btns {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
}

.btn {
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  color: #fff;
  padding: 14.5px 20px;
  border-radius: 8px;
  background-color: rgba(0, 94, 255, 1);
}
</style>
