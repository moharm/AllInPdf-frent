import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {  Document, Page } from 'react-pdf';
import Button from "react-bootstrap/Button";

import "./drop.css"

export default function Drop(props) {
    // const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        
        onDrop: acceptedFiles => {
             acceptedFiles.map(file => {
                    Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
                props.onChange(file)
               
            })
            
        }
    });     

    const thumbs = props.files.map(file => (
        <div className={"thumb"} key={file.name}>
            <Button className="deleteBtn" variant="danger" id={file.name} onClick={() => props.onDeleteFile(file.name)} ></Button>
            <div className={"thumbInner"}>
                {(file.type.includes("image")) ?
                (<img
                    src={file.preview}
                    className={"img"}
                    alt={file.name}
                />) :
                (<Document file={file.preview} className={"pdfLoaded"}>
                    <Page pageNumber={1} />
                </Document>) 
                }

            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        props.files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [props.files]);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside className={"thumbsContainer"}>
                {thumbs}
            </aside>
        </section>
    );
}

