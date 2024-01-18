import Dialog from '@mui/material/Dialog';
import {Box, Button, DialogActions, DialogContent, DialogTitle, Step, StepLabel, Stepper} from "@mui/material";
import {FilesInput} from "@/components/FilesInput";
import {useState} from "react";
import {useForm} from "react-hook-form";

const steps = ['Add images', 'Add information', 'Review'];

export default function CreateDialog({open, onClose}) {
    const [activeStep, setActiveStep] = useState(0)
    const methods = useForm()
    const onSubmit = data => console.log(data)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    return (<Dialog>
            <DialogTitle>Create item</DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                {(activeStep === 0) && (
                    <FilesInput
                        {...methods}
                        accept={{'image/*': ['.jpg', '.png']}}
                        name="files" multiple/>
                )}
            </DialogContent>
            <DialogActions>
                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{mr: 1}}
                    >
                        Back
                    </Button>
                    <Box sx={{flex: '1 1 auto'}}/>
                    {
                        (activeStep === steps.length - 1) ? (
                            <Button type="submit">
                                Finish
                            </Button>
                        ) : (
                            <Button onClick={handleNext}>
                                Next
                            </Button>
                        )
                    }
                </Box>
            </DialogActions>
        </Dialog>
    )
}