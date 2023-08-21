import React, { useEffect, useState } from 'react'
import { API } from '../../global';
import '../userinfo/userinfo.css'
import moment from 'moment'
import { TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const UrlList = () => {

    const [urlList, setUrlList] = useState([]);

    useEffect(() => {
        // Fetch the urlList data when the component mounts
        axios.get(`${API}/urlList`)
            .then(response => {
                setUrlList(response.data.urlList);
                console.log(response.data.urlList);
            })
            .catch(error => {
                console.error('Error fetching urlList:', error);
            });
    }, []);
    return (
        <div>
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
                        {urlList.map((urls, index) => (
                            urls.urlList.map((url, urlIndex) => (
                                <TableRow key={urlIndex}>
                                    <TableCell>{urlIndex + 1}</TableCell>
                                    <TableCell>{url.redirectURL}</TableCell>
                                    <TableCell>{API}/url/{url.shortId}</TableCell>
                                    <TableCell>{url.visitHistory.length}</TableCell>
                                    <TableCell>{moment(url.creationDate).fromNow()}</TableCell>
                                </TableRow>
                            ))
                        ))}
                    </TableBody>
                </TableContainer>
            </div>
        </div>
    )
}

export default UrlList