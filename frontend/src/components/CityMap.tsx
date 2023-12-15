import { useEffect, useState } from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'
import { useSnackBar } from '../contexts/snackbar'
import ChallengeModal from './ChallengeModal'
import ChallengeListModal from './ChallengeListModal'
import EndingModal from './EndingModal'
import ChallengeService from '../services/challenge.service'
import { Challenge } from '../models/challenge'
import { NavLink } from 'react-router-dom'

export default function CityMap() {
  const { showSnackBar } = useSnackBar()
  const layers = ['서비스', '디바이스', '플랫폼SW', '인프라']
  const regions = [
    '스마트 보안',
    '스마트 에너지',
    '스마트 모빌리티',
    '자율주행 차량',
    '실감 컨텐츠',
    '스마트 교육',
    '스마트 헬스케어',
    '스마트 생활',
    '스마트 팩토리',
    '스마트 환경',
  ]
  const location = [
    ['10vh', '7vw'],
    ['10vh', '25vw'],
    ['10vh', '43vw'],
    ['10vh', '60vw'],
    ['35vh', '7vw'],
    ['35vh', '25vw'],
    ['35vh', '43vw'],
    ['35vh', '60vw'],
    ['60vh', '7vw'],
    ['60vh', '25vw'],
  ]
  const [isChallengeListModalOpen, setIsChallengeListModalOpen] = useState(false)
  const [isEndingModalOpen, setIsEndingModalOpen] = useState(false)
  const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState('서비스')
  const [selectedRegion, setSelectedRegion] = useState('스마트 보안')
  const [backgroundImage, setBackgroundImage] = useState('서비스')
  const [showRegion, setShowRegion] = useState(false)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [solvedChallenges, setSolvedChallenges] = useState<Challenge[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const changeBackgroundImage = (layer: string) => {
    setBackgroundImage(layer);
  };

  const handleResize = () => {
    const container = document.getElementById('mapContainer')
    if (container) {
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight
      const image = new Image()
      image.src = './서비스.gif'

      image.onload = () => {
        if (containerWidth < image.width || containerHeight < image.height) {
          showSnackBar(
            'Current window size is not recommended. Maximize the window with proper resolution.',
            'warning',
          )
        }
      }
    }
  }

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await ChallengeService.getAllChallenges()
        const challengesArray = response.challenges
        setChallenges(challengesArray)
      } catch (error) {
        console.error('Error fetching challenges:', error)
      }
    }

    const fetchSolvedChallenges = async () => {
      try {
        const response = await ChallengeService.getSolvedChallenges()
        const challengesArray = response.challenges
        setSolvedChallenges(challengesArray)
      } catch (error: any) {
          if (error.response && error.response.status === 401) {
            setErrorMsg('Login first to check solved challenges')
          } else {
            console.error('Error fetching solved challenges:', error)
            setErrorMsg(`Error fetching solved challenges: ${error.message}`)
          }
      } 
    }

    fetchChallenges()
    fetchSolvedChallenges()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const openChallengeListModal = () => {
    setIsChallengeListModalOpen(true)
  }

  const closeChallengeListModal = () => {
    setIsChallengeListModalOpen(false)
  }

  const openEndingModal = () => {
    setIsEndingModalOpen(true)
  }

  const closeEndingModal = () => {
    setIsEndingModalOpen(false)
  }

  const openChallengeModal = (layer: string, region: string) => {
    setSelectedLayer(layer)
    setSelectedRegion(region)
    setIsChallengeModalOpen(true)
  }

  const closeChallengeModal = () => {
    setIsChallengeModalOpen(false)
  }

  const onClickLayer = (layer: string) => {
    changeBackgroundImage(layer)
    setSelectedLayer(layer)
  }

  const createButtonStyle = (top: string, left: string, backgroundColor: string) => ({
    position: 'absolute' as 'absolute',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    width: '120px',
    height: '120px',
    overflow: 'hidden',
    color: 'white',
    borderRadius: '100%',
    top,
    left,
    backgroundColor,
  })

  const createChallengeButtonStyle = (top: string, left: string, region: string) => {
    const isSolved = solvedChallenges.some(
      (challenge) => challenge.layer === selectedLayer && challenge.region === region
    );
  
    const hasChallenge = challenges.some(
      (challenge) => challenge.layer === selectedLayer && challenge.region === region
    );
  
    const backgroundColor = isSolved ? '#348050' : hasChallenge ? '#c96381' : '#bdbdbd';
  
    return {
      position: 'absolute' as 'absolute',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      width: '180px',
      height: '130px',
      overflow: 'hidden',
      color: 'white',
      opacity: 0.8,
      top,
      left,
      backgroundColor,
    };
  };

  return (
    <main>
      <Button onClick={() => openChallengeListModal()} style={createButtonStyle('11vh', '1.2vw', '#4F100C')}>
        <img
          src='/map.png'
          alt='map'
          style={{ width: '90px', height: '90px', objectFit: 'cover' }}
        />
      </Button>
      <Button onClick={() => setShowRegion(!showRegion)} style={createButtonStyle('30vh', '1.2vw', '#e3a8a8')}>
        <img
          src={`./eye-${!showRegion}.png`}
          alt='visibility'
          style={{ width: '90px', height: '90px', objectFit: 'cover' }}
        />
      </Button>
      <Button onClick={() => openEndingModal()} style={createButtonStyle('11vh', '89.7vw', '#4F100C')}>
        <img
          src='/magic-ball.png'
          alt='magicball'
          style={{ width: '90px', height: '90px', objectFit: 'cover' }}
        />
      </Button>
      <Button
        onClick={() => openEndingModal()}
        component={NavLink}
        to='/records'
        sx={{
            position: 'absolute' as 'absolute',
            backgroundSize: '100% 100%',
            backgroundPosition: 'stretch',
            width: '80px',
            height: '80px',
            overflow: 'hidden',
            color: 'white',
            borderRadius: '10%',
            top: '85.3vh',
            left: '91vw',
            boxShadow: '2px 2px 4px grey'
      }}>
        <img
          src='/star.png'
          alt='records'
          style={{ width: '90px', height: '90px', objectFit: 'cover' }}
        />
      </Button>
      <Grid
          spacing={0}
          direction='column'
          alignItems='center'
          justifyContent='center'
          style={{
            backgroundColor: 'white',
            minHeight: '10vh',
            maxWidth: '5vw',
            position: 'absolute',
            top: '64vh',
            left: '0.2vw',
            zIndex: 1,
            borderInline: 'true',
          }}
        >
          {layers.map((layer) => (
            <Button
              key={layer}
              onClick={() => onClickLayer(layer)}
              sx={{
                borderRadius: 0,
                backgroundColor: selectedLayer === layer ? 'grey' : 'white',
                color: selectedLayer === layer ? 'black' : 'black',
                fontSize: '20px',
                width: '10vw',
                height: '8vh',
                border: '1px solid lightGrey',
              }}
            >
              <b>{layer}</b>
            </Button>
          ))}
      </Grid>

      <Container
        id='mapContainer'
        sx={{
          mt: 2,
          backgroundImage: `url(./layer/${backgroundImage}.gif)`,
          backgroundPosition: 'center',
          width: '90vw',
          height: '85vh',
          position: 'relative',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden',
        }}
      >

        {regions.map((region, index) => (
          <Grid item key={region}>
            <Button
              onClick={() => openChallengeModal(selectedLayer, region)}
              style={createChallengeButtonStyle(location[index][0], location[index][1], region)}
            >
              <img
                src={`region/${region}.png`}
                alt='region'
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
            </Button>
            { showRegion && (
              <Container
              sx={{
                position: 'absolute' as 'absolute',
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                width: '180px',
                color: 'black',
                top: location[index][0],
                left: location[index][1],
                overflow: 'hidden',
                backgroundColor: 'white',
                opacity: 0.8,
                transform: 'translate(0%, 0%)',
                display: 'flex',
                borderRadius: '10%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i>{region}</i>
            </Container>
            )}
          </Grid>
        ))}

        {isChallengeModalOpen && (
          <ChallengeModal
            layer={selectedLayer}
            region={selectedRegion}
            onClose={closeChallengeModal}
          />
        )}

        {isChallengeListModalOpen && <ChallengeListModal onClose={closeChallengeListModal} />}

        {isEndingModalOpen && <EndingModal onClose={closeEndingModal} />}
      
        {errorMsg && (
          <Typography variant='body1' sx={{ mt: 2 }}>
            <i>{errorMsg}</i>
          </Typography>
        )}
      </Container>
    </main>
  )
}
