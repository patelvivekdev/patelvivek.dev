const Project = ({ params }: {
  params: {
    id: string
  }
}) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">

      <div className="text-4xl dark:text-white text-black">Project page - {params.id}</div>

      {/* show that currently working on this page */}

      <h1>
        This page is currently under construction
      </h1>

    </div>
  )
}

export default Project