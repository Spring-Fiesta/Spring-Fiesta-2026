'use client'

import { Modal, Box, Typography, Button } from '@mui/material'

interface CustomModalProps {
  open: boolean
  handleClose: () => void
  title: string
  time?: string
  link?: string
  readmore?: string
  children: React.ReactNode
}

const styles = {
  modalBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: '#2D2B50',
    color: 'white',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
    '@media (max-width: 480px)': {
      width: '95%',
      maxWidth: 350,
      padding: '15px',
      borderRadius: 4,
    },
  },
  modalHeader: {
    borderBottom: '1px solid #3B375C',
    paddingBottom: '10px',
    textAlign: 'left' as const,
    fontSize: '18px',
    '@media (max-width: 480px)': {
      fontSize: '16px',
    },
  },
  modalBody: {
    padding: '15px 0',
    textAlign: 'left' as const,
    fontSize: '14px',
    '@media (max-width: 480px)': {
      fontSize: '13px',
      padding: '10px 0',
    },
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '10px',
    '@media (max-width: 480px)': {
      flexDirection: 'column' as const,
      alignItems: 'center',
    },
  },
  closeButton: {
    backgroundColor: '#3B375C',
    color: 'white',
    '&:hover': { backgroundColor: '#4A4373' },
    '@media (max-width: 480px)': {
      width: '100%',
      fontSize: '13px',
      padding: '10px',
    },
  },
  confirmButton: {
    backgroundColor: '#6A5ACD',
    color: 'white',
    '&:hover': { backgroundColor: '#B39DDB' },
    '@media (max-width: 480px)': {
      width: '100%',
      fontSize: '13px',
      padding: '10px',
    },
  },
}

export default function CustomModal({
  open,
  handleClose,
  title,
  time,
  link,
  readmore,
  children,
}: CustomModalProps) {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={styles.modalBox}>
        <Typography id="modal-title" variant="h5" sx={styles.modalHeader}>
          {title} {time && <span>- {time}</span>}
        </Typography>

        <Typography variant="body1" sx={styles.modalBody}>
          {children}
        </Typography>

        <Box sx={styles.modalFooter}>
          <Button onClick={handleClose} sx={styles.closeButton}>
            Close
          </Button>
          {readmore && (
            <Button
              href={readmore}
              target="_blank"
              rel="noreferrer"
              sx={styles.confirmButton}
            >
              Read More
            </Button>
          )}
          {link && (
            <Button
              href={link}
              target="_blank"
              rel="noreferrer"
              sx={styles.confirmButton}
            >
              Join
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  )
}
