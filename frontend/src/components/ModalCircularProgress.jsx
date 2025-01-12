import { Box, Modal, CircularProgress } from "@mui/material";

const ModalCircularProgress = ({isOpen}) => {
    return (
        <Modal
            open={isOpen}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
                <CircularProgress />
            </Box>
        </Modal>
    )
}

export default ModalCircularProgress;