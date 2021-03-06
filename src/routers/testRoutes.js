import TestTTS from "components/test/TestTTS";
import TestAPI from "components/test/TestAPI";
export const testRoutes = [
  {
    name: "語音測試",
    to: "/testtts",
    icon: "sound",
    component: TestTTS,
    permission: "normal",
  },
  {
    name: "API測試",
    to: "/testapi",
    icon: "exclamation",
    component: TestAPI,
    permission: "normal",
  },
];
