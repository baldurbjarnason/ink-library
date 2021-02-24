const colours = {
  colour1: "#fea95b",
  colour2: "#ff8ebe",
  colour3: "#6fe1fa",
  colour4: "#9fe793",
};
const darkColours = {
  colour1: "#d86801",
  colour2: "#c0004e",
  colour3: "#0693b2",
  colour4: "#589b4c",
};
const backgroundColours = {
  colour1: "#FFFCFA",
  colour2: "#FFFAFD",
  colour3: "#FAFEFF",
  colour4: "#F8FCF8",
};

export function setColour(colour, element) {
  element.style.setProperty("--toolbar-colour", colours[colour.name]);
  element.style.setProperty("--toolbar-text", darkColours[colour.name]);
  element.style.setProperty(
    "--toolbar-background",
    backgroundColours[colour.name]
  );
}
