import PromptCard from '@/components/PromptCard'

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  return (
    <div className='w-full flex-1 bg-gray-200 rounded-m p-2 m-2 flex flex-col justify-start items-center'>
      <p className='font-semibold text-xl font-satoshi text-white blue_gradient'> {name} Profile </p>
      <p className='text-gray-600 font-inter text-sm'> {desc} </p>
      <div className='w-full flex-start m-3 prompt_layout'>
        {data.map(prompt => (
          <PromptCard 
            key={prompt._id} 
            prompt={prompt} 
            handleEdit = {() => handleEdit && handleEdit(prompt)}
            handleDelete = {() => handleDelete && handleDelete(prompt)}
          />
        ))}
      </div>  
    </div>
  )
}

export default Profile