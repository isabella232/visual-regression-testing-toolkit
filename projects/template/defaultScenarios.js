module.exports = (options) => {
  return {
    scenarios: [
      {
        label: "Default",
        url: `${options.baseUrl}/`,
        postInteractionWait: options.DEFAULT_DELAY,
        selectors: [".a-custom-selector"],
      },
    ],
  };
};
