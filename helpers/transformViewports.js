/**
 * Transform viewports
 *
 * @param {string} viewports - Viewports
 *
 * @returns {[]}
 */
module.exports = (viewports) => {
  const viewportsArray = [];
  if (viewports) {
    const tmpViewportsArray = viewports.split(",");
    if (tmpViewportsArray) {
      for (const viewport of tmpViewportsArray) {
        const viewportDimensions = viewport.split("x");
        viewportsArray.push({
          label: viewport,
          width: Number(viewportDimensions[0]),
          height: Number(viewportDimensions[1]),
        });
      }
    }
  }

  return viewportsArray;
};
