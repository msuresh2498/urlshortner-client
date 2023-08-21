import React, { useContext } from 'react'
import { UserContext } from '../Auth/Authorization'
import { useNavigate } from 'react-router-dom';
import { API } from '../../global';
import './userinfo.css'
import moment from 'moment'
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const UserInfo = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div>

            <div className='user-profile-section'>
                <img src='https://cdn-icons-png.flaticon.com/512/8931/8931935.png' alt='profile-pic' className='profile-pic' />
                <div className='user-info-section'>
                    <h1>{user.user.firstname} {user.user.lastname}</h1>
                    <h3>{user.user.email}</h3>
                </div>
            </div>
            <div className='user-urllist'>
                <h1>URL list</h1>
                <TableContainer className="user-url-table">
                    <TableHead className='user-table-head'>
                        <TableRow >
                            <TableCell>Sl.no</TableCell>
                            <TableCell>Your URL</TableCell>
                            <TableCell>Short URL</TableCell>
                            <TableCell>No of Opening</TableCell>
                            <TableCell>Creation Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='user-url-tablebody'>
                        {user.user.urlList.map((url, index) => (
                            <TableRow key={url.shortId}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{url.redirectURL}</TableCell>
                                <TableCell>{API}/url/{url.shortId}</TableCell>
                                <TableCell>{url.visitHistory.length}</TableCell>
                                <TableCell>{moment(url.creationDate).fromNow()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            </div>

        </div>
    )
}

export default UserInfo