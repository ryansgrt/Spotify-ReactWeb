// import React, {useState, Fragment, useEffect} from 'react';
// import {getAlbums} from "./album/services/AlbumServices";
// import {Spinner} from "reactstrap";
//
//
//
// function generateTableRows({albums, isLoading}){
//     let rows =(<tr><td colSpan="5" className="text-center"> <Spinner color="primary"/></td></tr>);
//     if(!isLoading){
//         rows = albums.map ((album, index) => {
//             return(
//                 <tr>
//                     <td>{index + 1}</td>
//                     <td>{album.title}</td>
//                     <td>{album.description}</td>
//                     <td>{album.releaseYear}</td>
//                     <td><img src={album.image} className="img-fluid"/></td>
//                 </tr>
//             );
//         });
//     }
// return rows;
// }
//
// function ListAlbum(props) {
//     const [albums, setAlbums] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     useEffect(()=>{
//         getAlbums().then((response)=>{
//             setAlbums(response.content);
//             setIsLoading(false);
//     });
// },[]);
// return(
//     <Fragment>
//
// )
// }
//
