const defaultValues = {
    id: '',
    title: '',
    duration: '',
    releaseYear: '',
    price: '',
    album: [],
    genre: [],
    artist: [],

}


const initialState = {
    content: [],
    form: { ...defaultValues },
    keyword: '',
    isLoading: true,

}

function songReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'SUBMIT_COMPLETE':
            return { ...state, isLoading: false, form: {...defaultValues}};

        case 'HANDLE_INPUT':
            const { inputName, inputValue } = payload;
            const {form} = state;
            form[inputName] = inputValue;
            return { ...state, form: { ...form } };

        case 'HANDLE_EDIT':
            const song = state.content.find((song) => song.id === payload);
            return { ...state, form: { ...song } }

        case 'HANDLE_DELETE':
            return { ...state, content: state.content.filter((song) => song.id !== payload) };

        case 'RESET':
            return { ...state, form: { ...defaultValues } }

        case 'SEARCH':
            return { ...state, keyword: payload };

        case 'FETCH_DATA':
            return { ...state, isLoading: true };

        case 'FETCH_COMPLETE':
            return { ...state, isLoading: false, content: [...payload] }

        default:
            return {...state}
    }
}

export default songReducer;