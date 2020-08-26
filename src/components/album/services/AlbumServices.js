import client from '../../../shared/http-client/Client';

export async function getAlbums() {
    const {data:{content}} = await client.get('/album');
    // const response = await client.get('/album')
    return content;
    // return response.content;
}

export async function getSingleAlbum(id) {
    const { data: { content } } = await client.get(`/album/${id}`)
    return content;
}

export async function getPhotos(id) {
    const response = await client.get(`/album/photos/${id}`)
    console.log(response.data);
}

export async function createAlbum(form, image) {
    const formData = new FormData();
    let album = JSON.stringify(form);
    formData.append('file', image);
    formData.append('formData', album);
    console.log(formData.get('formData'));
    const { data } = await client.post('/album/form', formData)
    console.log(data);
    
    return data
}

export async function updateAlbum(album) {
    const {data:{ content }} = await client.put(`/album/${album.id}`, album)
    return content
}

export async function deleteAlbum(album) {
    const response = await client.delete(`/album/${album.id}`, album)
    console.log(response.status);
    
    if (response.status === 200) return true
    else return false;
}

// export async function getAlb(params) {
//     const {data :{data, page}} = await client.get(`/album`{params});
//
// }