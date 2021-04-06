import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import{thumbsContainer, thumb,thumbInner, ImgInner, thumbButton} from '../styles/Drop'

import {create} from 'doka';


const editImage = (image, done) => {
    const imageFile = image.doka ? image.doka.file : image;
    const imageState = image.doka ? image.doka.data : {};
    create({
        // recreate previous state
        ...imageState,

        // load original image file
        src: imageFile,
        outputData: true,

        onconfirm: ({ file, data }) => {
            Object.assign(file, {
                doka: { file: imageFile, data }
            });
            done(file);
        }
    });
};

export default function Drop(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });

    const thumbs = files.map((file, index) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img src={file.preview} style={ImgInner} alt="" />
            </div>
            <button
                style={thumbButton}
                onClick={() =>
                    editImage(file, (output) => {
                        const updatedFiles = [...files];

                        // replace original image with new image
                        updatedFiles[index] = output;

                        // revoke preview URL for old image
                        if (file.preview) URL.revokeObjectURL(file.preview);

                        // set new preview URL
                        Object.assign(output, {
                            preview: URL.createObjectURL(output)
                        });

                        // update view
                        setFiles(updatedFiles);
                    })
                }
            >
                edit
            </button>
        </div>
    ));

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
    );
}

