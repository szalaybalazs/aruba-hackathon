import { PropsWithChildren, useState, ReactNode } from "react";

import { Box } from "@mui/material";
import ReactCardFlip from "react-card-flip";
import React from "react";

function RotatingCard({ children }: PropsWithChildren) {
  const [rotated, setRotated] = useState(false);

  const [frontChild, backChild] = React.Children.toArray(children) as ReactNode[];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onMouseEnter={() => setRotated(true)}
      onMouseLeave={() => setRotated(false)}
    >
      <ReactCardFlip isFlipped={rotated} flipDirection="horizontal">
        {frontChild}
        {backChild ?? frontChild}
      </ReactCardFlip>
    </Box>
  );
}

export default RotatingCard;
