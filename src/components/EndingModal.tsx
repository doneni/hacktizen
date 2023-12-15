import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import { Button, Box, Typography } from '@mui/material'
import EndingService from '../services/ending.service'
import ChallengeService from '../services/challenge.service'
import { Ending } from '../models/ending'
import { Challenge } from '../models/challenge'

interface EndingModalProps {
  onClose: () => void
}

const EndingModal: React.FC<EndingModalProps> = ({ onClose }) => {
  const [ending, setEnding] = useState<Ending | null>(null)
  const [solvedChallenges, setSolvedChallenges] = useState<Challenge[] | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const fetchEnding = async () => {
      try {
        const response = await EndingService.getEnding()
        setEnding(response)
      } catch (error) {
        console.error('Error fetching ending:', error)
      }
    }

    const fetchSolvedChallenges = async () => {
      try {
        const response = await ChallengeService.getSolvedChallenges()
        const challengesArray = response.challenges
        setSolvedChallenges(challengesArray)
      } catch (error: any) {
          if (error.response && error.response.status === 401) {
            setErrorMsg('Login First')
          } else {
            console.error('Error fetching challenge:', error)
            setErrorMsg(`Error fetching challenge: ${error.message}`)
          }
      } 
    }

    fetchEnding()
    fetchSolvedChallenges()
  }, [])

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Button sx={{marginLeft: '90%', minWidth: '10%', backgroundColor: 'black', color: 'white'}} onClick={onClose}>X</Button>

        {errorMsg && (
          <Typography variant='body1' sx={{ mt: 2 }}>
            {errorMsg}
          </Typography>
        )}

        {ending && (
            <Box>
                <Typography sx={{ mt: 2 }}>
                        <h2>{ending.title}</h2>
                        <hr />
                        <p>{ending.description}</p>
                </Typography>

                <img
                src={`./ending/${ending.image}`}
                alt='ending'
                style={{ width: '100%', objectFit: 'cover' }}
                />
            </Box>
        )}

        {solvedChallenges && (
          <Typography>
            <hr />
            <b>you solved:</b>
            <ul>
                {solvedChallenges.map((challenge, index) => (
                <li key={index}>
                    <b><i>{challenge.title}</i></b>
                    <Typography variant='body2'>-{challenge.layer} {challenge.region}</Typography>
                </li>
                ))}
            </ul>
          </Typography>
        )}
      </Box>
    </Modal>
  )
}

export default EndingModal
