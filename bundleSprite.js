const fs = require("fs").promises;

(async function() {
  let sprite = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 560">';

  const iconNames = await fs.readdir("./assets/icons");

  for (const iconName of iconNames) {
    const path = `./assets/icons/${iconName}`;
    const id = /^[^.]+/.exec(iconName);
    let icon = await fs.readFile(path, "utf8");
    icon = icon.replace(/svg/g, "symbol");
    icon = icon.replace(/xmlns[\S]+/, `id="${id}"`);
    sprite += icon;
  }

  sprite += "</svg>";

  await fs.writeFile("./public/sprite/icons.svg", sprite);
})();
