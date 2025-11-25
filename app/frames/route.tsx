import { createFrames, Button } from "frames.js/next";

const frames = createFrames({
  basePath: "/frames",
});

export const GET = frames(async () => {
  return {
    image: `http://localhost:3000/icon.png`,
    buttons: [
      <Button action="post" target="/api/claim">{"🎁 Claim 1000 JGB"}</Button>,
    ],
  };
});