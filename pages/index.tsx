import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Props } from '../typings'

const Home = ({ posts }: Props) => {
  console.log('posts: ', posts)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="py:10 lg:py:0 flex items-center justify-between border-y border-black bg-yellow-400">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to write, read and connect
          </h1>
          <h2>
            It's easy to post your thinking on any topic and connect with
            millions of readers.
          </h2>
        </div>
        <div className="hidden h-32 md:inline-flex lg:h-full">
          <img src="https://iconape.com/wp-content/files/gc/11611/png/medium-m.png"></img>
        </div>
      </div>
      <div>
        <div className="sm:grid:cols-2 grid grid-cols-1 gap-3 p-2 md:gap-6 md:p-6 lg:grid-cols-3 lg:p-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/posts/${post.slug.current}`}>
              <div className="">
                <img src={urlFor(post.mainImage).url()}></img>
                <div className="flex justify-between bg-white p-5">
                  <p>{post.title}</p>
                  <p>
                    {post.description} by {post.author.name}
                  </p>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(post.author.image).url()}
                    alt="author"
                  ></img>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    author -> {
    name, image
  },
  description,
  mainImage
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}

export default Home
