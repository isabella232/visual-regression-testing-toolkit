module.exports = (options) => {
  return {
    scenarios: [
      {
        label: "Desktop",
        url: `${options.baseUrl}/`,
        postInteractionWait: options.DEFAULT_DELAY,
        selectors: [".a-custom-selector"],
      },
    ],
  };
};
