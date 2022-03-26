import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

// NOTE: https://source.unsplash.com/random/?hairdresser can be used
// instead of Stack when image is not avail.

// 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),

export default function BarberListItem(props) {
  const { thumbnail, barber_name, city, address, price } = props;
  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 1,
        boxShadow: "0px 1px 3px 0px rgb(0 0 0 / 20%)",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            {thumbnail ? (
              <Img alt="Barber Image" src={thumbnail} />
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
                {barber_name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {city}
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
    </Box>
  );
}
