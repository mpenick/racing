'use client'

import {Controller} from "react-hook-form";
import {useDropzone} from "react-dropzone";
import {useCallback, useEffect} from "react";
import {Grid, ImageList, ImageListItem, useMediaQuery} from "@mui/material";

export const FilesInput = ({name, multiple, control, register, unregister, setValue, watch, accept}) => {
    const files = watch(name)
    const onDrop = useCallback(async (acceptedFiles) => {
            for (const file of acceptedFiles) {
                const preview = await cropImage(await loadImage(file), 340)
                Object.assign(file, {preview})
            }
            const newFiles = !!files?.length ? [...files].concat(acceptedFiles) : acceptedFiles
            setValue(name, newFiles, {shouldValidate: true});
        },
        [setValue, name, files]
    );
    useEffect(() => {
        register(name);
        return () => {
            unregister(name);
        };
    }, [register, unregister, name]);
    return (
        <Controller
            render={({field: {onChange}}) => (
                <Dropzone
                    accept={accept}
                    multiple={multiple}
                    onDrop={onDrop}
                    files={files}
                />
            )}
            name={name}
            control={control}
            defaultValue=""
        />
    );
};

const Dropzone = ({accept, multiple, onDrop, files}) => {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept,
        multiple,
        onDrop,
    });

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <Grid container columns={{xs: 1, sm: 2, md: 4, lg: 6}}>
                {
                    !!files?.length &&
                    files.map((file) => (
                        <ImageListItem key={file.name}>
                            <img
                                src={file.preview}
                                alt={file.name}
                            />
                        </ImageListItem>
                    ))
                }
            </Grid>
        </section>
    );
};

async function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        }
        reader.readAsDataURL(file);
    })
}

async function cropImage(imageData, targetSize) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = (event) => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            let srcWidth = image.width
            let srcHeight = image.height

            let srcRatio = srcWidth / srcHeight

            let width = Math.min(targetSize, image.width)
            let height = Math.min(targetSize, image.height)

            canvas.width = width
            canvas.height = height

            if (srcWidth > width || srcHeight > height) {
                if (srcRatio > 1.0) {
                    srcHeight = srcWidth = image.height
                } else {
                    srcWidth = srcHeight = image.width
                }
            }

            const srcX = (image.width - srcWidth) / 2
            const srcY = (image.height - srcHeight) / 2

            context.drawImage(image, srcX, srcY, srcWidth, srcHeight, 0, 0, width, height)

            const dataURL = canvas.toDataURL('image/png')
            resolve(dataURL)
        }
        image.src = imageData.toString()
    })
}