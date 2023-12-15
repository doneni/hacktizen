import { Box, Button, Container, Divider, Typography, Grid } from '@mui/material'
import { NavLink } from 'react-router-dom'

export async function loader() {
  return {}
}

export default function Home() {
  return (
    <main>
      <Container
        sx={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: 'auto',
          minHeight: '30vh',
          minWidth: '100vw',
          backgroundColor: '#5D1410',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src='/logo.png'
          alt='logo'
          style={{ width: '50vw', height: 'auto', marginLeft: '15vw' }}
        />
        <Box
          sx={{
            position: 'absolute',
            right: '10%',
            top: '85%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Grid container direction='column' spacing={2} justifyContent='center'>
            <Grid item>
              <Button
                component={NavLink}
                to='/challenge'
                sx={{
                  color: '#5D1410',
                  fontSize: '20px',
                  backgroundColor: '#E08F8D',
                  borderRadius: '10px',
                  width: '12vw',
                  height: '100%',
                }}
              >
                <b>CHALLENGE</b>
              </Button>
            </Grid>
            <Grid item>
              {/* <Button
                component={NavLink}
                to='/storyyg'
                sx={{
                  color: '#5D1410',
                  fontSize: '20px',
                  backgroundColor: '#E08F8D',
                  borderRadius: '10px',
                  width: '12vw',
                  height: '100%',
                }}
              >
                STORY
              </Button> */}
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container sx={{ py: 8 }} maxWidth='sm'>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h4' fontWeight='fontWeightBold'>
            Save the City
          </Typography>
          <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
            The city needs a hero.
          </Typography>
          <Divider />
          <Typography
            variant='body1'
            gutterBottom
            sx={{ mt: 4, whiteSpace: 'pre-line', lineHeight: 0.9 }}
          >
            <p>야망시티는 눈부신 기술의 발전으로 영광을 누리고 있습니다.</p>
            <p>시민들은 오늘도 안락한 하루를 보내고 있지만... 글쎄요.</p>
            <p>위험이 도사리는 이 도시를 구하고 영웅이 되세요.</p>
          </Typography>
        </Box>
      </Container>
    </main>
  )
}
