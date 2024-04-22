import * as Three from "three";
export function createFacelessCube() {
  const geometry = new Three.BoxGeometry(
    180.00004768371582,
    180.0000802678567,
    222.0000802678567
  );
  const material = new Three.MeshBasicMaterial({ color: "#FF743E" });
  const facelessCube = new Three.Mesh(geometry, material);
  return facelessCube;
}
