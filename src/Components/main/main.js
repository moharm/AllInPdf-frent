import React, {useEffect, useState} from "react";
import * as ManagFile from "../../Services/ManagFile";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Drop from '../Drop/Drop'
import "./main.css";



export default function Acceuil() {
    const [files, setFiles] = useState([])
    const [erreur, setErreur] = useState(null)
    const [GenerateActivation, setGenerateActivation] = useState(true)

    async function onUploadFile(fileUpload) {
        
        let name = fileUpload.name
        let size = fileUpload.size
        let result = await ManagFile.upload(name, size, fileUpload)
        if( result.isErreur ){
            setErreur(result.message)
            //input.value = null
        }else{
            setFiles(prevState => ([...prevState, fileUpload]))
            setGenerateActivation(false)
        }

    }

    async function onDeleteFile(code){
        let result = await ManagFile.Delete(code)
        if( result.isErreur ){
            setErreur(result.message)

        }else{
            let filesUpdated = files.filter((file) => (file.name !== code))
            console.log(filesUpdated)
            console.log(code)
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
                    <Drop files={files} setFiles={setFiles} onChange={file => onUploadFile(file)} onDeleteFile={code => onDeleteFile(code)}/>
                    {/* <FormFileInput type="file" name={"file"} onChange={event => onUploadFile(event)} className="mb-2"/>
                    <ListGroup variant="flush">
                        {files?.map(v => {
                            return  <ListGroup.Item key={v.key} className="d-flex">
                                <div className="col-7" id={v.key}>{v.name}</div>
                                <Button className="col-2" variant="danger" id={v.key} onClick={() => onDeleteFile(v.key)}>Delete</Button>
                            </ListGroup.Item>
                        })}
                    </ListGroup> */}
                </div>
                <div>
                    <Button id="generateButton" onClick={()=> onGeneratePDF()} disabled={GenerateActivation}>Generate</Button>
                </div>
            </Container>
        </Container>
        </>
        );
}

