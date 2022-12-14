export let PlatformPayload = function PlatformPayload(platform) {
  return {
    platform: platform,
    payload: {
      device_ids: [],
      limit_ad_tracking: true,
      device_model: '',
      device_os_version: '',
    }
  };
};

