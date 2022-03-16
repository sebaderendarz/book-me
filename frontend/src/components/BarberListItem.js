import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function BarberListItem(props) {
  const { image, barberName, address, price } = props;
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
        backgroundColor: "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            {image ? (
              <Img alt="Barber Image" src={image} />
            ) : (
              <Stack spacing={1} sx={{ width: 128, height: 128 }}>
                <Skeleton variant="text" animation={false} />
                <Skeleton
                  variant="circular"
                  width={20}
                  height={20}
                  animation={false}
                />
                <Skeleton
                  variant="rectangular"
                  width={128}
                  height={100}
                  animation={false}
                />
              </Stack>
            )}
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {barberName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {address}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {"$" + price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
