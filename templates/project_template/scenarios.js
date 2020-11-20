module.exports = (options) => {
  return {
    scenarios: [
      {
        label: options.label,
        url: `${options.baseUrl}`,
        referenceUrl: `${options.referenceUrl}`,
        postInteractionWait: options.DEFAULT_DELAY,
        selectors: ["viewport"], // This is a special selector that will make Backstop captures only the viewport
      },
    ],
  };
};
