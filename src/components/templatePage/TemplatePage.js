import React from 'react'
import { useState, useEffect } from 'react'
import './TemplatePage.css'
import { useNavigate } from 'react-router-dom';
import frog from '../../assets/meme1.jpg'

const Loader = () => {
    return(
        <div className='loading-template'>
            <img src={frog} alt='frog' className='frog-loader' />
            <div className='loader-text'>Loading templates ...</div>
        </div>
    )
}

const TemplatePage = ({templates, setTemplates, selectedTemplate, setSelectedTemplate}) => {
    const[loading, setLoading] = useState(true)
    const[editMeme, setEditMeme] = useState(false)
    const[text, setText] = useState([])
    const navigate = useNavigate();
    const openTemplatePage = () => {
        navigate('/edit');
    }

    useEffect(()=>{
        fetchTemplates()
    },[])

    useEffect(() => {
        console.log('templates', templates)
    }, [templates])
    useEffect(()=> {
        if(selectedTemplate) {
            const tempArr = []
            for(let i=0;i<selectedTemplate.box_count;i++){
                tempArr[i] = ''
            }
            setText(tempArr)
        }
    }, [selectedTemplate])

    const fetchTemplates = async() => {
        await(fetch('https://api.imgflip.com/get_memes').then(res => {
            res.json().then(res => {
                const templates = res.data.memes
                setTemplates(templates)
                setTimeout(()=>{
                    if(templates) {
                        setLoading(false)
                        setSelectedTemplate(templates[0])
                    }
                }, 1500)
            })
        }))
    }
    const getMeme = async() => {
        const formdata = new FormData()

        formdata.append('username', 'cotabhay')
        formdata.append('password', 'Abhay@meme')
        formdata.append('template_id', selectedTemplate.id)
        text.forEach((t,index) => formdata.append(`boxes[${index}][text]`, t))
        await fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formdata
        }).then(res => res.json().then(res => {
            console.log('res', res)
        }))
    }
    const setTextContect = (e, index) => {
        const content = e.target.value || ''
        const newText = text.map((t, i) => {
            if(i === index){
                return content
            }
            return t
        })
        setText(newText)
    }

    if(loading) {
        return(
            <Loader />
        )
    } else{
        return(
            <div className='templatePage-bg'>
                <div className='templatePage-heading'>Select a template</div>
                <div className='template-container'>
                    <div className='templateNames'>
                        {
                            templates.map((template) => {
                                const flag = selectedTemplate.id === template.id
                                return(
                                    <div
                                        onClick={() => setSelectedTemplate(template)}
                                        className='templatename'
                                        style={{backgroundColor: flag && '#d6fac0', color: flag && '#69a949'}}>
                                        {template.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='templateImage-container'>
                        <img className='selectedTemplateImage' src={selectedTemplate.url} alt='meme'/>
                        {editMeme === false ? (
                            <button onClick={() => openTemplatePage()} className='edit-button'>Edit this meme</button>
                        ) : (
                            <div>
                                <div className='input-container'>
                                {text && text.map((t, i) => (
                                    <input onChange={(e)=> setTextContect(e,i)} value={text[i]} placeholder='Enter humour' className='enter-humour' />
                                ))}
                            </div>
                            <button onClick={() => getMeme()}>Test</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default TemplatePage