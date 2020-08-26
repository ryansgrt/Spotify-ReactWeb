const defaultValues = {
    id: '',
    title: '',
    description: '',
    releaseYear: '',
    discount: 0,
    image: null,
}

const initialState = {
    content: [],
    form: { ...defaultValues },
    image:'',
    keyword: '',
    isLoading: true,
        
}

function albumReducer(state = initialState, action) {
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
            const album = state.content.find((album) => album.id === payload);
            return { ...state, form: { ...album } }
        
        case 'RESET':
            return { ...state, form: { ...defaultValues } }
        
        case 'SEARCH':
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

export default albumReducer;