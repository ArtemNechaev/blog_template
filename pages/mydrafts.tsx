import React, { useEffect, useState } from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import { useSession, getSession } from 'next-auth/client'

type Props = {
  drafts: PostProps[]
}

const Drafts: React.FC<Props> = (props) => {
  const [session] = useSession()
  const [drafts, setDrafts] = useState<Props>({ drafts: [] })

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await fetch(`http://localhost:3000/api/mypost`, {
      method: 'GET'
    })
    if (response.ok) {
      const drafts = await response.json();
      setDrafts({ drafts: drafts })
    }
  }

  if (!session) {
    return (
      <React.Fragment>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </React.Fragment>

    )
  }

  return (
    <div className="page">
      <h1>My Drafts</h1>
      <main>
        {drafts.drafts.map((post) => (
          <div key={post.id} className="post">
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  )
}

export default Drafts