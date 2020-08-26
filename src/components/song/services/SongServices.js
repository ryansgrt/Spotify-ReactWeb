import client from '../../../shared/http-client/Client';

export async function getSongs() {
    const {data:{content}} = await client.get('/song');
    return content;
}

export async function getSingleSong(id) {
    const { data: { content } } = await client.get(`/song/${id}`)
    return content;
}

export async function createSong(song) {
    const { data: { content } } = await client.post('/song/form', song)
    return content
}

export async function updateSong(song) {
    const {data:{ content }} = await client.put(`/song/${song.id}`, song)
    return content
}

export async function deleteSong(song) {
    const { data: { content } } = await client.delete(`/song/${song.id}`, song)
    return content
}
