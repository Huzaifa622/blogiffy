import { useRouter } from 'next/router'
import React from 'react'

const Blog = ({params}) => {
    const router = useRouter();
    const {id} = router.query;
  return (
    <div>post:{id}</div>
  )
}

export default Blog