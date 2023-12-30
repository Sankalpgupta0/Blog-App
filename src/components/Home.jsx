import React, {useEffect, useState} from 'react'
import dataBaseService from "../appwrite/database.js";
import PostCard from './PostCard.jsx'
import { useSelector } from 'react-redux';

function Home() {
    const authStatus = useSelector((state) => state.AuthReducer.status)
    const sankalp = useSelector((state) => state.AuthReducer.userData)
    const [posts, setPosts] = useState([])

    useEffect(() => {
      dataBaseService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
        })
    }, [])
  
    if(authStatus === false){
          return (
              <div className="w-full py-8 mt-4 text-center">
                      <div className="flex flex-wrap">
                          <div className="p-2 w-full">
                              <h1 className="text-2xl font-bold hover:text-gray-500">
                                  Login to read posts
                              </h1>
                          </div>
                      </div>
              </div>
          )
      } else {
        if (posts.length === 0) {
          return (
              <div className="w-full py-8 mt-4 text-center">
                      <div className="flex flex-wrap">
                          <div className="p-2 w-full">
                              <h1 className="text-2xl font-bold hover:text-gray-500">
                                  No posts to show
                              </h1>
                          </div>
                      </div>
              </div>
          )
      }
      }


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
                    ))}
                </div>
        </div>
    )
}

export default Home