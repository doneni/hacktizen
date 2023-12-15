import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import { Button, Box, Typography } from '@mui/material'
import ChallengeService from '../services/challenge.service'
import { Challenge } from '../models/challenge'

interface ChallengeListModalProps {
  onClose: () => void
}

const ChallengeListModal: React.FC<ChallengeListModalProps> = ({ onClose }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [solvedChallenges, setSolvedChallenges] = useState<Challenge[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

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
  }, [])

  return (
    <Modal
      open={true}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
      }}>
      <Box
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Button sx={{marginLeft: '90%', minWidth: '10%', backgroundColor: 'black', color: 'white'}} onClick={onClose}>X</Button>

        <Typography variant='h4' sx={{ mt: 2 }}>
          Challenge List
        </Typography>

        <ul>
  {challenges.map((challenge, index) => {
    const isSolved = solvedChallenges.some(solvedChallenge => solvedChallenge.title === challenge.title);
    return (
      <li key={index}>
        {isSolved ? (
          <Typography sx={{lineHeight: 1.0}}>
            <b><s>{challenge.title}</s></b>
            <p><s>{challenge.layer} › {challenge.region}</s></p>
          </Typography>
        ) : (
          <Typography sx={{lineHeight: 1.0}}>
            <b>{challenge.title}</b>
            <p>{challenge.layer} › {challenge.region}</p>
          </Typography>
        )}
      </li>
    );
  })}
</ul>


        {errorMsg && (
          <Typography variant='body1' sx={{ mt: 2 }}>
            <i>{errorMsg}</i>
          </Typography>
        )}

        {/* <Button sx={{minWidth: '100%', backgroundColor: 'black', color: 'white'}} onClick={onClose}>Close Modal</Button> */}
      </Box>
    </Modal>
  )
}

export default ChallengeListModal
