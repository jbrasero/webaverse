export * from 'https://webaverse.github.io/lore-engine/lore-model.js';
//ADDED BY JESUS
export var defaultPlayerName="ANON";
const queryParams = new URLSearchParams(window.location.search)
for (const [key, value] of queryParams) {
  console.log({ key, value })
  if (key=="name")
  {
      defaultPlayerName = value;
  }
}
