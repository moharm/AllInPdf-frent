import React, {useEffect, useState} from "react";
import * as ManagFile from "../Services/ManagFile";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Alert from "react-bootstrap/Alert";
import FormFileInput from "react-bootstrap/FormFileInput";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";




export default function Acceuil() {
    const [files, setFiles] = useState( [])
    const [erreur, setErreur] = useState(null)
    const [GenerateActivation, setGenerateActivation] = useState(true)

    async function onUploadFile(event) {
        const input = event.target
        let name = input.files[0].name
        let size = input.files[0].size
        let file = input.files[0]
        let result = await ManagFile.upload(name, size, file)
        if( result.isErreur ){
            setErreur(result.message)
            input.value = null
        }else{
            setFiles(prevState => ([...prevState, result.data]))
            setGenerateActivation(false)
        }

    }

    async function onDeleteFile(code){
        let result = await ManagFile.Delete(code)
        if( result.isErreur ){
            setErreur(result.message)

        }else{
            let filesUpdated = files.filter((file) => (file.key !== code))
            setFiles(filesUpdated)
        }

    }

    async function onGeneratePDF(){
        let result = await ManagFile.generatePDF()
        if( result.isErreur ){
            setErreur(result.message)

        }else{
            setFiles([])
        }
    }


    return (
        <>
            <Container className="App">
            <Container className="main">
                <Jumbotron>
                    <h1 className="header">Concat .png, .jpg, .jpeg, .pdf on One pdf file.</h1>
                </Jumbotron>
                <div className="w-100">
                    {erreur && <Alert variant='danger'>
                        {erreur}
                    </Alert>}
                    <FormFileInput type="file" name={"file"} onChange={event => onUploadFile(event)} className="mb-2"/>
                    <ListGroup variant="flush">
                        {files?.map(v => {
                            return  <ListGroup.Item key={v.key} className="d-flex">
                                <div className="col-7" id={v.key}>{v.name}</div>
                                <Button className="col-2" variant="danger" id={v.key} onClick={() => onDeleteFile(v.key)}>Delete</Button>
                            </ListGroup.Item>
                        })}
                    </ListGroup>
                </div>
                <div>
                    <Button id="generateButton" onClick={()=> onGeneratePDF()} disabled={GenerateActivation}>Generate</Button>
                </div>
            </Container>
        </Container>
        </>
        );
}

