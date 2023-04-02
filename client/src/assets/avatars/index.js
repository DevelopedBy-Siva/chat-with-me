const avatars = require.context("./", true);

export function getAvatar(id) {
  let src;
  try {
    id = parseInt(id);
    src = avatars(`./${id}.svg`);
  } catch (ex) {
    src = avatars("./default.svg");
  }
  return src;
}
