<template>
  <div class="account-info">
    <div v-for="[userDatumKey, userDatumValue] in Object.entries(userData)">
      {{ userDatumKey }}:
      <span v-if="typeof userDatumValue !== 'object'" style="font-weight: bold">{{ userDatumValue }}</span>
      <template v-else-if="userDatumValue !== null">
        <div
          v-for="[innerUserDatumKey, innerUserDatumValue] in Object.entries(userDatumValue)"
          style="padding-left: 30px"
        >
          {{ innerUserDatumKey }}:

          <span v-if="typeof innerUserDatumValue !== 'object'" style="font-weight: bold">{{
            innerUserDatumValue
          }}</span>
          <template v-else-if="innerUserDatumValue !== null">
            <div
              v-for="[innerInnerUserDatumKey, innerInnerUserDatumValue] in Object.entries(innerUserDatumValue)"
              style="padding-left: 30px"
            >
              {{ innerInnerUserDatumKey }}:
              <span v-if="typeof innerInnerUserDatumValue !== 'object'" style="font-weight: bold">{{
                innerInnerUserDatumValue
              }}</span>
              <template v-else-if="typeof innerInnerUserDatumValue !== null">
                <div
                  v-for="[innerInnerInnerUserDatumKey, innerInnerInnerUserDatumValue] in Object.entries(
                    innerInnerUserDatumValue
                  )"
                  style="padding-left: 30px"
                >
                  {{ innerInnerInnerUserDatumKey }}:
                  <span v-if="typeof innerInnerInnerUserDatumValue !== 'object'" style="font-weight: bold">
                    {{ innerInnerInnerUserDatumValue }}
                  </span>
                  <template v-else-if="innerInnerInnerUserDatumValue !== null">
                    <div
                      v-for="[innerInnerInnerInnerUserDatumKey, innerInnerInnerInnerUserDatumValue] in Object.entries(
                        innerInnerInnerUserDatumValue
                      )"
                      style="padding-left: 30px"
                    >
                      {{ innerInnerInnerInnerUserDatumKey }}:
                      <span style="font-weight: bold">{{ innerInnerInnerInnerUserDatumValue }}</span>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account info',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { userData: user_data };
  },
};
</script>

<style>
.account-info {
  padding: 0px 10%;
}
</style>
