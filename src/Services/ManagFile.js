import axios from '../Config/axios'
import {  ACCESS_TOKEN } from "../Constants";

export function upload(name, size, file) {

    let formData = new FormData()
    formData.append("file", file)

    return axios({
        method : 'post',
        url : '/upload',
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
        },
        //withCredentials : true,
        data : formData
    }).then((responce)=>{
        console.log(responce)
        return {isErreur : false,
            message : "ok",
            data : {
                key : responce.data,
                name : name,
                size : size
            }
        }
    }).catch(erreur => {

        console.error(erreur.message)
        return {
            isErreur : true,
            message : erreur.message
        }
   })
}

export function Init(){

    return axios({
        method : 'get',
        url : '/init',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
        },
        withCredentials:true,
    
    } ).then((responce)=>{
        console.log(responce)
        return {
            isErreur : false,
            message : responce.data,
        }
    }).catch(erreur => {

        console.error(erreur.message)
        return {isErreur : true,
            message : erreur.message}
    })
}

export function Delete(code){

    return axios({
        method : 'delete',
        url : '/',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
        },
        withCredentials:true,
        data : {
            code : code
        }
    } ).then((responce)=>{
        console.log(responce)
        return {
            isErreur : false,
            message : responce.data,
        }
    }).catch(erreur => {

        console.error(erreur.message)
        return {isErreur : true,
            message : erreur.message}
    })
}

export function generatePDF(){
    return axios({
        method : 'get',
        url : '/concat',
        responseType: 'blob',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
        },    
    }
         ).then((responce)=>{
        console.log(responce)
        downloadPDF(responce.data)
        return {
            isErreur : false,
            message : "ok",
        }
    }).catch(erreur => {

        console.error(erreur.message)
        return {isErreur : true,
            message : erreur.message}
    })
}


function downloadPDF(data) {
    /*
    * Make pdf downloadable
    */
    var downloadLink = document.createElement("a");
    var fileData = [data];

    var blobObject = new Blob(fileData,{
        type: "application/pdf"
    });

    var url = URL.createObjectURL(blobObject);
    downloadLink.href = url;
    downloadLink.download = "result.pdf";

    /*
     * Actually download pdf
     */
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}