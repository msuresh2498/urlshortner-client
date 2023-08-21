import React, { useContext, useState } from 'react'
import './Home.css';
import { BsHandThumbsUp } from "react-icons/bs";
import { GiChainedArrowHeads } from "react-icons/gi";
import { GrSecure } from "react-icons/gr";
import { VscGraph } from "react-icons/vsc";
import { FaRegHand } from "react-icons/fa6";
import { PiDevicesBold } from "react-icons/pi";
import { UserContext } from '../Auth/Authorization';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../global';

const Home = () => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  console.log(user);
  const id = user ? user.userId : null;
  console.log(id);

  const [originalUrl, setOriginalUrl] = useState('');
  const [shortId, setShortId] = useState('');
  const [show, setShow] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user === null) {
      alert("login or signup to short your URL")
      navigate('/login')
    } else {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API}/url/`, { url: originalUrl }, { headers: { 'x-auth-token': token } });
        setShortId(response.data.id);
        console.log(response.data.id);
        setShow(true)
      } catch (error) {
        console.error(error);
      }
    }

  };

  return (
    <div>
      <div className='home-link-section'>
        <h1 className='home-heading'> URL shortner</h1>
        <div>

          <form onSubmit={handleSubmit}>
            <input type='text'
              name='url'
              className='url-link-textfield'
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder='Enter your link here' />
            <button className='shorten-btn' type='submit'>send</button>
          </form>

        </div>
        {show ? <div>
          <div className='new-url-section'>
            <h3 className='new-url-heading'>your new url</h3>
            <p className='newurl'>{API}/url/{shortId}</p>
          </div>
        </div> : " "}
        <p>ShortURL is a free tool to shorten URLs and generate short links
          URL shortener allows to create a shortened link making it easy to share</p>
      </div>
      <div className='home-subheading'>
        <h2 >Simple and fast URL Shortner</h2>
        <p>ShortURL allows to shorten long links from Instagram, Facebook, YouTube, Twitter, Linked In,
          WhatsApp, TikTok, blogs and sites. Just paste the long URL and click the Shorten URL button. On the next page, copy the shortened URL and share it on sites, chat and emails. After shortening the URL, check how many clicks it received.</p>
      </div>

      <div className='home-tools'>

        <div className='home-tool-list'>
          <p className='tool-icon'>
            <BsHandThumbsUp />
          </p>
          <h3>easy</h3>
          <p>
            ShortURL is easy and fast, enter the long link to get your shortened link
          </p>
        </div>
        <div className='home-tool-list'>
          <p className='tool-icon'>
            <GiChainedArrowHeads />
          </p>
          <h3>Shortened</h3>
          <p>
            Use any link, no matter what size, ShortURL always shortens
          </p>
        </div>
        <div className='home-tool-list'>
          <p className='tool-icon'>
            <GrSecure />
          </p>
          <h3>Secure</h3>
          <p>
            It is fast and secure, our service has HTTPS protocol and data encryption
          </p>
        </div>
        <div className='home-tool-list'>
          <p className='tool-icon'>
            <VscGraph />
          </p>
          <h3>Statistics</h3>
          <p>
            Check the number of clicks that your shortened URL received
          </p>
        </div>
        <div className='home-tool-list'>
          <p className='tool-icon'>
            <FaRegHand />
          </p>
          <h3>Reliable</h3>
          <p>
            All links that try to disseminate spam, viruses and malware are deleted
          </p>
        </div>
        <div className='home-tool-list'>
          <p className='tool-icon'>
            <PiDevicesBold />
          </p>
          <h3>Devices</h3>
          <p>
            Compatible with smartphones, tablets and desktop
          </p>
        </div>

      </div>
    </div>
  )
}

export default Home