export function CompaniesSelect({onCompanyChange, companies, defaultValue}) {
  return (
    <nav>
      <h1 className='text-white text-lg mb-2 mt-4'>My companies</h1>
      <select
        defaultValue={defaultValue}
        disabled={companies.length <= 1} 
        className="block max-w-[40%] bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500  " 
        onChange={onCompanyChange}
      >
        {companies.map(({id,company_id, company_name}) => {
          return  <option key={id} value={company_id}>{company_name}</option>
          })}

      </select>
    </nav>
  )
}