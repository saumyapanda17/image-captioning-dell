import React from 'react'
import jsPDF from 'jspdf'
import axios from 'axios'
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import saveAs from 'file-saver'
import { useSpeechSynthesis } from "react-speech-kit";
import { Audio } from 'react-loader-spinner'
import './Upload.css'
const Upload = () => {
    const [files, setFile] = useState(null);
    const [result, setResult] = useState();
    const [load, setLoad] = useState(false);
    const [play, setPlay] = useState(false);
    const [playText, setPlayText] = useState(null);
    const [display, setDisplay] = useState(false);
    const { speak } = useSpeechSynthesis();
    const [imageUrl, setImageUrl] = useState("")
    const data = [
        '1111',
        "22222",
        "444444"
    ]
    const pdfGenerator = () => {
        var doc = new jsPDF("landscape", "px", "a4", "false");
        //doc.setFont('Helvertica' , 'bold')
        doc.text(60, 60, "stringhghjghghjg");
        doc.save("a.pdf");
    };

    const textGenerator = () => {
        console.log("clicked");
        const element = document.createElement("a");
        console.log(result)
        const file = new Blob([result.join(',\n')], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "myfil.txt";
        document.body.appendChild(element);
        element.click();
    };
    const downloadZip = () => {
        const zip = require("jszip")();
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            const file = new Blob([data[i]], { type: "text/plain" });
            let filename = uuidv4() + ".txt";
            console.log(filename);
            zip.file(filename, file);
        }
        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "example.zip");
        });
    };


    const SubmitHandler = async (e) => {
        e.preventDefault();
        console.log("form Submitted")
        console.log(files);
        if (!files) {
            alert("No files selected")
        }
        else {
            setDisplay(false)
            setPlay(false)
            const data = new FormData()
            for (let i = 0; i < files.length; i++) {
                data.append("file", files[i]);
            }
            setLoad(true)
            console.log(data)
            const response = await axios.post("http://localhost:5000/uploader", data)
            console.log(response?.data)
            setResult(response?.data?.data)
            setLoad(false);
            if (files.length == 1) {
                setImageUrl(URL.createObjectURL(files[0]))
                setPlay(true);
                setPlayText(response?.data?.data[0])
                setDisplay(true)
            }
        }

    }
    return (
        <div className='uploadDiv'>

            <div className='uploadInside'>
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>Image Captioning</h2>
                {!load &&
                    <form onSubmit={SubmitHandler}
                        className="formmm">
                        <input type="file"
                            onChange={(e) => {
                                setResult(null)
                                setFile(e.target.files)
                            }}
                            multiple />
                        <input type="submit" className='btn btn-warning' />
                    </form>
                }


                {load &&
                    <div className='load'>
                        <Audio
                            height="80"
                            width="80"
                            radius="9"
                            color="bisque"
                            ariaLabel="loading"
                            wrapperStyle
                            wrapperClass
                        />
                        <h4 style={{ marginTop: "10px" }}>
                            Hang on generating image captions.....
                        </h4>
                    </div>
                }
                {!load && result &&
                    <div>
                        {display &&
                            <>
                                <div className='imageDiv'>
                                    <img src={imageUrl}
                                        className="image image-fluid" />
                                </div>
                                <br />
                                <h6 style={{ textAlign: "center" }}>{result[0]}</h6>
                            </>
                        }
                        <div className='resultDiv'>
                            <h5>Here are results for you....</h5>
                            <div>
                                <button
                                    onClick={textGenerator}
                                    className="btn btn-primary">Text Download</button>
                                {play &&
                                    <button onClick={() => speak({ text: playText })}
                                        className="btn btn-primary"> Play</button>}
                            </div>

                        </div>

                    </div>

                }
            </div>

        </div>
    )
}

export default Upload