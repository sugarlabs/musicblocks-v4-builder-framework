import * as Quadtree from "quadtree-lib";

const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
);
// will have to look into height as the canvas is scrollable
const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
);

const quadtree = new Quadtree({ width: vw, height: vh });
const dropAreas = () => {
  return quadtree;
};

export { dropAreas };