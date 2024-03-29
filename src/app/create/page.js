'use client'

import {useForm} from "react-hook-form";
import {Box, Button, Container, Step, StepLabel, Stepper} from "@mui/material";
import {useState} from "react";
import {FilesInput} from "@/components/FilesInput";

const steps = ['Add images', 'Add information', 'Review'];

export default function Page() {
    const [activeStep, setActiveStep] = useState(0)
    const methods = useForm()
    const onSubmit = data => console.log(data)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    return (
        <main>
            <Container sx={{mt: 1}} component="form" onSubmit={methods.handleSubmit(onSubmit)}>
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
            </Container>
        </main>
    )
}
