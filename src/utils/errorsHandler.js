import Vue from 'vue';
import i18n from '../i18n';

const availableCodes = Object.keys(i18n.t('errorNotifications'));

export const handleError = (error) => {
  const context = new Vue();
  const code = error.response.data.error;
  const desc = error.response.data.description;
  const msgKey = desc ? `${code}:${desc}` : code;
  const errorText = i18n.t(
    `errorNotifications.${
      availableCodes.includes(msgKey) ? msgKey : 'ERR_SERVICE'
    }`,
  );

  context.$bvToast.toast(errorText, {
    title: i18n.t('errorNotifications.error'),
    autoHideDelay: 4000,
    variant: 'danger',
    appendToast: false,
  });
};

export const handleSuccess = (message) => {
  const context = new Vue();

  context.$bvToast.toast(message, {
    title: i18n.t('successNotifications.success'),
    autoHideDelay: 4000,
    variant: 'success',
    appendToast: false,
  });
};
