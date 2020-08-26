const defaultValues = {
    id: '',
    name: '',
}

const initialState = {
    content: [],
    form: { ...defaultValues },
    keyword: '',
    isLoading: true,

}

function genreReducer(state = initialState, action) {
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
            const genre = state.content.find((genre) => genre.id === payload);
            return { ...state, form: { ...genre } }
        
        case 'HANDLE_DELETE':
            return { ...state, content: state.content.filter((genre) => genre.id !== payload) };
        
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

export default genreReducer;