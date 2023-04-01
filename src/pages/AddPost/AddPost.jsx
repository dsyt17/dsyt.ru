import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios, { baseURL } from '../../axios';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

const AddPost = () => {
    const { id } = useParams();
    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [imageUrl, setImageUrl] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const inputFileRef = React.useRef(null);

    const isEditing = Boolean(id);

    const navigate = useNavigate();

    const isAuth = useSelector(selectIsAuth);

    const handleChangeFile = async event => {
        try {
            const formData = new FormData();
            formData.append('image', event.target.files[0]);
            const { data } = await axios.post('/uploads', formData);
            setImageUrl(data.url);
        } catch (error) {
            console.log(error);
            alert('File upload error');
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('0');
    };

    const onChange = React.useCallback(value => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            // if (inputFileRef === null) {
            //   setImageUrl("0");
            // }

            const fields = imageUrl
                ? {
                      title,
                      // imageUrl: `${baseURL}${imageUrl}`,
                      imageUrl,
                      tags: tags.split(','),
                      text,
                  }
                : // если без картинки
                  {
                      title,
                      tags: tags.split(','),
                      text,
                  };

            const { data } = isEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields);

            const _id = isEditing ? id : data._id;

            navigate(`/posts/${_id}`);
        } catch (error) {
            console.warn(error);
            alert('Create post error');
        }
    };

    // получаем данные для редактирования
    React.useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`).then(({ data }) => {
                setTitle(data.title);
                setTags(data.tags.join(','));
                setText(data.text);
                setImageUrl(data.imageUrl);
            });
        }
    }, []);

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className={styles.root}>
            <Paper style={{ padding: 30 }}>
                <Button
                    onClick={() => inputFileRef.current.click()}
                    variant="outlined"
                    size="large"
                >
                    Upload image
                </Button>
                <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                {imageUrl && (
                    <>
                        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                            Удалить
                        </Button>
                        <img
                            className={styles.image}
                            src={`${baseURL}${imageUrl}`}
                            alt="Uploaded"
                        />
                    </>
                )}
                <br />
                <br />
                <TextField
                    classes={{ root: styles.title }}
                    variant="standard"
                    placeholder="Header..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    fullWidth
                />
                <TextField
                    classes={{ root: styles.tags }}
                    variant="standard"
                    placeholder="Tags"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                    fullWidth
                />
                <SimpleMDE
                    className={styles.editor}
                    value={text}
                    onChange={onChange}
                    options={options}
                />
                <div className={styles.buttons}>
                    <Button onClick={onSubmit} size="large" variant="contained">
                        {isEditing ? 'Update' : 'Publish'}
                    </Button>
                    <a href="/">
                        <Button size="large">Cancel</Button>
                    </a>
                </div>
            </Paper>
        </div>
    );
};

export default AddPost;
