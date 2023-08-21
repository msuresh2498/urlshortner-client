import React, { useState } from 'react'
import './Urlshortner.css'
import axios from 'axios';
import { API } from '../../global';

const Urlshortner = () => {

    const [originalUrl, setOriginalUrl] = useState('');
    const [shortId, setShortId] = useState('');
    const [show, setShow] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API}/url/shortner`, { url: originalUrl }, { headers: { 'x-auth-token': token } });
            setShortId(response.data.id);
            console.log(response.data.id);
            setShow(true)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className='home-link-section'>
                <h1 className='home-heading'>url shortner</h1>

                <form onSubmit={handleSubmit}>
                    <input type='text'
                        name='url'
                        className='url-link-textfield'
                        onChange={(e) => setOriginalUrl(e.target.value)}
                        placeholder='Enter your link here' />
                    <button className='shorten-btn' type='submit'>send</button>
                </form>

                <p>ShortURL is a free tool to shorten URLs and generate short links
                    URL shortener allows to create a shortened link making it easy to share</p>
            </div>
            {show ? <div>
                <div className='new-url-section'>
                    <h3 className='new-url-heading'>your new url</h3>
                    <p className='newurl'>{API}/url/shortner/{shortId}</p>
                </div>
            </div> : " "}

            <div>

            </div>
        </div>
    )
}

export default Urlshortner