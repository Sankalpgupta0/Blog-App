import React, {useState, useEffect} from 'react'
import  PostCard  from './PostCard.jsx'
import dataBaseService from "../appwrite/database.js";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        dataBaseService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  return (
    <div className='w-full py-8'>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard 
                        featuredImage={post.featuredImage} 
                        $id={post.$id} 
                        title={post.title} 
                        />
                    </div>
                )
                )}
            </div>
    </div>
  )
}

export default AllPosts