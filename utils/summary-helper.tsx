// Parses a section into { title, content, points }
export const parseSection = (
  section: string
): { title: string; content: string; points: string[] } => {
  const [titleLine, ...rest] = section.split("\n");
  const cleanTitle = titleLine.startsWith("#")
    ? titleLine.substring(1).trim()
    : titleLine.trim();
  const content = rest.join("\n").trim();

  const points: string[] = [];
  let currentPoint = "";

  content.split("\n").forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("•")) {
      // save previous point if exists
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = trimmedLine.substring(1).trim(); // new bullet without "•"
    } else if (trimmedLine) {
      // continuation of current point
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }

  return {
    title: cleanTitle,
    content: content,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ),
  };
};
