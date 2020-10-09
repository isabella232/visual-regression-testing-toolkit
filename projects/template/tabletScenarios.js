module.exports = (options) => {
  return {
    scenarios: [
      {
        label: "Tablet",
        url: `${options.baseUrl}/`,
        postInteractionWait: options.DEFAULT_DELAY,
        selectors: [".a-custom-selector"],
      },
    ],
  };
};
