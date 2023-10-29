import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ImageTextFlipCard from "../components/ImageTextFlipCard";

const LandingPage = () => {
  const cardContents = [
    {
      text: "The cloud is not just a place for storage; it's a launching pad for your dreams.",
      imageUrl:
        "https://images.idgesg.net/images/idge/imported/imageapi/2022/06/21/16/cso_nw_cloud_computing_cloud_network_circuits_by_denis_isakov_gettyimages-966932508_2400x1600-100814451-large-100929305-large.jpg?auto=webp&quality=85,70",
    },
    {
      text: "Your limits are only confined by the barriers you build. Unleash your potential in the cloud.",
      imageUrl:
        "https://img.freepik.com/free-vector/cloud-computing-polygonal-wireframe-technology-concept_1017-29594.jpg?w=996&t=st=1698560605~exp=1698561205~hmac=a9e223a957af8e82cc6e9187eeebc4f3ba17807c1358e55bba5e5c09640c1ad9",
    },
    {
      text: "Don't wait for the future to come to you. Build it now, in the cloud.",
      imageUrl:
        "https://img.freepik.com/free-photo/saas-concept-collage_23-2149399281.jpg?w=996&t=st=1698560681~exp=1698561281~hmac=47ced940a94cbbbf6da838e03c50f6fc13ffa8e82efe062d451ffa0d4fff0f0e",
    },
    {
      text: "In a world connected by the cloud, your opportunities are as vast as the sky.",
      imageUrl: "https://ncas.ac.uk/app/uploads/2022/08/DCMEX-Cloud-Formation-1280px-1024x576.jpg",
    },
    {
      text: "Don't just reach for the stars, build your empire in the cloud and beyond.",
      imageUrl:
        "https://www.free-pictures-photos.com/wp-content/uploads/2015/03/cloud-07-800x445.jpg",
    },
  ];

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography pt={4} variant="h3" align="center" gutterBottom>
          Welcome to the NUBEM ANTE SOLIS marketplace!
        </Typography>
        <Typography pt={4} variant="h4" align="center" gutterBottom>
          🌥️ Elevate Your Business to New Heights with Us. 🌥️
        </Typography>
      </Container>
      {cardContents.map((content) => (
        <Container key={content.text} sx={{ pt: 8 }} maxWidth="md">
          <ImageTextFlipCard text={content.text} imageUrl={content.imageUrl} />
        </Container>
      ))}
    </>
  );
};

export default LandingPage;
