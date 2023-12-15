import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import RecordService from '../services/record.service';
import { Record } from '../models/record';
import ChallengeService from '../services/challenge.service'
import { Challenge } from '../models/challenge'

export default function RecordForm() {
  const [records, setRecords] = useState<Record[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([])

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await RecordService.getAllRecords();
        const recordsArray = response.records;
        setRecords(recordsArray);
      } catch (error) {
        console.error('Error fetching records:', error);
        setErrorMsg('Error fetching records');
      }
    };

    const fetchChallenges = async () => {
        try {
          const response = await ChallengeService.getAllChallenges()
          const challengesArray = response.challenges
          setChallenges(challengesArray)
        } catch (error) {
          console.error('Error fetching challenges:', error)
        }
      }

    fetchRecords()
    fetchChallenges()
  }, []);

  return (
    <main>
      {errorMsg && (
        <Typography variant="body1" color="error">
          {errorMsg}
        </Typography>
      )}

      <Box
        mt={6}
        sx={{
          ml: '6vw',
          mr: '6vw',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <img
        src='records.png'
        alt='records'
        style={{ width: '30%', objectFit: 'cover' }}
        />
        <TableContainer component={Paper} sx={{mt: 6}}>
          <Table>
            <TableHead sx={{ backgroundColor: '#e3c4c3', color: 'black', }}>  
              <TableRow>
                <TableCell><b>Index</b></TableCell>
                <TableCell><b>Nickname</b></TableCell>
                <TableCell><b>Content</b></TableCell>
                <TableCell><b>Solved</b></TableCell>
                <TableCell><b>Date</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.index}>
                  <TableCell>{record.index}</TableCell>
                  {record.solved && record.solved.length === challenges.length ? (
                    <>
                    <TableCell>{record.nickname} 👑</TableCell>
                    </>
                  ) : (
                    <TableCell>{record.nickname}</TableCell>
                  )}
                  <TableCell>{record.content}</TableCell>
                  {record.solved && (
                      <TableCell>{record.solved.join(' / ')}</TableCell>
                  )}
                  <TableCell>{record.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        position='absolute'
        bottom='0vh'
      >
        <img
            src='longcity.png'
            alt='records'
            style={{ width: '100vw', objectFit: 'cover'}}
        />
      </Box>
    </main>
  );
}
