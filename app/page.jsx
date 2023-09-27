import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center"> Discover & share 
            {/* The following line of code means up to maximum width up to medium screen remain hidden */}
            <br className="max-md:hidden"/> 
            <span className="orange_gradient text-center"> Ai Powered Prompts</span>
        </h1>

        <p className="desc text-center">
            This is an open source from the modern world to 
            discover create and share stuff
        </p>

        {/* Here goes the feed component */}
        <Feed />

    </section>
  )
}

export default Home