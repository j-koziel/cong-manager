import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.cmcore",
  appName: "Congregation Manager",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
