const Project = ({ params }: {
  params: {
    id: string
  }
}) => {
  return (
    <div>Project page - {params.id}</div>
  )
}

export default Project