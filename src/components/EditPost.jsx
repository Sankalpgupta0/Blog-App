import React, {useEffect, useState} from 'react'
import PostForm from './PostForm'
import dataBaseService from "../appwrite/database";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log("edit");
        if (slug) {
            dataBaseService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <PostForm {...post} />
    </div>
  ) : null
}

export default EditPost