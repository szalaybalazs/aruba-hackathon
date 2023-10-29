import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import RotatingCard from "./RotatingCard";

export type ImageTextFlipCardProps = {
  text: string;
  imageUrl: string;
};

const ImageTextFlipCard = ({ text, imageUrl }: ImageTextFlipCardProps) => {
  return (
    <RotatingCard>
      <Card elevation={5} sx={{ width: 300, height: 300, borderRadius: 5 }}>
        <CardMedia component="img" image={imageUrl} height={300} sx={{ objectFit: "cover" }} />
      </Card>
      <Card
        elevation={5}
        sx={{
          width: 300,
          height: 300,
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#a8dadc",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontFamily={"monospace"} component="div" align="center">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </RotatingCard>
  );
};

export default ImageTextFlipCard;
