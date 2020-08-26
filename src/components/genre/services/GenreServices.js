import client from '../../../shared/http-client/Client';

export async function getGenres() {
    const {data:{content}} = await client.get('/genre');
    // const response = await client.get('/genre')
    return content;
    // return response.content;
}

export async function getSingleGenre(id) {
    const { data: { content } } = await client.get(`/genre/${id}`)
    return content;
}

export async function createGenre(genre) {
    const { data: { content } } = await client.post('/genre/form', genre)
    return content
}

export async function updateGenre(genre) {
    const {data:{ content }} = await client.put(`/genre/${genre.id}`, genre)
    return content
}

export async function deleteGenre(genre) {
    const response = await client.delete(`/genre/${genre.id}`,genre);
    if (response.status === 200) return true;
    else return false;
}