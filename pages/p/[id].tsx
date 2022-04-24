import React from "react"
import { GetServerSideProps } from "next"
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/post/${params.id || -1}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  )
  const post = await res.json()
  return {
    props: {
      post,
      initialReduxState: {
        drawer: {
          active: true,
          desctopOpen: true,
          mobileOpen: false,
        }
      }
    }

  }
}

async function publishPost(id: number): Promise<void> {
  const body = {
    title: 'схемы отопления',
    introduction: 'существуют 2 схемы',
    mainpart: 'однотрубная и двхутрубная',
    conclusion: 'двухтрубная лучше'
  }
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  await Router.push('/')
}

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'DELETE'
  });
  await Router.push('/')
}


const Post = (props: PostProps) => {
  const [session, loading] = useSession()
  if (loading) {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.id === props.author?.id
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>By {props?.author?.name || "Unknown author"}</p>
      <ReactMarkdown source={props.introduction + props.mainpart + props.conclusion} />
      {userHasValidSession && postBelongsToUser && (
        <button onClick={() => publishPost(props.id)}>Publish</button>
      )}
      {
        userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        )
      }
    </div>
  )
}

export default Post
