module.exports = (options) => {
  return {
    scenarios: [
      {
        label: "Mobile",
        url: `${options.baseUrl}/`,
        postInteractionWait: options.DEFAULT_DELAY,
        selectors: [".a-custom-selector"],
      },
    ],
  };
};
