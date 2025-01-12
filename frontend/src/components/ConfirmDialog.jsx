import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const ConfirmDialog = ({isOpen, title, content, handleYes, handleCancel}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>No</Button>
                <Button onClick={handleYes} autoFocus>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;