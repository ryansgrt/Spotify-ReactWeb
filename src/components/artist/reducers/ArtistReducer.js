const defaultValues = {
    id: '',
    name: '',
    debutYear: '',
    biography: '',
    photo: '',
    gender: '',

}

const initialState = {
    content: [],
    form: { ...defaultValues },
    keyword: '',
    isLoading: true,

}

function artistReducer(state = initialState, action) {
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
            const artist = state.content.find((artist) => artist.id === payload);
            return { ...state, form: { ...artist } }

        case 'HANDLE_DELETE':
            return { ...state, content: state.content.filter((artist) => artist.id !== payload) };

        case 'RESET':
            return { ...state, form: { ...defaultValues } }

        case 'HANDLE_SEARCH':
            return { ...state, keyword: payload };

        case 'FETCH_DATA':
            return { ...state, isLoading: true };

        case 'FETCH_COMPLETE':
            return { ...state, isLoading: false, content: [...payload] }

        case 'HANDLE_IMAGE':
            return { ...state, image: payload[0] };

        default:
            return {...state}
    }
}

export default artistReducer;