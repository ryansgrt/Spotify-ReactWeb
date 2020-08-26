import client from '../../../shared/http-client/Client';

export async function getArtists() {
    const {data:{content}} = await client.get('/artist');
    // const response = await client.get('/album')
    return content;
    // return response.content;
}

export async function getSingleArtist(id) {
    const { data: { content } } = await client.get(`/artist/${id}`)
    return content;
}

export async function getPhotos(id) {
    const response = await client.get(`/artist/photos/${id}`)
    console.log(response.data);
}

export async function createArtist(form, image) {
    const formData = new FormData();
    let artist = JSON.stringify(form);
    formData.append('file', image);
    formData.append('formData', artist);
    console.log(formData.get('formData'));
    const { data } = await client.post('/artist/form', formData)
    console.log(data);

    return data
}

export async function updateArtist(artist) {
    const {data:{ content }} = await client.put(`/artist/${artist.id}`, artist)
    return content
}

export async function deleteArtist(artist) {
    const response = await client.delete(`/artist/${artist.id}`, artist)
    console.log(response.status);

    if (response.status === 200) return true
    else return false;
}