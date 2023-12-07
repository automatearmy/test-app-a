import Image from 'next/image'

export function NoData({isError}) {
    console.log(isError)
  return (
    <div className="text-center flex items-center justify-center flex-col gap-5 h-screen ">
      {isError
      ? (
        <>
          <h1 className="text-4xl font-bold   text-white">Something went wrong.</h1>
          <p className="text-gray-300 mb-4">Try to reload the page</p>
          <Image alt='no data' src={'error.svg'} width={350} height={350} />
        </>
      )
      : (  
        <>
          <h1 className="text-4xl font-bold   text-white">No data available.</h1>
          <p className="text-gray-300 mb-4"><a className="ml-2 md:text-lg text-sm text-slate-200 font-bold hover:text-slate-400" href="mailto:becky@ibousa.org">Contact us</a> to add a company.</p>
          <Image alt='no data' src={'noData.svg'} width={350} height={350} />
        </>
      )}
    </div>
  )
  
}