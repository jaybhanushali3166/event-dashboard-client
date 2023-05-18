const fs = require("fs");
const path = require("path");

const buildPath = path.join(__dirname, "build");
const backendBuildPath = path.join(
  __dirname,
  "..",
  "event-dashboard-backend",
  "build"
);

try {
  // Check if the backend build directory exists, create it if it doesn't
  if (!fs.existsSync(backendBuildPath)) {
    fs.mkdirSync(backendBuildPath, { recursive: true });
  } else {
    // Delete the existing contents of the backend build directory
    fs.readdirSync(backendBuildPath).forEach((file) => {
      const filePath = path.join(backendBuildPath, file);
      fs.rmSync(filePath, { recursive: true, force: true });
    });
  }

  // Move the build folder to the backend directory
  fs.renameSync(buildPath, backendBuildPath);
  console.log("Build folder moved successfully.");
} catch (error) {
  console.error("Error moving build folder:", error);
}
