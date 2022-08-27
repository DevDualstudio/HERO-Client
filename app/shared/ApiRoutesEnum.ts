const ApiRoutesEnum = {
  SEND_VERIFICATION_CODE: '/auth/login-phone',
  LOGIN_PHONE_CODE: '/auth/verify-phone-customer',
  UPDATE_PROFILE: '/users/update-profile',
  APPLY_AGENT: '/users/apply-agent',
  APPLY_AGENT_STATUS: '/users/apply-agent-status',
  UPLOAD_FILE: '/files',
  PAYMENT_METHOD: '/payment-method',
  REQUEST_SERVICE: '/services',
  CANCEL_SERVICE: '/services/:id/cancel',
  ZONE_RANGE: '/zones/in-range',
};
export default ApiRoutesEnum;
