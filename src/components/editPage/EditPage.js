import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditPage = ({selectedTemplate}) => {
    const[text, setText] = React.useState([])
    const[success, setSuccess] = React.useState(false)
    const[meme,setMeme] = React.useState({})

    React.useEffect(()=> {
        if(selectedTemplate) {
            const tempArr = []
            for(let i=0;i<selectedTemplate.box_count;i++){
                tempArr[i] = ''
            }
            setText(tempArr)
        }
    },[])
    const navigate = useNavigate();
    const openTemplatePage = () => {
        navigate('/templates');
    }
    const ShareToFaceBook =() =>{
        let shareUrl = `http://www.facebook.com/sharer/sharer.phpu=${meme.url}`;
        window.open(shareUrl,"NewWindow");  
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
            setSuccess(res.success)
            setMeme(res.data)
            console.log('res', res)
        }))
    }
    const downloadImage = async() => {
        const imageAddress = meme.url;
        const image = await fetch(imageAddress);
       
        const newName=imageAddress.split("/");
        const  duplicateName=newName.pop();
       
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)
        const link = document.createElement('a')
        link.href = imageURL;
        link.download = ""+duplicateName+"";
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)  
       };

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

    if(!success){
        return(
            <div className='templatePage-bg'>
            <div className='templatePage-heading'>Brewing your meme</div>
            <div className='template-container'>
                <div className='templateImage-container'>
                    <img className='selectedTemplateImage' src={selectedTemplate.url} alt='meme'/>
                </div>
                <div>
                <div className='input-container'>
                    {text && text.map((t, i) => (
                        <input onChange={(e)=> setTextContect(e,i)} value={text[i]} placeholder='Enter humour' className='enter-humour' />
                    ))}
                </div>
                <button style={{marginTop: '5%'}} className='view-template' onClick={() => getMeme()}>Create</button>
                <button style={{marginTop: '5%', marginLeft: '5%'}} className='view-template' onClick={() => openTemplatePage()}>Select Different Template</button>
                </div>
            </div>
        </div>
        )
    } else{
        return(
            <div className='templatePage-bg'>
            <div className='templatePage-heading'>Share this on social media !!!!!</div>
            <div className='template-container'>
                <div className='templateImage-container'>
                    <img className='selectedTemplateImage' src={meme.url} alt='meme'/>
                </div>
                <div>
                    <button style={{marginTop: '5%', marginLeft: '5%'}} className='view-template' onClick={() => downloadImage()}>DownLoad</button>
                    <button style={{marginTop: '5%', marginLeft: '5%'}} className='view-template' onClick={() => openTemplatePage()}>Try Different Templates</button>
                    <button style={{marginTop: '5%', marginLeft: '5%'}} className='view-template' onClick={() => ShareToFaceBook()}>Share on Social Media</button>
                </div>
            </div>
        </div>
        )
    }
}
export default EditPage